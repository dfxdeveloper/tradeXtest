import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Plus, X, Search, Check } from "lucide-react";
import { AuthContext } from "../../components/context/auth";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosHelper";
import { deepFindKey, filterTags, toastStyles } from "../../utils";
import { useUserCredentials } from "../../components/context/user";
import { TAGS } from "../../utils/constants";

const TAGS_PER_PAGE = 10;

const NewsConfiguration = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const { data: user, refreshUserData } = useUserCredentials();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingTags, setExistingTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [filteredTagsTotal, setFilteredTagsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreTags, setHasMoreTags] = useState(true);
  const tagsListRef = useRef(null);
  const allLoadedTags = useRef([]);

  useLayoutEffect(() => {
    if (user?.preferred_tags) {
      setExistingTags([...new Set(filterTags(user.preferred_tags))]);
    }
  }, [user?.preferred_tags]);

  const fetchAvailableTags = useCallback(
    (searchString, newsTagsLimit, page = 1) => {
      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        const filteredTags = [
          ...new Set(
            TAGS.filter((tag) =>
              tag.toLowerCase().includes(searchString.toLowerCase())
            )
          ),
        ];

        setFilteredTagsTotal(filteredTags.length);

        const availableTags = filteredTags.filter(
          (tag) => !existingTags.includes(tag)
        );

        const tagsForCurrentPage = availableTags.slice(
          (page - 1) * TAGS_PER_PAGE,
          page * TAGS_PER_PAGE
        );

        if (page === 1) {
          setAvailableTags(tagsForCurrentPage);
          allLoadedTags.current = tagsForCurrentPage;
        } else {
          allLoadedTags.current = [...allLoadedTags.current, ...tagsForCurrentPage];
          setAvailableTags(allLoadedTags.current);
        }

        setHasMoreTags(page * TAGS_PER_PAGE < availableTags.length);
        setIsLoading(false);
      }, 800);
    },
    [existingTags]
  );

  useEffect(() => {
    if (isModalOpen) {
      const newsTagsLimit = user?.subscription_details?.[0]?.max_news_tags;
      setAvailableTags([]);
      allLoadedTags.current = [];
      setCurrentPage(1);
      fetchAvailableTags(searchTerm, newsTagsLimit, 1);
    }
  }, [fetchAvailableTags, isModalOpen, searchTerm, user?.subscription_details]);

  useEffect(() => {
    const handleScroll = () => {
      if (tagsListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tagsListRef.current;
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
      const newsTagsLimit = user?.subscription_details?.[0]?.max_news_tags;
      fetchAvailableTags(searchTerm, newsTagsLimit, currentPage);
    }
  }, [
    currentPage,
    fetchAvailableTags,
    searchTerm,
    user?.subscription_details,
    isModalOpen,
  ]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      if (!existingTags?.length) {
        setIsSaving(false);
        return;
      }
      await axiosInstance.put("user/update", {
        preferred_tags: existingTags.map((tag) => tag.replace("#", "")),
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
      toast.success("Tags Updated Successfully", toastStyles);
    } catch (error) {
      console.error("Error updating preferred tags:", error);
      toast.error("Failed to update tags", toastStyles);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTags = () => {
    if (selectedTags.length > 0) {
      const newsTagsLimit = deepFindKey(authData, "newsTagsLimit");
      const updatedTags = [...existingTags, ...selectedTags];
      
      if (updatedTags?.length > newsTagsLimit) {
        toast.error(`Maximum number of tags (${newsTagsLimit}) reached`, toastStyles);
        return;
      }
      
      setExistingTags([...new Set(updatedTags)]);
      setIsModalOpen(false);
      setSelectedTags([]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setExistingTags(existingTags.filter((tag) => tag !== tagToRemove));
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags((prevSelected) => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter((t) => t !== tag);
      } else {
        return [...prevSelected, tag];
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openTagModal = () => {
    setIsModalOpen(true);
    setSelectedTags([]);
    setSearchTerm("");
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
                {Array.isArray(existingTags) &&
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
                onClick={openTagModal}
                className="flex items-center gap-2 text-white hover:text-purple-400 px-4 py-2 border border-[#6A11CB] rounded-md transition-colors text-sm ml-4"
              >
                <Plus className="w-4 h-4" />
                <span>Add News Tags</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mt-28">
            <button className="px-6 py-2 rounded-lg text-white hover:text-white transition-colors text-sm">
              Cancel
            </button>
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
                "Save Changes"
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
                  Add News Tags
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
                  className="w-full bg-[#220C39] text-white px-4 py-2 rounded-lg border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600 pl-4 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-300">
                  Selected ({selectedTags.length}):
                </div>
              </div>

              <div
                ref={tagsListRef}
                className="max-h-64 overflow-y-auto mb-4 relative scroll-smooth scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => toggleTagSelection(tag)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors flex justify-between items-center mb-2 ${
                        selectedTags.includes(tag)
                          ? "bg-purple-600 text-white"
                          : "bg-[#220C39] text-gray-300 hover:bg-[#6A11CB]/20"
                      }`}
                    >
                      <div
                        className="font-medium"
                        style={{ textTransform: "capitalize" }}
                      >
                        {tag}
                      </div>
                      {selectedTags.includes(tag) && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  ))
                ) : !isLoading ? (
                  <div className="text-center py-4 text-gray-400">
                    No tags found matching your search
                  </div>
                ) : null}

                {isLoading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                )}

                {!isLoading && hasMoreTags && availableTags.length > 0 && (
                  <div className="text-center py-2 text-gray-500 text-sm">
                    Scroll for more tags
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-white border border-purple-600/50 rounded-md hover:bg-purple-600/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTags}
                  disabled={selectedTags.length === 0}
                  className={`px-6 py-2 rounded-md text-white transition-colors ${
                    selectedTags.length > 0
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  Add {selectedTags.length > 0 ? `(${selectedTags.length})` : ""}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsConfiguration;