"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Menu items array:
  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "BLOG", href: "/blog" },
    { label: "BOOK TABLE", href: "/booktable" },
    { label: "CONTACT US", href: "/contactus" },
  ];

  return (
    <header
      className="
    col-[full-start/full-end]
    sticky top-0 z-50 h-20 bg-black border-y-2 border-(--pink)
    md:grid md:grid-cols-subgrid
  "
    >
      {/* Trekanter */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink)" />
      <div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-(--pink)" />

      <div
        className="
      h-full flex items-center justify-between
      w-full  mx-auto
      md:col-[content-start/content-end]
      md:mx-0 md:w-auto 
      px-6
      md:px-4
      xl:px-0
    "
      >
        <a href="/">
          <img src="/assets/icon/Logo_main.svg" alt="Night Club Logo" />
        </a>

        <ul className="hidden md:flex gap-10 text-white">
          {menuItems.map((item, i) => (
            <li key={i} className="cursor-pointer flex flex-col items-center">
              <a href={item.href} className={pathname === item.href ? "text-(--pink)" : "text-white"}>
                {item.label}
              </a>
              {pathname === item.href && <img src="/assets/bottom_line2.png" alt="" className="mt-1 w-20" />}
            </li>
          ))}
        </ul>

        <button className="md:hidden text-white text-4xl z-50" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <button className="absolute top-6 right-6 text-white text-4xl" onClick={() => setOpen(false)}>
            ✕
          </button>
          <ul className="flex flex-col text-center gap-10 text-white text-2xl">
            {menuItems.map((item, i) => (
              <li key={i}>
                <a href={item.href} onClick={() => setOpen(false)} className={`${pathname === item.href ? "text-(--pink)" : "text-white"} tracking-wide`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>

    
  );
};

export default Header;
