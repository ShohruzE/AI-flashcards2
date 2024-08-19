import {
  createCustomer,
  hasSubscription,
  createCheckoutSessionURL,
} from "@/lib/stripe";
import PricingCards from "@/components/PricingCards";

export default async function Pricing() {
  const stripeCustomerId = await createCustomer();
  let isSubscribed = false;
  let checkoutSessionURL = "";
  if (stripeCustomerId == null) {
    isSubscribed = false;
  } else {
    isSubscribed = await hasSubscription(stripeCustomerId);
  }

  if (stripeCustomerId && stripeCustomerId.startsWith("cus_")) {
    checkoutSessionURL = await createCheckoutSessionURL(stripeCustomerId);
  }

  return (
    <section className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <div className="container mx-auto p-24">
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="text-3xl font-bold">Pricing</h1>
          <PricingCards
            stripeCustomerId={stripeCustomerId}
            isSubscribed={isSubscribed}
            checkoutSessionURL={checkoutSessionURL}
          />
        </div>
      </div>
    </section>
  );
}
