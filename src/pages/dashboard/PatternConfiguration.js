import React, { useState, useEffect, useContext, useCallback } from "react";
import { X, Plus } from "lucide-react";
import { AuthContext } from "../../components/context/auth.js";
import CommonModal from "./patternModals/CommonModal.js";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axiosHelper.js";
import { convertConstantsToCamelCase, toastStyles } from "../../utils/index.js";
import { defaultPatterns } from "../../utils/constants.js";
import { useUserCredentials } from "../../components/context/user.js";

const PatternConfiguration = () => {
  const { data: user, refreshUserData } = useUserCredentials();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Authentication context
  const { authData, setAuthData } = useContext(AuthContext);

  // State to store patterns
  const [patterns, setPatterns] = useState({
    singleCandlesticks: [],
    doubleCandlesticks: [],
    tripleCandlesticks: [],
    basicPatterns: [],
    advancedPatterns: [],
    harmonicPatterns: [],
  });
  const fetchInitialPatterns = useCallback(async (preferredPatterns) => {
    setIsLoading(true);
    setError(null);

    try {
      const newPatterns = {
        singleCandlesticks: [],
        doubleCandlesticks: [],
        tripleCandlesticks: [],
        basicPatterns: [],
        advancedPatterns: [],
        harmonicPatterns: [],
      };

      if (preferredPatterns?.length) {
        preferredPatterns.forEach((item) => {
          const categoryKey = convertConstantsToCamelCase(
            item.category.replace(/\s/g, "_")
          );
          if (newPatterns[categoryKey]) {
            newPatterns[categoryKey].push({
              name: item.name,
              label: item.label,
            });
          }
        });
        setPatterns(newPatterns);
      } else {
        setPatterns(defaultPatterns);
      }
    } catch (err) {
      const errorMessage =
        err?.message ||
        "Failed to load pattern configurations. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchInitialPatterns(user.preferred_patterns_details);
    }
  }, [fetchInitialPatterns, user]);

  const sections = [
    {
      title: "Single Candlesticks",
      key: "singleCandlesticks",
      addButtonText: "Add Single Candlesticks",
      category: "Single Candlesticks",
    },
    {
      title: "Double Candlesticks",
      key: "doubleCandlesticks",
      addButtonText: "Add Double Candlesticks",
      category: "Double Candlesticks",
    },
    {
      title: "Triple Candlesticks",
      key: "tripleCandlesticks",
      addButtonText: "Add Triple Candlesticks",
      category: "Triple Candlesticks",
    },
    {
      title: "Basic Patterns",
      key: "basicPatterns",
      addButtonText: "Add Basic Patterns",
      category: "Basic Patterns",
    },
    {
      title: "Advance Patterns",
      key: "advancedPatterns",
      addButtonText: "Add Advance Patterns",
      category: "Advanced Patterns",
    },
    {
      title: "Harmonic Patterns",
      key: "harmonicPatterns",
      addButtonText: "Add Harmonic Patterns",
      category: "Harmonic Patterns",
    },
  ];

  const handleOpenModal = (sectionKey) => {
    setCurrentSection(sectionKey);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSection(null);
  };

  const handleAddPattern = (newPattern) => {
    if (currentSection && newPattern) {
      const candlesticks = user?.subscription_details?.[0]?.candlesticks;

      if (!candlesticks?.is_unlimited) {
        const updatedTempPattern = {
          ...patterns,
          [currentSection]: [
            ...patterns[currentSection],
            { label: newPattern.label, name: newPattern.name },
          ],
        };

        let totalCandlesticks = 0;
        let totalPatterns = 0;

        for (const key in updatedTempPattern) {
          if (updatedTempPattern.hasOwnProperty(key)) {
            if (key.includes("Candlesticks")) {
              totalCandlesticks += updatedTempPattern[key].length;
            } else if (key.includes("Patterns")) {
              totalPatterns += updatedTempPattern[key].length;
            }
          }
        }

        if (totalCandlesticks > candlesticks?.max_candlestick) {
          toast.error(
            "You have reached the maximum number of candlesticks.",
            toastStyles
          );
          return;
        }
        if (totalPatterns > candlesticks?.max_chart_pattern) {
          toast.error(
            "You have reached the maximum number of chart patterns.",
            toastStyles
          );
          return;
        }
      }
      setPatterns((prev) => ({
        ...prev,
        [currentSection]: [
          ...prev[currentSection],
          { label: newPattern.label, name: newPattern.name },
        ],
      }));
    }
  };

  const removePattern = (section, patternToRemove) => {
    const isPatternInExisting = patterns[section].some(
      (existingPattern) => existingPattern.name === patternToRemove.name
    );

    if (isPatternInExisting) {
      // Create new arrays without the removed pattern
      const updatedPatterns = patterns[section].filter(
        (pattern) => pattern.name !== patternToRemove.name
      );

      // Update both patterns states
      setPatterns((prev) => ({
        ...prev,
        [section]: updatedPatterns,
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Flatten and collect all current pattern ObjectIds
      const preferredPatterns = Object.values(patterns).flatMap((category) =>
        category.map((pattern) => pattern.name)
      );

      if (!preferredPatterns?.length) {
        setIsSaving(false);
        return;
      }

      // Send PUT request to update user's preferred patterns
      await axiosInstance.put(`user/update`, {
        preferred_patterns: preferredPatterns,
      });
      await refreshUserData();

      // Update both localStorage and AuthContext
      const updatedAuthData = {
        ...authData,
        user: {
          ...authData.user,
          preferred_patterns: preferredPatterns,
        },
      };

      // Update localStorage and AuthContext
      localStorage.setItem("authData", JSON.stringify(updatedAuthData));
      setAuthData(updatedAuthData);

      // Show success toast
      toast.success("Pattern configurations updated successfully!");
    } catch (error) {
      const errorMessage =
        error?.message ||
        "Failed to save pattern configurations. Please try again.";
      // Show error toast
      toast.error(errorMessage);
      console.error("Save Pattern Configuration Error:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const getCurrentSectionDetails = () => {
    return sections.find((section) => section.key === currentSection);
  };

  const getCurrentPatterns = () => {
    return currentSection ? patterns[currentSection] : [];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500">
          This is Loading page...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header and rest of the component remains the same as in previous example */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg text-white">Patterns Recognition</div>
        </div>

        {/* Patterns Grid */}
        <div className="bg-[#220C39] border border-[#6A11CB] py-5 rounded-lg grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.key}
              className="bg-[#1A1625] rounded-lg p-4 mx-10"
            >
              <h3 className="text-white mb-4">{section.title}</h3>
              <div className="space-y-2 mb-4 min-h-[100px]">
                {patterns[section.key]?.length
                  ? patterns[section.key].map((pattern, patternIndex) => (
                      <div
                        key={patternIndex}
                        className="bg-[#220C39] border border-[#6A11CB] text-white rounded-md p-2 flex items-center justify-between"
                      >
                        <span className="text-white">{pattern.label}</span>
                        <button
                          onClick={() => removePattern(section.key, pattern)}
                          className="text-white hover:text-purple-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
              <button
                onClick={() => handleOpenModal(section.key)}
                className="w-full flex items-center justify-center text-white gap-2 bg-[#220C39] border border-[#6A11CB] rounded-md py-2 hover:bg-purple-400"
              >
                <Plus className="w-4 h-4" />
                <span>{section.addButtonText}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-10 mt-20">
          <button className="px-6 py-2 text-white hover:text-purple-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-lg text-white transition-colors text-sm ${
              isSaving
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isSaving ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
        <Toaster />
      </div>

      {/* Advanced Pattern Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddPattern={handleAddPattern}
        existingPatterns={getCurrentPatterns()}
        category={getCurrentSectionDetails()?.category}
      />
    </div>
  );
};

export default PatternConfiguration;
