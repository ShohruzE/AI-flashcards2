import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";

export default function Create() {
  return (
    <div className="bg-[#5D4037] text-[#FFC107] flex min-h-screen justify-center items-center">
      <div className="container mx-auto">
        <div className="w-full max-w-screen-md bg-[#FFF3E0] ">
          <CreateFlashcardsForm />
        </div>
      </div>
    </div>
  );
}
