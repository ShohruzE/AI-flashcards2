import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import Image from "next/image";
import { createCustomer, hasSubscription } from "@/lib/stripe";

export default async function Create() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);

  return (
    <section className="bg-[#5D4037] text-[#FFC107] flex min-h-screen flex-col items-center">
      <div className="bg-[#FFF3E0] h-max w-9/12 rounded-md p-6 mt-8">
        <div className="flex justify-between items-center rounded-md">
          <div className="w-[50%]">
            <CreateFlashcardsForm isSubscribed={isSubscribed} />
          </div>
          <Image
            width={500}
            height={400}
            src="/images/honeycomb.png"
            alt="HoneyComb header logo"
          />
        </div>
      </div>
    </section>
  );
}
