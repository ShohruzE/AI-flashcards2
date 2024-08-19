import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import { createCustomer, hasSubscription } from "@/lib/stripe";
import dynamic from "next/dynamic";

const BeeCursor = dynamic(() => import("@/components/BeeCursor"), { ssr: false });

export default async function Create() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);

  return (
    <div className="bg-[#5D4037] text-[#FFC107] flex min-h-screen items-center">
      <div className="container mx-auto justify-center pr-50">
        <div className="w-full max-w-screen-md bg-[#4A2F2D] p-24 rounded-md drop-shadow-2xl">
          <CreateFlashcardsForm isSubscribed={isSubscribed} />
        </div>
      </div>
      <BeeCursor/>
    </div>
  );
}
