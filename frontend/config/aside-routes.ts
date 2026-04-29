import { LuHouse, LuInbox, LuRefreshCcw } from "react-icons/lu";

export const userSidebarRoutes = [
  {
    label: "Home",
    href: "/user/concerts",
    icon: LuHouse,
  },
  {
    label: "Switch to Admin",
    href: "/admin/login",
    icon: LuRefreshCcw,
  },
];

export const adminSidebarRoutes = [
  {
    label: "Home",
    href: "/admin/concerts/overview",
    icon: LuHouse,
    activePatterns: ['/admin/concerts'],
  },
  {
    label: "History",
    href: "/admin/history",
    icon: LuInbox,
    activePatterns: ['/admin/history'],
  },
  {
    label: "Switch to user",
    href: "/user/login",
    icon: LuRefreshCcw,
    activePatterns: ['/user/login'],
  },
];
