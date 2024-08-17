import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-[#5D4037] text-[#FFC107] flex min-h-screen flex-col items-center">
      <h1 className="font-extrabold text-4xl pt-10 pb-1">Welcome to HoneyComb</h1>
      <p className="text-lg pb-10">Create flashcards instantly using AI!</p>

      <div className="bg-[#FFF3E0] h-573 w-9/12 rounded-md p-4 mt-8">
        <div className="bg-[#FFC107] rounded-md p-4">
          <p>Enter your topic or academic subject</p>
        </div>
      </div>
    </section>
  );
}
