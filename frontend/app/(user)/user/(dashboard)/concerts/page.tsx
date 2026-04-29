"use client";

import {
  cancelConcertReservation,
  concertReservation,
  getConcerts,
  type GetConcertResponse,
} from "@/api/concert.api";
import { getErrorMessage } from "@/helper/axios";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const PAGE_LIMIT = 5;

type ConcertItem = GetConcertResponse["items"][number];

export default function UserDashboardPage() {
  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingReservation, setLoadingReservation] = useState(false);

  const hasMore = page < totalPages;

  const fetchConcerts = async (targetPage = 1) => {
    try {
      const data = await getConcerts({
        page: 1,
        limit: PAGE_LIMIT * targetPage,
      });

      setConcerts(data.items);
      setTotalItems(data.meta.total);
      setTotalPages(Math.ceil(data.meta.total / PAGE_LIMIT));
    } catch {
      toast.error("Failed to load concerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);

        const data = await getConcerts({
          page: 1,
          limit: PAGE_LIMIT,
        });

        setConcerts(data.items);
        setPage(data.meta.page);
        setTotalItems(data.meta.total);
        setTotalPages(data.meta.totalPages);
      } catch {
        toast.error("Failed to load concerts");
      } finally {
        setLoading(false);
      }
    };

    void fetchConcerts();
  }, []);

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getConcerts({
        page: nextPage,
        limit: PAGE_LIMIT,
      });

      setConcerts((prev) => [...prev, ...data.items]);
      setPage(data.meta.page);
      setTotalItems(data.meta.total);
      setTotalPages(data.meta.totalPages);
    } catch {
      toast.error("Failed to load more concerts");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleReserve = async (concertId: number) => {
    toast.dismiss();

    const reserveToast = toast.loading("Reserving concert...");

    try {
      setLoadingReservation(true);
      await concertReservation(concertId).then(async () => {
        await fetchConcerts(page);

        toast.update(reserveToast, {
          render: "Reserved concert successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      });
    } catch (error) {
      toast.update(reserveToast, {
        render: getErrorMessage(error),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoadingReservation(false);
    }
  };

  const handleCancelReservation = async (concertId: number) => {
    toast.dismiss();

    const reserveToast = toast.loading("Canceling concert reservation...");

    try {
      setLoadingReservation(true);
      await cancelConcertReservation(concertId).then(async () => {
        await fetchConcerts(page);

        toast.update(reserveToast, {
          render: "Canceled concert reservation successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      });
    } catch (error) {
      toast.update(reserveToast, {
        render: getErrorMessage(error),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoadingReservation(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-245 text-center text-black">Loading...</div>
    );
  }

  return (
    <>
      {concerts.length === 0 ? (
        <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center rounded-md border border-dashed border-[#d8d8d8] bg-white px-5 py-10 sm:min-h-[calc(100dvh-7rem)] lg:min-h-[calc(100vh-4rem)]">
          <div className="max-w-md text-center">
            <h2 className="text-[24px] font-bold text-[#1e88e5] sm:text-[28px] lg:text-[32px]">
              No concerts available
            </h2>

            <p className="mt-3 text-[14px] leading-6 text-[#666] sm:text-[16px] lg:text-[18px] lg:leading-8">
              There are currently no concerts open for reservation. Please check
              back again later.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-245">
          <div className="space-y-4 md:space-y-6">
            {concerts.map((concert) => (
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
                      {concert.availableSeats?.toLocaleString()}
                      {/* /{" "}
                  {concert.totalSeats.toLocaleString()} */}
                    </div>

                    {concert.isReservedByMe ? (
                      <button
                        type="button"
                        disabled={loadingReservation}
                        onClick={() => handleCancelReservation(concert.id)}
                        className="absolute right-0 bottom-0 h-10 w-24 rounded bg-[#f65e5e] text-[14px] font-semibold text-white"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={concert.isFull || loadingReservation}
                        onClick={() => handleReserve(concert.id)}
                        className="absolute right-0 bottom-0 h-10 w-24 rounded bg-[#2196e8] text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {concert.isFull ? "Full" : "Reserve"}
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
                      {concert.availableSeats?.toLocaleString()}
                      {/* /{" "}
                  {concert.totalSeats.toLocaleString()} */}
                    </div>

                    {concert.isReservedByMe ? (
                      <button
                        type="button"
                        disabled={loadingReservation}
                        onClick={() => handleCancelReservation(concert.id)}
                        className="h-12 w-33 rounded bg-[#f65e5e] text-[18px] font-semibold text-white transition hover:bg-[#e34d4d]"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={concert.isFull || loadingReservation}
                        onClick={() => handleReserve(concert.id)}
                        className="h-12 w-33 rounded bg-[#2196e8] text-[18px] font-semibold text-white transition hover:bg-[#1686d3] disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {concert.isFull ? "Full" : "Reserve"}
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
                disabled={loadingMore}
                className="h-9 rounded-full bg-[#2196e8] px-7 text-sm font-bold text-white transition hover:bg-[#1686d3] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            )}

            <p className="text-xs font-semibold text-[#444]">
              {concerts.length} of {totalItems}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
