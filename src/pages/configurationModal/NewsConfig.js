import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Plus, X, Search } from "lucide-react";
import { AuthContext } from "../../components/context/auth";
import { filterTags, toastStyles } from "../../utils";
import axiosInstance from "../../utils/axiosHelper";
import toast from "react-hot-toast";
import { useUserCredentials } from "../../components/context/user";
import { TAGS } from "../../utils/constants";

const defaultTags = ["#Forex", "#Crypto", "#IndianEquity"];
const TAGS_PER_PAGE = 10;

const NewsConfig = ({ onSaveAndNextTab }) => {
  const { authData, setAuthData } = useContext(AuthContext);
  const { data: user, refreshUserData } = useUserCredentials();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingTags, setExistingTags] = useState(defaultTags);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [filteredTagsTotal, setFilteredTagsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreTags, setHasMoreTags] = useState(true);
  const tagsListRef = useRef(null);

  useLayoutEffect(() => {
    if (isFirstRender) {
      if (user?.preferred_tags?.length) {
        setExistingTags([...new Set(filterTags(user.preferred_tags))]);
      } else {
        setExistingTags(defaultTags);
      }
      setIsFirstRender(false);
    }
  }, [isFirstRender, user.preferred_tags]);

  const fetchAvailableTags = useCallback(
    (searchString, page = 1) => {
      setIsLoading(true);
      setError(null);

      // Simulate API delay for better visualization
      setTimeout(() => {
        const filteredTags = [
          ...new Set(
            TAGS.filter((tag) =>
              tag.toLowerCase().includes(searchString.toLowerCase())
            )
          ),
        ];

        // Store total filtered count for pagination calculations
        setFilteredTagsTotal(filteredTags.length);

        const availableTags = filteredTags.filter(
          (tag) => !existingTags.includes(tag)
        );

        // For proper pagination
        const tagsForCurrentPage = availableTags.slice(0, page * TAGS_PER_PAGE);
        setAvailableTags(tagsForCurrentPage);
        setHasMoreTags(tagsForCurrentPage.length < availableTags.length);
        setIsLoading(false);
      }, 800); // Delay to show loading spinner
    },
    [existingTags]
  );

  useEffect(() => {
    if (isModalOpen) {
      setCurrentPage(1); // Reset pagination when modal opens
      fetchAvailableTags(searchTerm, 1);
    }
  }, [fetchAvailableTags, isModalOpen, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (tagsListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tagsListRef.current;
        // Load more when user scrolls to bottom (with a small buffer)
        if (
          scrollTop + clientHeight >= scrollHeight - 20 &&
          hasMoreTags &&
          !isLoading
        ) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    const tagsListElement = tagsListRef.current;
    if (tagsListElement) {
      tagsListElement.addEventListener("scroll", handleScroll);
      return () => {
        tagsListElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasMoreTags, isLoading]);

  useEffect(() => {
    if (currentPage > 1 && isModalOpen) {
      fetchAvailableTags(searchTerm, currentPage);
    }
  }, [currentPage, fetchAvailableTags, searchTerm, isModalOpen]);

  // Handle search input changes with reset
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await axiosInstance.put("user/update", {
        preferred_tags: existingTags?.length
          ? existingTags.map((tag) => tag.replace("#", ""))
          : [],
      });

      await refreshUserData();

      const updatedAuthData = {
        ...authData,
        user: {
          ...authData.user,
          preferred_tags: existingTags,
        },
      };

      setAuthData(updatedAuthData);
      if (onSaveAndNextTab) {
        onSaveAndNextTab();
      }
    } catch (error) {
      console.error("Error updating preferred tags:", error);
      toast.error(error.message || "Error updating news tag");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (selectedTag) {
      const newsTagsLimit = user?.subscription_details?.[0]?.max_news_tags;
      const updatedTags = [...existingTags, selectedTag];

      if (updatedTags.length > newsTagsLimit) {
        toast.error("Maximum number of tags reached", toastStyles);
      } else {
        setExistingTags(updatedTags);
      }

      setIsModalOpen(false);
      setSelectedTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setExistingTags(existingTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="p-4 md:p-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div className="text-lg text-white">News</div>
          </div>

          <div className="bg-[#220C39] border border-[#6A11CB] rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-wrap gap-3 flex-1">
                {existingTags?.length > 0 &&
                  existingTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-purple-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-white hover:text-purple-400 px-4 py-2 border border-[#6A11CB] rounded-md transition-colors text-sm ml-4"
              >
                <Plus className="w-4 h-4" />
                <span>Add News Tag</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mt-28">
            <button
              onClick={handleSaveChanges}
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
                "Next"
              )}
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              id="news-tag-modal"
              className="bg-[#220C39] border border-[#6A11CB] rounded-xl p-6 w-96 max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold">
                  Add News Tag
                </h2>
                <X
                  onClick={() => setIsModalOpen(false)}
                  className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white"
                />
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search news tags..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full bg-[#220C39] text-white px-4 py-2 rounded-lg border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div
                ref={tagsListRef}
                className="max-h-64 overflow-y-auto mb-4 scroll-smooth"
              >
                {availableTags.length > 0 &&
                  !isLoading &&
                  availableTags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTag === tag
                          ? "bg-purple-600 text-white"
                          : "bg-[#220C39] text-gray-300 hover:bg-[#6A11CB]/20"
                      }`}
                    >
                      <div className="font-medium">{tag}</div>
                    </div>
                  ))}

                {isLoading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                )}

                {error ? (
                  <div className="text-center py-4 text-red-400">{error}</div>
                ) : availableTags.length === 0 && !isLoading ? (
                  <div className="text-center py-4 text-gray-400">
                    {searchTerm
                      ? "No matching tags found"
                      : "No more news tags available"}
                  </div>
                ) : null}

                {!isLoading && hasMoreTags && availableTags.length > 0 && (
                  <div className="text-center py-2 text-gray-500 text-sm">
                    Scroll for more tags
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-white border border-purple-600/50 rounded-md hover:bg-purple-600/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTag}
                  disabled={!selectedTag}
                  className={`px-4 py-2 rounded-md text-white transition-colors ${
                    selectedTag
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsConfig;
