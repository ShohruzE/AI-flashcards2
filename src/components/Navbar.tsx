import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-black text-white py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl">
              <Link href="/">HoneyComb</Link>
            </h1>
          </div>
          <div className="flex flex-row items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/main">Home</Link>
              </li>
              <li>
                <Link href="/library">My Library</Link>
              </li>
              <li>
                <Link href="/create">Create</Link>
              </li>
              <li>
                <SignedOut>
                  <Button variant="secondary">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
