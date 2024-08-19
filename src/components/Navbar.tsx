import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { createCustomer, hasSubscription } from "@/lib/stripe";

export default async function Navbar() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);

  return (
    <header className="bg-[#4A2F2D] text-[#FFC107] py-8">
      <div className="px-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl hover:text-[#FFA000]">
              <Link href="/">HoneyComb</Link>
            </h1>
          </div>
          <div className="flex flex-row items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/explore"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/library"
                >
                  My Library
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFA000] font-bold" href="/create">
                  Create
                </Link>
              </li>
              <li className="flex justify-center items-center gap-2">
                <SignedOut>
                  <Button variant="secondary">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Badge className="bg-[#FFF3E0] text-[#5D4037] hover:bg-[#5D4037] hover:text-[#FFC107]">
                    {isSubscribed ? `Premium` : `Basic`}
                  </Badge>
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
