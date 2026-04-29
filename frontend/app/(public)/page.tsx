import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi2";
import { MdManageAccounts } from "react-icons/md";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <header className="flex h-18 items-center bg-white px-6 md:h-20 md:px-9">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#007dad] md:h-5 md:w-5" />
          <span className="text-lg font-bold uppercase text-[#007dad] md:text-xl">
            Brand
          </span>
        </div>
      </header>

      <section className="px-5 pb-10 pt-10 md:px-10 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-262.5">
          <div className="text-center">
            <h1 className="text-[30px] font-bold leading-tight text-black md:text-[40px]">
              Select Access Level
            </h1>

            <p className="mt-3 text-[14px] text-black md:text-[16px]">
              Lorem ipsum dolor sit amet consectetur. Elit purus nam.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-19">
            <article className="flex min-h-90 flex-col justify-between rounded-lg bg-white px-8 py-9 shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:min-h-130 md:px-21 md:py-21.5">
              <div>
                <HiOutlineUser className="mb-6 text-[58px] text-[#007dad] md:mb-9 md:text-[78px]" />

                <h2 className="text-[26px] font-bold text-[#007dad] md:text-[30px]">
                  User
                </h2>

                <p className="mt-5 text-[14px] leading-[1.6] text-[#007dad] md:mt-8 md:text-[16px] md:leading-[1.55]">
                  Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
                  porttitor nibh urna sit ornare a. Proin dolor morbi id ornare
                  aenean non
                </p>
              </div>

              <Link
                href="/user/login"
                className="mt-8 flex h-11 w-full items-center justify-center gap-3 rounded bg-[#007dad] text-[16px] font-bold text-white transition hover:bg-[#006f9a] md:mt-0 md:h-12.5 md:text-[20px]"
              >
                Enter Workspace
                <FaArrowRight className="text-[16px] md:text-[18px]" />
              </Link>
            </article>

            <article className="flex min-h-90 flex-col justify-between rounded-lg bg-[#007dad] px-8 py-9 shadow-[0_12px_30px_rgba(0,0,0,0.06)] md:min-h-130 md:px-21 md:py-21.5">
              <div>
                <MdManageAccounts className="mb-6 text-[58px] text-white md:mb-9 md:text-[78px]" />

                <h2 className="text-[26px] font-bold text-white md:text-[30px]">
                  Administrator
                </h2>

                <p className="mt-5 text-[14px] leading-[1.6] text-white md:mt-8 md:text-[16px] md:leading-[1.55]">
                  Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
                  porttitor nibh urna sit ornare a. Proin dolor morbi id ornare
                  aenean non
                </p>
              </div>

              <Link
                href="/admin/login"
                className="mt-8 flex h-11 w-full items-center justify-center gap-3 rounded bg-white text-[16px] font-bold text-[#007dad] transition hover:bg-slate-100 md:mt-0 md:h-12.5 md:text-[20px]"
              >
                Enter Portal
                <FaArrowRight className="text-[16px] md:text-[18px]" />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
