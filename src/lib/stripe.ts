import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2024-06-20",
});

// price_1Po6wvFe9wWONWca4EY1Yx3U

export async function hasSubscription(stripeCustomerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "active",
  });

  return subscriptions.data.length > 0;
}

export async function createCustomer() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    console.error("No user found");
    return;
  }
  const usersRef = doc(db, "users", clerkUser?.id);
  const docSnap = await getDoc(usersRef);

  if (!docSnap.exists()) {
    const customer = await stripe.customers.create({
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0].emailAddress,
    });

    const userDocRef = doc(db, "users", clerkUser?.id);
    await setDoc(
      userDocRef,
      { stripeCustomerId: customer.id },
      { merge: true }
    );

    return customer.id;
  }
  return docSnap.data().stripeCustomerId;
}

export async function createCheckoutSessionURL(stripeCustomerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: "http://localhost:3000/",
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
