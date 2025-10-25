"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavMenu } from "./Nav-menu";
import { NavigationSheet } from "./Navigation-sheet";
import { signOut, useSession } from "next-auth/react";
import LogoMark from "../LogoMark";

const Navbar = () => {
  const { status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-10">
        <Link href="/" className="flex-shrink-0">
          <LogoMark />
        </Link>

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {status === "authenticated" ? (
            <Button
              variant="destructive"
              className="px-4 py-2 text-sm sm:text-base"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          ) : (
            <Button className="rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base">
              <Link href="/login" className="block w-full text-center">
                Login
              </Link>
            </Button>
          )}

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
