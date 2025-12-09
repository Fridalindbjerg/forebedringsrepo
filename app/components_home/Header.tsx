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
    <header className="col-full sticky top-0 bg-black h-20 flex items-center border-y-2 border-(--pink) z-50">
      <div className="flex relative w-full h-full">
        {/* Trekanterne i hhv. højre og venstre hjørne: */}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink)" />
        <div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-(--pink)" />
        {/* ---- */}

        {/* Menu */}
        <div className="w-full max-w-[1200px] mx-auto px-8 flex justify-between items-center">
          <div>
            <a href="/">
              <img src="/assets/icon/Logo_main.svg" alt="Night Club Logo" />
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
                {pathname === item.href && <img src="/assets/bottom_line2.png" alt="Bottom line" className="mt-1 w-20" />}
              </li>
            ))}
          </ul>
          {/* Burger menu: */}
          <button className="md:hidden text-white text-3xl z-50" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
        {/* Mobil fullscreen overlay menu */}
        {open && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            {/* X-Knap */}
            <button
              className="absolute top-6 right-6 text-white text-4xl"
              // false fordi vi lukker menuen og den derfor er setOpen falsk
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* Menu items */}
            <ul className="flex flex-col text-center gap-10 text-white text-2xl">
              {/* Looper gennem alle menupunkter fra menuItems-arrayet */}
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    // Luk menuen når man klikker på et menupunkt
                    onClick={() => setOpen(false)}
                    // Hvis den aktuelle side matcher linkets href → farves det pink, og ellers hvid
                    className={`${pathname === item.href ? "text-(--pink)" : "text-white"} tracking-wide`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
