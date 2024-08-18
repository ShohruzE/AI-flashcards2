"use server";

import FlashcardSetsList from "../../../components/FlashCardsSetsList";
import { createCustomer } from "@/lib/stripe";

export default async function Library() {
  const customerId = await createCustomer();
  console.log(customerId);

  return (
    <div className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <h1>Library</h1>
      <FlashcardSetsList />
    </div>
  );
}
