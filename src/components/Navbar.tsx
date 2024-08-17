import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Navbar() {
  return (
    <header className="bg-[#5D4037] text-[#FFC107] py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl hover:text-[#FFA000]">
              <Link href="/">HoneyComb</Link>
            </h1>
          </div>
          <div className="flex flex-row items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link className="hover:text-[#FFA000]" href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link className="hover:text-[#FFA000]" href="/explore">Explore</Link>
              </li>
              <li>
                <Link className="hover:text-[#FFA000]" href="/library">My Library</Link>
              </li>
              <li>
                <Link className="hover:text-[#FFA000]" href="/create">Create</Link>
              </li>
              <li className="flex justify-center items-center gap-2">
                <SignedOut>
                  <Button variant="secondary">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Badge className="bg-[#4A2F2D] text-[#FFC107] hover:bg-[#4A2F2D]">Basic</Badge>
                  <UserButton/>
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
