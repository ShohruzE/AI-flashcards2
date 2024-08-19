import { createCustomer, hasSubscription } from "@/lib/stripe";
import LearnFlashcard from "@/components/LearnFlashcard";
import dynamic from "next/dynamic";

const BeeCursor = dynamic(() => import("@/components/BeeCursor"), { ssr: false });

export default async function FlashcardSetPage() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);

  return (
    <div className="p-4 bg-[#5D4037] text-[#FFC107] flex flex-col min-h-screen justify-center items-center">
      <LearnFlashcard isSubscribed={isSubscribed} />
    <BeeCursor/>
    </div>
  );
}
