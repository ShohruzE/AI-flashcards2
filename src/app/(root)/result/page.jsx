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
      <div className="bg-[#5D4037] text-[#FFC107]">
        <div className="container mx-auto">
          <div className="flex min-h-screen justify-center items-center">
            <div className="w-full p-16 rounded-xl flex flex-col justify-center items-center gap-6">
              <h1 className="font-bold text-3xl">Result</h1>
              <div>
                <Progress value={75} className="w-[50%] bg-white text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#5D4037] text-[#FFC107]">
      <div className="container mx-auto">
        <div className="flex min-h-screen justify-center items-center">
          <div className="w-full p-16 rounded-xl flex flex-col justify-center items-center gap-6">
            <h1 className="font-bold text-3xl">Result</h1>
            <div>
              <Progress value={75} className="w-[50%]" />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {paymentStatus === "paid" ? (
              <h4 className="text-green-500 text-5xl">Payment successful!</h4>
            ) : (
              <h4 className="text-red-500 text-5xl">Payment failed!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
