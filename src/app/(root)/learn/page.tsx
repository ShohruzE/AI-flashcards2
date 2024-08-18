import { createCustomer, hasSubscription } from "@/lib/stripe";

export default async function Learn() {
  const customerId = await createCustomer();
  const isSubscribed = await hasSubscription(customerId);

  console.log(isSubscribed);

  return (
    <div>
      <h1>Learn</h1>
    </div>
  );
}
