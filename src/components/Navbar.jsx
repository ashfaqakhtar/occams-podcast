"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/utils/NavLinks";
import { useState } from "react";

const HomeIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    className={className}
  >
    <path
      d="M2.32855 16H5.01649V10.4791C5.01649 9.82214 5.57466 9.28409 6.26596 9.28409H10.734C11.4253 9.28409 11.9835 9.82214 11.9835 10.4791V16H14.6715C15.9591 16 17 14.9872 17 13.7554V6.3825C17 5.65284 16.6308 4.95908 16.0061 4.54848L9.8342 0.397134C9.02932 -0.132378 7.96977 -0.132378 7.16489 0.397134L0.993893 4.53907C0.36916 4.95908 0 5.65196 0 6.3825V13.7554C0 14.9872 1.0418 16 2.32855 16Z"
      className="fill-current"
    />
  </svg>
);

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Active check function
  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <nav className="w-full px-6 py-4 fixed top-0 z-10">
      <div className="container mx-auto flex items-center justify-between rounded-[3rem] bg-white/10 backdrop-blur-[23.4px] p-6">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/logo/occams-podcast.svg"
            alt="Occams Podcast"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          {/* HOME ICON */}
          <Link
            href="/"
            className={`
              transition
              ${isActive("/") ? "text-orange-400" : "text-white hover:text-orange-400"}
            `}
          >
            <HomeIcon />
          </Link>

          {/* NAV LINKS */}
          {NavLinks?.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`
                font-inter text-base font-medium leading-8 tracking-[-0.01rem]
                transition

                ${
                  isActive(link.path)
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* LOGIN DESKTOP */}
        <Link
          href="/login"
          className={`
            hidden md:block rounded-[2.5rem] py-2.5 px-7 text-lg font-semibold transition

            ${
              isActive("/login")
                ? "bg-[#F16A21] text-white"
                : "bg-white text-[#F16A21] hover:bg-[#F16A21] hover:text-white"
            }
          `}
        >
          Login
        </Link>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <div className="md:hidden mt-3 bg-black/90 backdrop-blur-md rounded-2xl p-5">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`
              block py-2
              ${isActive("/") ? "text-orange-400" : "text-white"}
            `}
          >
            Home
          </Link>

          {NavLinks?.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`
                block py-2
                ${isActive(link.path) ? "text-orange-400" : "text-white"}
              `}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className={`
              block mt-3 text-center rounded-full py-2

              ${
                isActive("/login")
                  ? "bg-[#F16A21] text-white"
                  : "bg-white text-[#F16A21]"
              }
            `}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
