import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  try {
    if (!sessionId) {
      throw new Error("Invalid session ID");
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    return new NextResponse.json(
      { error: { message: error.message } },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const { stripeCustomerId } = await req.json();

    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      line_items: [
        {
          price: "price_1Po6wvFe9wWONWca4EY1Yx3U",
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "origin"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "origin"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      {
        status: 500,
      }
    );
  }
}
