import React, { memo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  } else if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }
};

const PageButton = memo(({ pageNumber, currentPage, onClick }) => {
  const isCurrentPage = currentPage === pageNumber;

  return (
    <button
      onClick={() => !isCurrentPage && onClick(pageNumber)}
      className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
        isCurrentPage
          ? "bg-purple-600 text-white"
          : "bg-purple-600/20 text-white hover:bg-purple-700"
      }`}
      aria-current={isCurrentPage ? "page" : undefined}
      aria-label={`Page ${pageNumber}`}
    >
      {pageNumber}
    </button>
  );
});

PageButton.displayName = "PageButton";

const NavButton = memo(({ onClick, disabled, icon, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
      disabled
        ? "bg-purple-600/20 text-gray-500 cursor-not-allowed"
        : "bg-purple-600 text-white hover:bg-purple-700"
    }`}
  >
    {icon}
  </button>
));

NavButton.displayName = "NavButton";

const Pagination = ({ totalPages, currentPage, fetchCallback }) => {
  const visiblePages = React.useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const handleFirst = useCallback(() => fetchCallback(1), [fetchCallback]);
  const handlePrev = useCallback(
    () => fetchCallback(currentPage - 1),
    [fetchCallback, currentPage]
  );
  const handleNext = useCallback(
    () => fetchCallback(currentPage + 1),
    [fetchCallback, currentPage]
  );
  const handleLast = useCallback(
    () => fetchCallback(totalPages),
    [fetchCallback, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-6"
    >
      <NavButton
        onClick={handleFirst}
        disabled={currentPage === 1}
        icon={<ChevronsLeft size={16} />}
        label="Go to first page"
      />
      <NavButton
        onClick={handlePrev}
        disabled={currentPage === 1}
        icon={<ChevronLeft size={16} />}
        label="Go to previous page"
      />

      {visiblePages.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          currentPage={currentPage}
          onClick={fetchCallback}
        />
      ))}

      <NavButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        icon={<ChevronRight size={16} />}
        label="Go to next page"
      />
      <NavButton
        onClick={handleLast}
        disabled={currentPage === totalPages}
        icon={<ChevronsRight size={16} />}
        label="Go to last page"
      />
    </nav>
  );
};

export default memo(Pagination);
