"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./Nav-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import LogoMark from "../LogoMark";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-64 sm:w-72 md:w-80 p-6 flex flex-col "
      >
       
        <DialogTitle className="text-2xl font-bold "><LogoMark/></DialogTitle>

        <NavMenu orientation="vertical" className="flex flex-col space-y-2 -mt-96" />
      </SheetContent>
    </Sheet>
  );
};
