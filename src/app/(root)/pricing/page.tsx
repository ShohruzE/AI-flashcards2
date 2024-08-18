import { createCustomer } from "@/lib/stripe";
import PricingCards from "@/components/PricingCards";

export default async function Pricing() {
  const stripeCustomerId = await createCustomer();

  return (
    <section className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <div className="container mx-auto p-24">
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="text-3xl">Pricing</h1>
          <PricingCards stripeCustomerId={stripeCustomerId} />
        </div>
      </div>
    </section>
  );
}
