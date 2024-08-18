import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import { createCustomer } from "@/lib/stripe";

export default async function Create() {
  const customerId = await createCustomer();
  console.log(customerId);

  return (
    <div className="bg-[#5D4037] text-[#FFC107] flex min-h-screen items-center">
      <div className="container mx-auto justify-center pr-50">
        <div className="w-full max-w-screen-md bg-[#4A2F2D] p-24 rounded-md drop-shadow-2xl">
          <CreateFlashcardsForm />
        </div>
      </div>
    </div>
  );
}
