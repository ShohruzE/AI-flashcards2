import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
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
