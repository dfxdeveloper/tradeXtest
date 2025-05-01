import React, { useState, useEffect, useRef } from "react";
import { X, Search, Check } from "lucide-react";
import axiosInstance from "../../../utils/axiosHelper";

const CommonModal = ({
  isOpen,
  onClose,
  onAddPattern,
  existingPatterns = [],
  category = null,
  timeInterval = null,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initLoading, setInitLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const debounceTimeout = useRef(null);

  const fetchPatternConfigurations = async (searchString, reset = false) => {
    const currentPage = reset ? 1 : page;
    if (reset) {
      setPage(1);
    }

    if (currentPage > totalPages) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`user/pattern-signal/config`, {
        params: {
          searchString,
          page: currentPage,
        },
      });

      let filteredPatterns = response.groupedPatternTypes.flatMap(
        (categoryGroup) =>
          categoryGroup.patternTypes.map((pattern) => ({
            ...pattern,
            categoryParent: categoryGroup.category,
          }))
      );

      if (category) {
        filteredPatterns = filteredPatterns.filter(
          (pattern) =>
            pattern.categoryParent.toLowerCase() === category.toLowerCase()
        );
      }

      if (timeInterval) {
      }
      const finalPatterns = filteredPatterns.filter(
        (pattern) =>
          !existingPatterns.some((existing) => existing.name === pattern.name)
      );
      setPatterns((prev) => {
        if (reset) {
          return finalPatterns;
        } else if (!finalPatterns?.length) {
          return [];
        } else {
          return [...prev, ...finalPatterns];
        }
      });
    } catch (err) {
      const errorMessage =
        err.message ||
        "Failed to load pattern configurations. Please try again.";
      setError(errorMessage);
      console.error("Pattern Configuration Error:", err);
      setPatterns([]);
      setTotalPages(1);
      setPage(1);
    } finally {
      setIsLoading(false);
      if (reset) {
        setInitLoading(false);
      }
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isLoading || page >= totalPages) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPatternConfigurations(searchTerm, true);
      setSelectedPatterns([]);
    } else {
      resetState();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && page > 1) {
      fetchPatternConfigurations(searchTerm);
    }
  }, [page]);

  const resetState = () => {
    setSearchTerm("");
    setSelectedPatterns([]);
    setError(null);
    setPatterns([]);
    setPage(1);
    setTotalPages(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchPatternConfigurations(value, true);
    }, 300);
  };

  const getFilteredPatterns = () => {
    if (!searchTerm) return patterns;

    return patterns.filter(
      (pattern) =>
        pattern.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pattern.description &&
          pattern.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const togglePatternSelection = (pattern) => {
    setSelectedPatterns((prevSelected) => {
      const isCurrentlySelected = prevSelected.some(p => p._id === pattern._id);
      
      if (isCurrentlySelected) {
        return prevSelected.filter(p => p._id !== pattern._id);
      } else {
        return [...prevSelected, pattern];
      }
    });
  };

  const isPatternSelected = (patternId) => {
    return selectedPatterns.some(pattern => pattern._id === patternId);
  };

  const toggleAllPatterns = () => {
    const filteredPatterns = getFilteredPatterns();
    if (selectedPatterns.length === filteredPatterns.length) {
      setSelectedPatterns([]);
    } else {
      setSelectedPatterns(filteredPatterns);
    }
  };

  const handleAddPatterns = () => {
    if (selectedPatterns.length > 0) {
      selectedPatterns.forEach(pattern => {
        onAddPattern(pattern);
      });
      onClose();
    }
  };

  const renderPatternList = () => {
    const filteredPatterns = getFilteredPatterns();

    if (initLoading) {
      return (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 py-4">{error}</div>;
    }

    return (
      <div>
        {filteredPatterns.length > 0 ? (
          <>
            
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern._id}
                onClick={() => togglePatternSelection(pattern)}
                className={`
                  p-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center
                  ${isPatternSelected(pattern._id)
                    ? "bg-purple-600/20 text-white"
                    : "bg-[#220C39] text-gray-300 hover:bg-[#6A11CB]/20"
                  }
                `}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 
                  ${isPatternSelected(pattern._id) 
                    ? "bg-purple-600 border-purple-600" 
                    : "border-gray-400"}`}
                >
                  {isPatternSelected(pattern._id) && 
                    <Check size={14} className="text-white" />
                  }
                </div>
                <div>
                  <div className="font-semibold">{pattern.label}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center text-gray-500 py-4">
            {searchTerm
              ? "No patterns match your search"
              : "No patterns available"}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    );
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1A1625] rounded-xl w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">
            {category ? `Add ${category} Patterns` : "Add Patterns"}
          </h2>
          <X
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#220C39] text-white px-4 py-2 rounded-lg 
              border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div
          className="max-h-64 overflow-y-auto space-y-2 mb-4"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {renderPatternList()}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPatterns}
            disabled={selectedPatterns.length === 0}
            className={`
              px-4 py-2 rounded-lg 
              ${
                selectedPatterns.length > 0
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Add {selectedPatterns.length > 0 ? `(${selectedPatterns.length})` : ""} Patterns
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CommonModal;