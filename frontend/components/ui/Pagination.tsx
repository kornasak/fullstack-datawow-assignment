"use client";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function Pagination({
  page,
  pageSize,
  totalItems,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const goFirst = () => onPageChange(1);
  const goPrev = () => onPageChange(Math.max(page - 1, 1));
  const goNext = () => onPageChange(Math.min(page + 1, totalPages));
  const goLast = () => onPageChange(totalPages);

  const handlePageInputChange = (value: string) => {
    const nextPage = Number(value);

    if (!value || Number.isNaN(nextPage)) return;

    onPageChange(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <div className="mt-5">
      {/* Desktop */}
      <div className="hidden flex-wrap items-center justify-between gap-4 text-sm text-gray-600 md:flex">
        <div className="flex items-center gap-2">
          <span>Items per page</span>

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 rounded border border-gray-300 bg-white px-2 text-sm text-black outline-none"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <span>
            {startItem}–{endItem} of {totalItems} items
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goFirst}
            disabled={page === 1}
            className="text-blue-500 disabled:cursor-not-allowed disabled:text-blue-200"
          >
            <MdKeyboardDoubleArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={goPrev}
            disabled={page === 1}
            className="text-blue-500 disabled:cursor-not-allowed disabled:text-blue-200"
          >
            <MdKeyboardArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => handlePageInputChange(e.target.value)}
              className="h-8 w-14 rounded border border-gray-300 text-center text-sm text-black outline-none"
            />
            <span>of {totalPages}</span>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={page === totalPages}
            className="text-blue-500 disabled:cursor-not-allowed disabled:text-blue-200"
          >
            <MdKeyboardArrowRight size={20} />
          </button>

          <button
            type="button"
            onClick={goLast}
            disabled={page === totalPages}
            className="text-blue-500 disabled:cursor-not-allowed disabled:text-blue-200"
          >
            <MdKeyboardDoubleArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between gap-3 md:hidden">
        <button
          type="button"
          onClick={goPrev}
          disabled={page === 1}
          className="h-10 min-w-20 rounded-md justify-items-center bg-blue-500 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MdKeyboardArrowLeft size={20} />
        </button>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-10 min-w-20 rounded-md border border-blue-500 bg-white px-3 text-center text-sm font-medium text-blue-500 outline-none"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={goNext}
          disabled={page === totalPages}
          className="h-10 min-w-20 rounded-md justify-items-center bg-blue-500 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      </div>

      <div className="mt-2 text-center text-xs text-gray-500 md:hidden">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
