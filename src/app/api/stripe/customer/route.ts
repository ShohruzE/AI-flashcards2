import { stripe } from "@/app/api/pricing/route";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createCustomer } from "@/lib/stripe";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const customer = await stripe.customers.retrieve(userId);
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: "An error occurred" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: "An error occurred" },
    });
  }
}
