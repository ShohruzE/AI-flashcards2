"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

interface FlashcardSet {
  id: string;
  title: string;
}

export default function FlashcardSetsList({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flashcards"));
        const sets: FlashcardSet[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sets.push({ id: doc.id, title: data.title });
        });

        setFlashcardSets(sets);
      } catch (error) {
        console.error("Error fetching flashcard sets:", error);
      }
    };

    fetchFlashcardSets();
  }, []);

  const handleButtonClick = async (setId: string) => {
    if (isSubscribed) {
      router.push(`/learn/${setId}`);
    } else {
      toast({
        title: "Upgrade to premium",
        description: "You need to be subscribed to access this feature",
      });
    }
  };

  return (
    <>
      {flashcardSets.length > 0 ? (
        flashcardSets.map((set, index) => (
          <div
            key={set.id}
            className="relative w-32 h-32 bg-yellow-500 cursor-pointer transform transition-transform hover:scale-105 text-center flex items-center justify-center text-white font-bold"
            onClick={() => handleButtonClick(set.id)}
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              margin:
                index % 2 === 0 ? "0px 10px 20px 0px" : "20px 0px 0px 10px",
            }}
          >
            <div className="p-4 text-sm">
              <h2>{set.title}</h2>
            </div>
          </div>
        ))
      ) : (
        <p>No flashcard sets found.</p>
      )}
    </>
  );
}
