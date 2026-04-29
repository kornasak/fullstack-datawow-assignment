"use client";

import { FiX } from "react-icons/fi";

type DeleteConcertModalProps = {
  open: boolean;
  concertName?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConcertModal({
  open,
  concertName = "Concert Name",
  onClose,
  onConfirm,
}: DeleteConcertModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-82.5 rounded-md bg-white px-5 py-5 shadow-xl">
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#eb4b4f] text-white">
          <FiX className="text-[26px]" />
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-[16px] font-bold text-black">
            Are you sure to delete?
          </h2>
          <p className="mt-1 text-[16px] font-bold text-black">
            ”{concertName}”
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9.5 rounded border border-[#d8d8d8] bg-white text-[13px] font-medium text-black transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-9.5 rounded bg-[#eb4b4f] text-[13px] font-semibold text-white transition hover:bg-[#d93e42]"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
