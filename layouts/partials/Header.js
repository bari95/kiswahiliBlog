import Logo from "@components/Logo";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { main } = menu;
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const img = new Image();
    img.src = "/images/maasai_woman.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  return (
    <header className="relative md:h-[100px] lg:h-[700px] xl:h-[800px] 2xl:h-[00px] flex items-center">
      {imageLoaded && (
        <>
          <div
            className="absolute inset-0 bg-black opacity-40"
            style={{
              backgroundImage: `url('/images/maasai_woman.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center space-x-4 lg:space-x-8">
                <ThemeSwitcher />
                <div
                  className="cursor-pointer text-white"
                  onClick={() => setSearchModal(true)}
                >
                  <IoSearch />
                </div>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="lg:hidden cursor-pointer text-white"
                >
                  {showMenu ? (
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <title>Menu Close</title>
                      <polygon
                        points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                        transform="rotate(45 10 10)"
                      />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <title>Menu Open</title>
                      <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`lg:hidden ${
                showMenu ? "block" : "hidden"
              } absolute top-20 right-0 w-full bg-white shadow-lg`}
            >
              <ul className="flex flex-col space-y-4 p-4">
                {main.map((menu, i) => (
                  <li key={`menu-${i}`}>
                    {menu.hasChildren ? (
                      <div className="group relative">
                        <span className="cursor-pointer inline-flex items-center">
                          {menu.name}
                          <svg
                            className="h-4 w-4 ml-2 fill-current transition-transform group-hover:rotate-90"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                        <ul
                          className="hidden ml-4 group-hover:block transition-all duration-300"
                          aria-hidden={!showMenu}
                        >
                          {menu.children.map((child, i) => (
                            <li key={`children-${i}`}>
                              <Link
                                href={child.url}
                                className={`block ${
                                  router.asPath === child.url
                                    ? "text-primary"
                                    : ""
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={menu.url}
                        className={`block ${
                          router.asPath === menu.url ? "text-primary" : ""
                        }`}
                      >
                        {menu.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        </>
      )}
    </header>
  );
};

export default Header;
