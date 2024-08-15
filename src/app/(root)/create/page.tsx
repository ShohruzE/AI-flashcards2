import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";

export default function Create() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container mx-auto">
        <div className="w-full max-w-screen-md">
          <h1>Create</h1>
          <CreateFlashcardsForm />
        </div>
      </div>
    </div>
  );
}
