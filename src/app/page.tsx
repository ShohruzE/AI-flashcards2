import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import Image from "next/image";
import { createCustomer, hasSubscription } from "@/lib/stripe";

export default async function Home() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);
  console.log(isSubscribed);

  return (
    <section className="bg-[#5D4037] text-[#FFC107] flex min-h-screen flex-col items-center">
      <h1 className="font-extrabold text-4xl pt-10 pb-1">
        Welcome to HoneyComb
      </h1>
      <p className="text-lg pb-10">Create flashcards instantly using AI!</p>
      
    </section>
  );
}
