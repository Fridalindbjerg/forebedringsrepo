"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

      {/* Menu */}
      <div
        className="h-full flex items-center justify-between
      w-full  mx-auto
      md:col-[content-start/content-end]
      md:mx-0 md:w-auto 
      px-6
      md:px-4
      xl:px-0"
      >
        <div>
          <a href="/">
            <Image
              src="/assets/icon/Logo_main.svg"
              alt="Night Club Logo"
              width={120} // juster bredde efter behov
              height={60} // juster højde efter behov
            />
          </a>
        </div>
        {/* liste over menupunkter, hvor hvert punkt er et link, og hvis dets href matcher den aktuelle side (pathname), vises et billede under det for at indikere, at det er aktivt. */}
        <ul className="hidden md:flex gap-10 text-white">
          {/* mapper over menuItems arrayet for at generere menupunkterne, og tilføjer en betingelse for at vise et billede under det aktive menupunkt*/}
          {menuItems.map((item, index) => (
            <li key={index} className="cursor-pointer flex flex-col items-center">
              {/* item.label kommer også fra menuItems, fx "Home" eller "Blog". */} {/* item.href kommer fra dit menuItems-array, fx "/" eller "/blog" */}
              <a
                href={item.href}
                // Gør det aktive menupunkt pink, ellers hvidt
                className={`${pathname === item.href ? "text-(--pink)" : "text-white"}`}
              >
                {item.label}
              </a>
              {/* Hvis den aktuelle rute matcher linket → vis den lille pink underline-grafik */}
              {pathname === item.href && (
                <Image
                  src="/assets/bottom_line2.png"
                  alt="Bottom line"
                  width={80} // px, svarer til w-20
                  height={4} // px, svarer til h-1
                  className="mt-1"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
