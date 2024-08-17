import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import honeycomb from "@/images/honeycomb.png";

export default function Home() {
  return (
    <section className="bg-[#5D4037] text-[#FFC107] flex min-h-screen flex-col items-center">
      <h1 className="font-extrabold text-4xl pt-10 pb-1">Welcome to HoneyComb</h1>
      <p className="text-lg pb-10">Create flashcards instantly using AI!</p>

      <div className="bg-[#FFF3E0] h-max w-9/12 rounded-md p-4 mt-8">
        <div className="justify-start w-3/6 rounded-md p-4 pl-10">
          <CreateFlashcardsForm />
        </div>
      </div>
    </section>
  );
}
