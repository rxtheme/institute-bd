"use client";
import Login from "@/app/login/page";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./Context/Context";

const Header = () => {
  const { users } = useContext(Context);
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Scroll down
    } else {
      setIsVisible(true); // Scroll up
    }
    setLastScrollY(window.scrollY);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`first-letter: fixed top-0 z-50 w-full border-b-2 bg-white px-1 transition-transform duration-300 md:px-5 lg:px-20 ${
          !isVisible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex w-full items-center justify-end font-semibold">
          <div className="w-full">
            <Link className="text-xl" href="/">
              School Website
            </Link>
          </div>
          {/* navigation */}
          <div className="flex w-full items-center justify-end gap-5">
            <Link className="px-1 py-2" href="/blog">
              Blog
            </Link>
            <Link className="px-1 py-2" href="/about">
              About
            </Link>
            <Link className="px-1 py-2" href="/dashboard">
              Dashboard
            </Link>
            <Link className="px-1 py-2" href="/login">
              Login
            </Link>
            <div className="relative">
              <button className="px-1 py-2" onClick={handleDropdownToggle}>
                {users ? "User Menu" : "Login"}
              </button>
              {isDropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {users ? (
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    ) : (
                      <Login />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
