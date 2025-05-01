import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import axiosInstance from "../../../utils/axiosHelper";

const AddCryptoPairModal = ({
  isOpen,
  onClose,
  onAddPair,
  existingPairs,
  onSetDefaultPairs = {},
  hasDefaultPairs,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPair, setSelectedPair] = useState("");
  const [forexPairs, setForexPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultPairsAdded, setDefaultPairsAdded] = useState(false);

  // Separate useEffect for initial fetch when modal opens
  useEffect(() => {
    if (isOpen && !defaultPairsAdded) {
      fetchForexPairs("");
    }
  }, [isOpen]);

  // Separate useEffect for search term changes
  useEffect(() => {
    if (isOpen && searchTerm !== "") {
      const delayDebounce = setTimeout(() => {
        fetchForexPairs(searchTerm);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm]);

  const fetchForexPairs = async (searchString) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = JSON.parse(localStorage.getItem("authData"));
      const token = data?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axiosInstance.get("user/company", {
        params: {
          category: "Forex",
          searchString,
        },
      });

      const { companies } = response;
      const pairs = companies.map((forex) => ({
        ...forex,
        symbol: forex.identifier,
        name: forex.name,
        identifier: forex.identifier,
      }));

      setForexPairs(pairs);

      // Add default pairs only on initial load
      // if (
      //   !hasDefaultPairs &&
      //   !defaultPairsAdded &&
      //   pairs.length >= 2 &&
      //   existingPairs.length === 0 &&
      //   !searchString
      // ) {
      //   const defaultPairs = pairs.slice(0, 2);
      //   setDefaultPairsAdded(true);

      //   // Batch update default pairs
      //   defaultPairs.forEach((pair) => {
      //     onAddPair(pair.identifier, pair);
      //   });

      //   // Notify parent component
      //   onSetDefaultPairs(defaultPairs);
      // }
    } catch (err) {
      let errorMessage =
        err.message || "Failed to load crypto pairs. Please try again later.";
      setError(errorMessage);
      console.error("Error fetching crypto pairs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedPair("");
      setError(null);
    }
  }, [isOpen]);

  const getAvailablePairs = () => {
    return forexPairs.filter(
      (pair) => !existingPairs.includes(pair.identifier)
    );
  };

  const handleAddPair = () => {
    if (selectedPair) {
      const selectedCompanyObj = forexPairs.find(
        (pair) => pair.identifier === selectedPair
      );
      const success = onAddPair(selectedPair, selectedCompanyObj);

      if (success) {
        onClose();
      } else {
        setError("This pair is already added");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!isOpen) return null;

  const renderPairs = () => {
    const availablePairs = getAvailablePairs();

    if (availablePairs.length === 0) {
      return (
        <div className="text-center py-4 text-gray-400">
          {searchTerm ? "No matching pairs found" : "No crypto pairs available"}
        </div>
      );
    }

    return availablePairs.map((pair) => (
      <div
        key={pair.identifier}
        onClick={() => setSelectedPair(pair.identifier)}
        className={`p-3 rounded-lg cursor-pointer transition-colors ${
          selectedPair === pair.identifier
            ? "bg-purple-600 text-white"
            : "bg-[#220C39] text-gray-300 hover:bg-[#6A11CB]/20"
        }`}
      >
        <div className="font-medium">{pair.identifier}</div>
        <div className="text-sm opacity-75">{pair.name}</div>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1A1625] rounded-xl w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">Add Forex Pair</h2>
          <X
            onClick={onClose}
            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white"
          />
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search Forex pairs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#220C39] text-white px-4 py-2 rounded-lg border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="max-h-64 overflow-y-auto mb-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-400">{error}</div>
          ) : (
            renderPairs()
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPair}
            disabled={!selectedPair || isLoading}
            className={`px-4 py-2 rounded-lg ${
              selectedPair && !isLoading
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add Pair
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCryptoPairModal;
