import React, { useState, useEffect, useRef } from "react";
import { X, Search, Check } from "lucide-react";
import axiosInstance from "../../../utils/axiosHelper";

const AddPairModal = ({
  isOpen,
  onClose,
  onAddPair,
  existingPairs,
  category,
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initLoading, setInitLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchPairs(searchTerm, true);
    } else {
      resetState();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && page > 1) {
      fetchPairs(searchTerm);
    }
  }, [page]);

  const resetState = () => {
    setSearchTerm("");
    setSelectedPairs([]);
    setError(null);
    setPairs([]);
    setPage(1);
    setTotalPages(1);
  };

  const fetchPairs = async (searchString, reset = false) => {
    const currentPage = reset ? 1 : page;
    if (reset) {
      setPage(1);
    }

    if (currentPage > totalPages) return;

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
          category,
          searchString,
          page: currentPage,
        },
      });

      const { companies, totalPages: newTotalPages } = response;

      if (!companies?.length) {
        setPairs([]);
        setPage(1);
        setTotalPages(1);
        return;
      }

      const formattedPairs = companies.map((item) => ({
        ...item,
        symbol: item.identifier,
        name: item.name,
        identifier: item.identifier,
      }));

      setPairs((prev) => {
        const availablePairs = formattedPairs.filter(
          (pair) => !existingPairs.includes(pair.identifier)
        );
        if (reset) {
          return availablePairs;
        } else {
          return [...prev, ...availablePairs];
        }
      });

      setTotalPages(newTotalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load pairs. Please try again later.");
      setPairs([]);
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

  const handleAddPairs = () => {
    if (selectedPairs.length > 0) {
      const selectedCompanyObjs = pairs.filter(pair => 
        selectedPairs.includes(pair.identifier)
      );
      
      // Add all selected pairs
      const allAdded = selectedPairs.every(pairId => {
        const pairObj = pairs.find(p => p.identifier === pairId);
        return onAddPair(pairId, pairObj);
      });
      
      if (allAdded) {
        onClose();
      } else {
        setError("Some pairs are already added");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchPairs(value, true);
    }, 300);
  };

  const togglePairSelection = (pairId) => {
    setSelectedPairs(prev => {
      if (prev.includes(pairId)) {
        return prev.filter(id => id !== pairId);
      } else {
        return [...prev, pairId];
      }
    });
  };

  const renderPairs = () => {
    return (
      <div className="space-y-3">
        <div className="space-y-3">
          {pairs?.length > 0 ? (
            pairs.map((pair) => (
              <div
                key={pair.identifier}
                onClick={() => togglePairSelection(pair.identifier)}
                className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center ${
                  selectedPairs.includes(pair.identifier)
                    ? "bg-purple-600/20 border border-purple-600"
                    : "bg-[#220C39] text-gray-300 hover:bg-[#6A11CB]/20"
                }`}
              >
                <div className="flex items-center w-6">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500 bg-transparent border-blue-500 rounded-sm"
                    checked={selectedPairs.includes(pair.identifier)}
                    onChange={() => {}} // Handled by parent div click
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium text-white">{pair.identifier}</div>
                  <div className="text-sm text-gray-400">{pair.name}</div>
                </div>
                {selectedPairs.includes(pair.identifier) && (
                  <Check className="h-5 w-5 text-purple-500" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400">
              {searchTerm
                ? "No matching pairs found"
                : `No ${category.replace("_", " ")} pairs available`}
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1A1625] rounded-xl w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">{title}</h2>
          <div className="flex items-center">
            <span className="mr-3 text-gray-400 text-sm">
              {selectedPairs.length} selected
            </span>
            <X
              onClick={onClose}
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white"
            />
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder={`Search ${category.replace("_", " ")} pairs...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#220C39] text-white px-4 py-2 rounded-lg border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div
          className="max-h-64 overflow-y-auto mb-4"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {initLoading ? (
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
            onClick={handleAddPairs}
            disabled={selectedPairs.length === 0 || isLoading}
            className={`px-4 py-2 rounded-lg ${
              selectedPairs.length > 0 && !isLoading
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add {selectedPairs.length > 0 ? `(${selectedPairs.length})` : "Pairs"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPairModal;