"use client";

import { concerts } from "@/mocks/concert";
import { useMemo, useState } from "react";
import { FiUser } from "react-icons/fi";

const INITIAL_LIMIT = 5;
const LOAD_MORE_LIMIT = 5;

export default function UserDashboardPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  const visibleConcerts = useMemo(() => {
    return concerts.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore = visibleCount < concerts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_LIMIT, concerts.length),
    );
  };

  return (
    <div className="mx-auto max-w-245">
      <div className="space-y-4 md:space-y-6">
        {visibleConcerts.map((concert) => (
          <article
            key={concert.id}
            className="rounded-md border border-[#d8d8d8] bg-white p-4 md:px-8 md:py-8"
          >
            {/* Mobile */}
            <div className="md:hidden">
              <div className="relative min-h-37.5 pr-27.5">
                <h2 className="truncate text-[24px] font-bold text-[#1e88e5]">
                  {concert.name}
                </h2>

                <p className="mt-2 line-clamp-3 text-[15px] leading-6 text-[#444]">
                  {concert.description}
                </p>

                <div className="mt-3 flex items-center gap-2 text-[15px] text-black">
                  <FiUser className="text-[18px]" />
                  {concert.seats.toLocaleString()}
                </div>

                {concert.reserved ? (
                  <button className="absolute right-0 bottom-0 h-10 w-24 rounded bg-[#f65e5e] text-[14px] font-semibold text-white">
                    Cancel
                  </button>
                ) : (
                  <button className="absolute right-0 bottom-0 h-10 w-24 rounded bg-[#2196e8] text-[14px] font-semibold text-white">
                    Reserve
                  </button>
                )}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <h2 className="text-[32px] font-bold text-[#1e88e5]">
                {concert.name}
              </h2>

              <div className="mt-4 border-t border-[#e5e5e5]" />

              <p className="mt-5 text-[18px] leading-[1.65] text-black">
                {concert.description}
              </p>

              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[18px] text-black">
                  <FiUser className="text-[22px]" />
                  {concert.seats.toLocaleString()}
                </div>

                {concert.reserved ? (
                  <button className="h-12 w-33 rounded bg-[#f65e5e] text-[18px] font-semibold text-white transition hover:bg-[#e34d4d]">
                    Cancel
                  </button>
                ) : (
                  <button className="h-12 w-33 rounded bg-[#2196e8] text-[18px] font-semibold text-white transition hover:bg-[#1686d3]">
                    Reserve
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-1">
        {hasMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="h-9 rounded-full bg-[#2196e8] px-7 text-sm font-bold text-white transition hover:bg-[#1686d3]"
          >
            Load More
          </button>
        )}

        <p className="text-xs font-semibold text-[#444]">
          {Math.min(visibleCount, concerts.length)} of {concerts.length}
        </p>
      </div>
    </div>
  );
}