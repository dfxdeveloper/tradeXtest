import React, { useState, useEffect, useRef, useContext } from "react";
import { User } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useUserCredentials } from "../../components/context/user";
import TelegramInstructions from "./TelegramInstructions";
import WhatsappInstructions from "./WhatsappInstructions";
import axiosInstance from "../../utils/axiosHelper";
import { removeCookie } from "../../services/cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth";
import localStorageWithExpiry from "../../utils/localstorage";
import QRCodeModal from "../../components/modal/QRCodeModal";

const toastStyles = {
  style: {
    background: "linear-gradient(180deg, #B039FF 0%, #A871FF 100%)",
    color: "white",
    padding: "16px",
    borderRadius: "8px",
    fontWeight: "500",
  },
  duration: 2000,
};

const MyProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { data, refreshUserData } = useUserCredentials();
  const [formData, setFormData] = useState({
    full_name: data?.full_name || "",
    email: data?.email || "",
    mobile_no: data?.mobile_no || "",
    gender: data?.gender || "",
    telegram_no: data?.telegram_no || "",
    whatsapp_no: data?.whatsapp_no || "",
    address: data?.address || "",
    country: data?.country || "",
    state: data?.state || "",
    city: data?.city || "",
    question: data?.question ? data.question.split(",") : [],
    profileImage: null,
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [whatsappStatus, setWhatsappStatus] = useState({
    isModified: false,
    isChecking: false,
    isConnected: Boolean(data?.whatsapp_no),
    isModalOpen: false,
  });
  const [telegramStatus, setTelegramStatus] = useState({
    isModified: false,
    isChecking: false,
    isConnected: Boolean(data?.telegram_chat_id),
    isModalOpen: false,
  });
  const telegramIntervalRef = useRef(null);

  // Function to check for telegram connection
  const checkTelegramConnection = async () => {
    let attempts = 0;
    const maxAttempts = 30; // Check for 30 seconds

    // Clear any existing interval before starting a new one
    if (telegramIntervalRef.current) {
      clearInterval(telegramIntervalRef.current);
    }

    setTelegramStatus((prev) => ({ ...prev, isChecking: true })); // Start the checking process

    telegramIntervalRef.current = setInterval(async () => {
      if (attempts >= maxAttempts) {
        clearInterval(telegramIntervalRef.current); // Stop after max attempts
        setTelegramStatus((prev) => ({ ...prev, isChecking: false }));
        toast.error("Failed to connect to Telegram.", toastStyles);
        return;
      }

      try {
        const updatedData = await refreshUserData(); // Get fresh data
        if (updatedData?.user.telegram_chat_id) {
          clearInterval(telegramIntervalRef.current); // Stop the interval if connected
          setTelegramStatus((prev) => ({
            ...prev,
            isConnected: true,
            isChecking: false,
            isModified: false,
            isModalOpen: false,
          }));
          toast.success("Telegram connected successfully!", toastStyles);
        }
      } catch (error) {
        console.error("Error checking telegram connection:", error);
      }

      attempts++;
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (telegramIntervalRef.current) {
        setTelegramStatus((prev) => ({ ...prev, isChecking: false }));
        return clearInterval(telegramIntervalRef.current);
      }
    };
  }, []);

  const handleConnectTelegram = (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(`+${formData?.telegram_no}`)) {
      toast.error(
        "Invalid Telegram number. Please enter a valid number.",
        toastStyles
      );
      return;
    }
    axiosInstance
      .put("user/update", {
        telegram_no: formData.telegram_no,
      })
      .then((response) => {
        if (response && window) {
          setTelegramStatus((prev) => ({ ...prev, isModalOpen: true }));
          checkTelegramConnection();
        }
      })
      .catch((error) => {
        toast.error(error.message, toastStyles);
      });
  };

  const handleConnectWhattsapp = (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(`+${formData?.whatsapp_no}`)) {
      toast.error(
        "Invalid Whatsapp number. Please enter a valid number.",
        toastStyles
      );
      return;
    }
    axiosInstance
      .put("user/update", {
        whatsapp_no: formData.whatsapp_no,
      })
      .then(async (response) => {
        if (response && window) {
          setWhatsappStatus((prev) => ({
            ...prev,
            isModified: false,
            isConnected: true,
            isModalOpen: true,
          }));
          await refreshUserData();
        }
      })
      .catch((error) => {
        toast.error(error.message, toastStyles);
      });
  };

  const fetchCountries = async () => {
    try {
      setIsLoadingCountries(true);
      const response = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY":
              "RzVrN3VoSVAwNUdrWTU4SFBKWkRxckp3TnR6cEdTNldUeFBHU0FVSg==",
          },
        }
      );
      const countriesData = response.data || [];
      setCountries(countriesData);

      // If we have user data, find and set the initial country
      if (data?.country) {
        const userCountry = countriesData.find((c) => c.name === data.country);
        if (userCountry) {
          setSelectedCountry(userCountry.iso2);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  // Fetch states for a country
  const fetchStates = async (countryCode) => {
    if (!countryCode) return;

    try {
      setIsLoadingStates(true);
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "RzVrN3VoSVAwNUdrWTU4SFBKWkRxckp3TnR6cEdTNldUeFBHU0FVSg==",
          },
        }
      );
      const statesData = response.data || [];
      setStates(statesData);

      // If we have user data and this is initial load, find and set the state
      if (data?.state && initialLoad) {
        const userState = statesData.find((s) => s.name === data.state);
        if (userState) {
          setSelectedState(userState.iso2);
        }
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
    } finally {
      setIsLoadingStates(false);
    }
  };

  // Fetch cities for a state
  const fetchCities = async (countryCode, stateCode) => {
    if (!countryCode || !stateCode) return;

    try {
      setIsLoadingCities(true);
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "RzVrN3VoSVAwNUdrWTU4SFBKWkRxckp3TnR6cEdTNldUeFBHU0FVSg==",
          },
        }
      );
      const citiesData = response.data || [];
      setCities(citiesData);

      // If we have user data and this is initial load, find and set the city
      if (data?.city && initialLoad) {
        const userCity = citiesData.find((c) => c.name === data.city);
        if (userCity) {
          setSelectedCity(userCity.name);
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    } finally {
      setIsLoadingCities(false);
    }
  };

  // Initial fetch of countries
  useEffect(() => {
    fetchCountries();
  }, [data]);

  // Fetch states when country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
      if (!initialLoad) {
        setSelectedState("");
        setSelectedCity("");
      }
    }
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
      if (!initialLoad) {
        setSelectedCity("");
      }
    }
  }, [selectedState]);

  // Turn off initial load flag after first load
  useEffect(() => {
    if (selectedCity && initialLoad) {
      setInitialLoad(false);
    }
  }, [selectedCity]);

  // Handle city selection change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      question: prev.question.includes(value)
        ? prev.question.filter((item) => item !== value)
        : [...prev.question, value],
    }));
  };

  // Add this useEffect after your existing useEffects
  // Handle location data initialization
  /*  useEffect(() => {
  const initializeLocationData = async () => {
    if (!data?.country || !countries.length) return;

    const country = countries.find((c) => c.name === data.country);
    if (!country) return;

    setSelectedCountry(country.iso2);
    const statesData = await fetchStates(country.iso2);
    
    if (!data.state || !statesData.length) return;
    const state = statesData.find((s) => s.name === data.state);
    if (!state) return;

    setSelectedState(state.iso2);
    const citiesData = await fetchCities(country.iso2, state.iso2);
    
    if (!data.city || !citiesData.length) return;
    const city = citiesData.find((c) => c.name === data.city);
    if (city) {
      setSelectedCity(city.name);
    }
  };

  initializeLocationData();
}, [data, countries]); */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the selected location names from the arrays
      const selectedCountryName =
        countries.find((country) => country.iso2 === selectedCountry)?.name ||
        "";

      const selectedStateName =
        states.find((state) => state.iso2 === selectedState)?.name || "";

      const selectedCityName =
        cities.find((city) => city.name === selectedCity)?.name || "";

      if (!isValidPhoneNumber(`+${formData.mobile_no}`)) {
        throw new Error("Please enter a valid phone number");
      }
      const response = await axiosInstance.put("user/update", {
        full_name: formData.full_name,
        mobile_no: formData.mobile_no,
        gender: formData.gender,
        // telegram_no: formData?.telegram_no, // Use the telegram number from data
        // whatsapp_no: formattedWhatsappNo,
        address: formData.address,
        country: selectedCountryName,
        state: selectedStateName,
        city: selectedCityName,
        question: formData.question.join(","),
      });

      if (response) {
        toast.success("Profile updated successfully", toastStyles);
        await refreshUserData();
      }
    } catch (error) {
      console.error("Error updating Profile:", error);
      const errorMessage = error.message || "Failed to update Profile";
      toast.error(errorMessage, toastStyles);
    }
  };

  const handleClickDeleteUser = async (id) => {
    try {
      const response = await axiosInstance.delete(`user/${id}?type=soft`);
      if (response) {
        toast.success("User deleted successfully", toastStyles);
        logout();
        removeCookie("token");
        localStorageWithExpiry.clearItems([
          "authData",
          "market_close_data_cache",
          "cachedSignals",
          "hero_section",
          "home_news_cache",
          "news_cache",
        ]);
        await refreshUserData();
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      const errorMessage = error.message || "Failed to delete User";
      toast.error(errorMessage, toastStyles);
    }
  };
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-white mb-3">My Profile</h1>
      <hr className="border border-[#291B38]" />
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-opacity-50 rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-3">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <label className="block text-sm text-white mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
                placeholder="Full Name"
              />
            </div>

            <div className="flex justify-center">
              <div className="relative w-32 h-32 bg-[#1A1625] rounded-lg border-2 border-dashed border-[#6A11CB] flex flex-col items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full bg-[#1A1625] object-cover rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <User size={40} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">Upload Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Phone number
              </label>
              <PhoneInput
                international={true}
                countryCallingCodeEditable={false}
                defaultCountry="US"
                placeholder="Enter phone number"
                value={
                  formData.mobile_no ? `+${formData.mobile_no}` : undefined
                }
                onChange={(value) => {
                  if (value) {
                    let updatedValue = value.replace("+", "").trim();
                    setFormData((prev) => ({
                      ...prev,
                      mobile_no: updatedValue,
                    }));
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
                placeholder="Email"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Gender</label>
              <select
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm text-gray-300 mb-2">
              Signal preferences for notification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 px-3 items-end py-3 rounded-lg gap-6 border border-[#6A11CB]">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Telegram Number
                </label>
                <PhoneInput
                  international={true}
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  placeholder="Enter telegram number"
                  value={
                    formData.telegram_no
                      ? `+${formData.telegram_no}`
                      : undefined
                  }
                  onChange={(value) => {
                    if (value) {
                      let updatedValue = value.replace("+", "").trim();
                      setFormData((prev) => ({
                        ...prev,
                        telegram_no: updatedValue,
                      }));
                      setTelegramStatus((prev) => ({
                        ...prev,
                        isModified: updatedValue !== data?.telegram_no,
                      }));
                    }
                  }}
                />
                <TelegramInstructions />
              </div>
              <div className="pb-8">
                <button
                  className={`border ${
                    !telegramStatus.isModified && telegramStatus.isConnected
                      ? "border-blue-500 text-blue-300 cursor-not-allowed"
                      : "border-[#27A7E7] hover:border-blue-300"
                  } ${
                    telegramStatus.isChecking ? "opacity-75 cursor-wait" : ""
                  } rounded-lg px-2 py-2`}
                  onClick={handleConnectTelegram}
                  disabled={
                    !telegramStatus.isModified && telegramStatus.isConnected
                  }
                >
                  <span
                    className={`${
                      !telegramStatus.isModified && telegramStatus.isConnected
                        ? "text-blue-500"
                        : "text-[#27A7E7] hover:text-blue-300"
                    } font-bold text-sm inline-flex items-center`}
                  >
                    <svg
                      className={`w-7 mr-2 ${
                        !telegramStatus.isModified && telegramStatus.isConnected
                          ? "text-blue-300"
                          : "text-blue-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.507 8.146l-1.925 9.09c-.144.662-.54.827-1.093.515L10.45 14.61l-1.88 1.815c-.207.207-.38.38-.777.38l.28-3.334 6.637-5.998c.289-.251-.063-.39-.447-.139l-8.2 5.161-3.535-1.106c-.767-.238-.78-.768.16-1.13l13.812-5.325c.639-.243 1.194.158.99 1.126z" />
                    </svg>
                    {!telegramStatus.isModified && telegramStatus.isConnected
                      ? "✓ Connected To Telegram"
                      : "Connect Telegram"}
                  </span>
                </button>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 px-3 items-end py-3 mt-5 rounded-lg gap-6 border border-[#6A11CB]">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  WhatsApp Number
                </label>
                <PhoneInput
                  international={true}
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  placeholder="Enter whatsApp number"
                  value={
                    formData.whatsapp_no
                      ? `+${formData.whatsapp_no}`
                      : undefined
                  }
                  onChange={(value) => {
                    if (value) {
                      let updatedValue = value.replace("+", "").trim();
                      setFormData((prev) => ({
                        ...prev,
                        whatsapp_no: updatedValue,
                      }));
                      setWhatsappStatus((prev) => ({
                        ...prev,
                        isModified: updatedValue !== data?.whatsapp_no,
                      }));
                    }
                  }}
                />
                <WhatsappInstructions />
              </div>
              <div className="pb-8">
                <button
                  className={`border ${
                    !whatsappStatus.isModified && whatsappStatus.isConnected
                      ? "border-green-500 text-green-300 cursor-not-allowed"
                      : "border-[#25d366] hover:border-green-300"
                  } ${
                    whatsappStatus.isChecking ? "opacity-75 cursor-wait" : ""
                  } rounded-lg px-2 py-2`}
                  onClick={handleConnectWhattsapp}
                  disabled={
                    !whatsappStatus.isModified && whatsappStatus.isConnected
                  }
                >
                  <span
                    className={`${
                      !whatsappStatus.isModified && whatsappStatus.isConnected
                        ? "text-green-500"
                        : "text-[#25d366] hover:text-green-300"
                    } font-bold text-sm inline-flex items-center`}
                  >
                    <svg
                      className="w-8 mr-2 text-[#25d366]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                    </svg>
                    {!whatsappStatus.isModified && whatsappStatus.isConnected
                      ? "✓ Connected to WhatsApp"
                      : "Connect to WhatsApp"}
                  </span>
                </button>
              </div>
            </div>
            */}
          </div>
        </section>

        <section className="rounded-lg px-6">
          <h2 className="text-xl font-medium text-white mb-3">
            Address Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white h-24"
                placeholder="Address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-white mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setInitialLoad(false);
                  }}
                  className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
                  disabled={isLoadingCountries}
                >
                  <option value="">
                    {isLoadingCountries
                      ? "Loading countries..."
                      : "Select Country"}
                  </option>
                  {Array.isArray(countries) &&
                    countries.map((country) => (
                      <option key={country.iso2} value={country.iso2}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white mb-2">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setInitialLoad(false);
                  }}
                  className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
                  disabled={!selectedCountry || isLoadingStates}
                >
                  <option value="">
                    {isLoadingStates ? "Loading states..." : "Select State"}
                  </option>
                  {Array.isArray(states) &&
                    states.map((state) => (
                      <option key={state.iso2} value={state.iso2}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full bg-[#1A1625] border border-[#6A11CB] rounded-lg p-3 text-white"
                  disabled={!selectedState || isLoadingCities}
                >
                  <option value="">
                    {isLoadingCities ? "Loading cities..." : "Select City"}
                  </option>
                  {Array.isArray(cities) &&
                    cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg px-6">
          <h2 className="text-xl font-medium text-white mb-3">
            What do you expect to gain from TradeXpert?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Learn about stock market",
              "Analyse market data",
              "Get stock ideas",
              "Networking",
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox w-3 h-3 lg:w-5 lg:h-5 rounded border-gray-600 text-purple-500 bg-gray-800"
                  checked={formData.question.includes(option)}
                  onChange={() => handleQuestionChange(option)}
                />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-10 py-3 mb-5 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Submit
          </button>
        </div>

        <hr className="border border-[#291B38]"></hr>

        <div className="flex justify-start">
          <button
            type="button"
            className="flex items-center space-x-2 w-48 text-white bg-[#FF62624D] rounded-lg px-2 py-2 hover:bg-red-400 transition-colors"
            onClick={() => handleClickDeleteUser(data._id)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Delete my account</span>
          </button>
        </div>
      </form>
      <QRCodeModal
        isOpen={telegramStatus.isModalOpen || whatsappStatus.isModalOpen}
        qrType={
          telegramStatus.isModalOpen
            ? "telegram"
            : whatsappStatus.isModalOpen
            ? "whatsapp"
            : ""
        }
        onClose={() => {
          setTelegramStatus((prev) => ({ ...prev, isModalOpen: false }));
          setWhatsappStatus((prev) => ({ ...prev, isModalOpen: false }));
        }}
      />
    </div>
  );
};

export default MyProfile;
