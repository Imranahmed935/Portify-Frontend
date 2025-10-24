"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavMenu } from "./Nav-menu";
import { NavigationSheet } from "./Navigation-sheet";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const session = useSession()
  
  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
   
        <Link href="/" className="flex-shrink-0 ">
          <h1 className="lg:text-3xl text-2xl font-bold text-blue-400">Portify</h1>
        </Link>

        <NavMenu className="hidden md:block" />


        <div className="flex items-center gap-4 md:gap-6">

        
         {
          session.status === "authenticated"?<Button
          variant="destructive"
          className="w-full justify-start gap-2 cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" })
          }}
        >
          Logout
        </Button>:<Button className="rounded-full px-5 py-2 text-sm md:text-base">
            <Link href="/login" className="block w-full text-center">
              Login
            </Link>
          </Button>
         }


          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
