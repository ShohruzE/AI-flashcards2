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

import getStripe from "@/app/api/checkout_session";

export default function Pricing() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/pricing", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
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
    <section className="">
      <div className="container mx-auto bg-slate-300 p-24">
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="text-3xl">Pricing</h1>
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
                <CardDescription>
                  Enjoy all of our product features!
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
                <Button onClick={handleSubmit}>Purchase</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
