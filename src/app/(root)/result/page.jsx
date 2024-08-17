"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getStripe from "@/getStripe";

import { Progress } from "@/components/ui/progress";

export default function ResultPage() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/pricing?session_id=${session_id}`);
        const sessionData = await response.json();

        if (response.ok) {
          setPaymentStatus(sessionData.payment_status);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        setError("An error occurred while fetching the checkout session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex min-h-screen justify-center items-center">
          <div className="bg-slate-400 text-black w-full p-16 rounded-xl flex flex-col gap-6">
            <h1 className="font-bold text-3xl">Result</h1>
            <div>
              <Progress value={75} className="w-[50%]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex min-h-screen justify-center items-center">
        <div className="bg-slate-500 text-black w-full p-16 rounded-xl flex flex-col gap-6">
          <h1 className="font-bold text-3xl">Result</h1>
          {error && <div>{error}</div>}
          {paymentStatus === "paid" ? (
            <div>
              <h2>Payment successful!</h2>
            </div>
          ) : (
            <div>
              <h2>Payment failed!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
