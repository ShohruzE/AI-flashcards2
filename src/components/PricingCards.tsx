"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import getStripe from "@/getStripe";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PricingCards({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    console.log(stripeCustomerId);

    const checkoutSession = await fetch("/api/pricing", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({ stripeCustomerId }),
    });
    const checkoutSessionJson = await checkoutSession.json();
    console.log(checkoutSessionJson);
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardTitle className="text-3xl">Free</CardTitle>
          <CardDescription>
            Enjoy limited features of our product!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button disabled>Current</Button>
        </CardFooter>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Premium</CardTitle>
          <CardTitle className="text-3xl">$9.99</CardTitle>
          <CardDescription>Enjoy all of our product features!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Purchase</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
