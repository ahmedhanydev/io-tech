import { useEffect, useRef, useState } from "react";
import { navLinks } from "./navlinks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const NavLinkItem = ({ 
  linkItem, 
  onDropdownToggle,
  navbarRef
}: { 
  linkItem: typeof navLinks[0], 
  onDropdownToggle: (isOpen: boolean) => void,
  navbarRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onDropdownToggle(newIsOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the click is outside the dropdown's own area AND also outside the entire navbar, then close it.
      if (
        isOpen &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
          setIsOpen(false);
          onDropdownToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, isOpen, onDropdownToggle, navbarRef]); // <-- Add navbarRef to dependency array

  if (!linkItem.dropdown) {
    return (
      <Link href={linkItem.href}>
        <span className="text-sm font-bold text-white hover:text-white">{linkItem.name}</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      <div
        onClick={handleClick}
        className="text-[#2B2E7B] relative flex gap-x-2 cursor-pointer items-center font-bold"
      >
        <p className="text-sm text-white hover:text-white">{linkItem.name}</p>
        <div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 text-white  ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      <div
        className={`w-full xl:absolute duration-300 left-0 top-[80px] overflow-hidden ${
          isOpen ? "xl:h-[50vh]" : "h-0"
        } bg-opacity-10 flex flex-col backdrop-blur-sm bg-[#4B2615]`}
      >
        <div
          className="w-full h-full fixed"
        ></div>
        <div className=" relative  xl:px-[96px] py-8 overflow-auto xl:max-h-[80vh] sideNav">
          <p className="text-white text-xs uppercase mb-2">{linkItem.name}</p>
          {/* Add your service links here */}
          <Link href="/services/1"><span className="block py-2 text-white">Service One</span></Link>
          <Link href="/services/2"><span className="block py-2 text-white">Service Two</span></Link>
        </div>
      </div>
    </div>
  );
};