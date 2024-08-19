import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#4A2F2D] text-[#FFC107] pt-5 pb-5">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl hover:text-[#FFA000]">
              HoneyComb
            </h1>
          </div>
          <div className="">
            <ul className="">
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
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p>
            Created by Shohruz Ernazarov, Ynalois Pangilinan, and Darren Moy
          </p>
        </div>
      </div>
    </footer>
  );
}
