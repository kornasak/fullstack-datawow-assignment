"use client";

import {
  getConcertReservationHistory,
  type GetConcertReservationHistoryResponse,
} from "@/api/reservation.api";
import { Pagination } from "@/components/ui/Pagination";
import { getErrorMessage } from "@/helper/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type HistoryItem = GetConcertReservationHistoryResponse["items"][number];

export default function AdminHistoryPage() {
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistories = async (
      currentPage: number,
      currentPageSize: number,
    ) => {
      try {
        setLoading(true);

        const data = await getConcertReservationHistory({
          page: currentPage,
          limit: currentPageSize,
        });

        setHistories(data.items);
        setTotalItems(data.meta.total);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    void fetchHistories(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="px-4 py-6 text-center text-black md:px-8 md:py-12">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-12">
      {histories.length === 0 ? (
        <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center rounded-md border border-dashed border-[#d8d8d8] bg-white px-5 py-10 text-center">
          <div>
            <h2 className="text-[24px] font-bold text-[#1e88e5]">
              No history available
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              There is currently no reservation history.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Card List */}
          <div className="space-y-3 md:hidden">
            {histories.map((item) => (
              <article
                key={item.id}
                className="rounded-md border border-[#d8d8d8] bg-white p-4 text-black"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-bold">{item.concert.name}</p>
                    <p className="mt-1 text-[13px] text-gray-500">
                      {new Date(item.createdAt).toLocaleString("th-TH")}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded px-2.5 py-1 text-[12px] font-semibold ${
                      item.action === "Cancel"
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.action}
                  </span>
                </div>

                <div className="mt-4 border-t border-[#eeeeee] pt-3">
                  <p className="text-[13px] text-gray-500">Username</p>
                  <p className="text-[15px] font-medium">
                    {item.user.fullName}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-[3px] border border-[#8f8f8f] bg-white md:block">
            <div className="grid grid-cols-4 border-b border-[#8f8f8f] text-[16px] font-bold text-black">
              <div className="border-r border-[#8f8f8f] px-3 py-2">
                Date time
              </div>
              <div className="border-r border-[#8f8f8f] px-3 py-2">
                Username
              </div>
              <div className="border-r border-[#8f8f8f] px-3 py-2">
                Concert name
              </div>
              <div className="px-3 py-2">Action</div>
            </div>

            {histories.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 border-b border-[#8f8f8f] text-[14px] text-black last:border-b-0"
              >
                <div className="border-r border-[#8f8f8f] px-3 py-2">
                  {new Date(item.createdAt).toLocaleString("th-TH")}
                </div>
                <div className="border-r border-[#8f8f8f] px-3 py-2">
                  {item.user.fullName}
                </div>
                <div className="border-r border-[#8f8f8f] px-3 py-2">
                  {item.concert.name}
                </div>
                <div className="px-3 py-2">{item.action}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {totalItems > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
