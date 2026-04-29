"use client";

import { ToastContainer } from "react-toastify";
import {
  PiCheckCircle,
  PiInfoDuotone,
  PiXBold,
  PiXCircleDuotone,
} from "react-icons/pi";

import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  const contextClass = {
    success: "bg-[#d7ead8] text-[#2d2d2d]",
    error: "bg-[#ffe1e1] text-[#2d2d2d]",
    info: "bg-[#e5eefc] text-[#2d2d2d]",
    warning: "bg-[#fff1d6] text-[#2d2d2d]",
    default: "bg-white text-[#2d2d2d]",
    dark: "bg-[#1f2937] text-white",
  };

  return (
    <ToastContainer
      position="top-right"
      limit={1}
      hideProgressBar
      closeOnClick
      newestOnTop
      toastClassName={(context) =>
        `${
          contextClass[context?.type || "default"]
        } relative flex min-h-14 w-full items-center rounded-xl px-3 py-3 text-sm shadow-md sm:min-h-16 sm:px-4 sm:text-base`
      }
      className="left-3! right-3! top-3! w-auto! sm:left-auto! sm:right-4! sm:top-4! sm:w-170! sm:max-w-[calc(100vw-24px)]!"
      closeButton={({ closeToast }) => (
        <button
          type="button"
          onClick={closeToast}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#234b28] transition hover:text-red-500 sm:h-12 sm:w-12"
        >
          <PiXBold size={18} />
        </button>
      )}
      icon={({ type, isLoading }) => {
        if (isLoading) return null;

        if (type === "success") {
          return (
            <PiCheckCircle
              size={28}
              className="mr-5 shrink-0 text-[#00a743] sm:mr-6"
            />
          );
        }

        if (type === "error") {
          return (
            <PiXCircleDuotone
              size={28}
              className="mr-5 shrink-0 text-red-500 sm:mr-6"
            />
          );
        }

        return (
          <PiInfoDuotone
            size={28}
            className="mr-5 shrink-0 text-blue-500 sm:mr-6"
          />
        );
      }}
    />
  );
}
