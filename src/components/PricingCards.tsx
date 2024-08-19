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
import Link from "next/link";
import { Check, BadgeCheck } from "lucide-react";

export default function PricingCards({
  stripeCustomerId,
  isSubscribed,
  checkoutSessionURL,
}: {
  stripeCustomerId: string;
  isSubscribed: boolean;
  checkoutSessionURL: string;
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const handlePurchaseSubscription = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    const checkoutSession = await fetch("/api/pricing", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({ stripeCustomerId }),
    });
    const checkoutSessionJson = await checkoutSession.json();
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
      <Card className="w-[400px]">
        <CardHeader className="space-y-4">
          <CardTitle>Basic</CardTitle>
          <div>
            <CardTitle className="text-4xl">Free</CardTitle>
            <CardDescription>
              Enjoy limited features of our product!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="flex gap-2">
              <Check className="text-green-500 text-sm" size={20} />
              Create up to 5 flashcard sets!
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500 text-sm" size={20} />
              Learn from your own created sets!
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500 text-sm" size={20} />
              View other people's created sets!
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button disabled={!isSubscribed}>
            <Link href={checkoutSessionURL}>
              {isSubscribed ? `Unsubscribe` : `Current`}
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-[400px]">
        <CardHeader className="space-y-4">
          <CardTitle>Premium</CardTitle>
          <div>
            <CardTitle className="flex gap-2">
              <span className="text-4xl">$9.99</span>
              <span className="text-sm font-normal">/ month</span>
            </CardTitle>
            <CardDescription>
              Enjoy all of our product features!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="flex gap-2">
              <BadgeCheck className="text-green-500" size={20} />
              Create unlimited flashcard sets!
            </li>
            <li className="flex gap-2">
              <BadgeCheck className="text-green-500" size={20} />
              Learn from other people's created sets!
            </li>
            <li className="flex gap-2">
              <BadgeCheck className="text-green-500" size={20} />
              Unlock hints for your flashcards!
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubscribed} onClick={handlePurchaseSubscription}>
            {isSubscribed ? `Current` : `Purchase`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
