import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#4A2F2D] text-[#FFC107] pt-5 pb-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1>HoneyComb</h1>
          </div>
          <div>
            <ul>
              <li>
                <Link href="/library">Library</Link>
              </li>
              <li>Tasks</li>
              <li>Profile</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
