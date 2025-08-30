"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { navLinks } from "./navlinks";
import { Search, ChevronDown, X } from "lucide-react";
import { NavLinkItem } from "./NavLinkItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLanguage, setSearchOpen, selectLanguage, selectIsSearchOpen } from "@/lib/features/ui/uiSlice";


export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSearchOpen = useAppSelector(selectIsSearchOpen);
  const currentLang = useAppSelector(selectLanguage);

  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownRef]);

  const handleLangChange = (lang: 'en' | 'ar') => {
    dispatch(setLanguage(lang));
    setIsLangOpen(false);
  };

  return (
    <div ref={navbarRef} className="custom-shadow fix-zIndex-webkit font-jakarta sticky  top-0 z-[200]">
      <div className={`h-[80px] w-full flex items-center justify-between px-[20px] md:px-[90px] py-[18px]  ${isDropdownActive ? "bg-[#4B2615]" : "bg-transparent"} `}>
        <Link href="/" passHref rel="dofollow">
          <div className="font-bold text-white text-xl">Logo</div>
        </Link>

        <div className={`flex-grow flex  ${isSearchOpen ? 'justify-end' : "justify-center"} items-center px-8`}>
          {!isSearchOpen ? (
            <div className="flex items-center gap-x-8">
              {navLinks.map((link) => (
                <NavLinkItem
                  key={link.name}
                  linkItem={link}
                  onDropdownToggle={setIsDropdownActive}
                  navbarRef={navbarRef}
                />
              ))}
            </div>
          ) : (
            <div className="relative w-full max-w-lg">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search size={20} className="text-white" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white rounded-md pl-10 pr-4 py-2 text-sm outline-white outline w-full focus:outline-white transition-all duration-300"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => dispatch(setSearchOpen(!isSearchOpen))} className="p-2 hover:text-gray-300">
            {!isSearchOpen && !isDropdownActive ? <Search size={20} className="text-white" /> : ""}
          </button>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 text-white p-2 hover:text-gray-300"
            >
              <span>{currentLang.toUpperCase()}</span>
              <ChevronDown size={16} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-lg py-1 w-20">
                <button
                  onClick={() => handleLangChange('en')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLangChange('ar')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  AR
                </button>
              </div>
            )}
          </div>

          <button className="border border-white text-white rounded-lg px-4 py-2 text-sm transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
