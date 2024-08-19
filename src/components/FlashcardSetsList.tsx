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
    <div className="grid grid-cols-3 gap-10 p-10">
      {flashcardSets.length > 0 ? (
        flashcardSets.map((set, index) => (
          <div
            key={set.id}
            className="relative bg-[#4E342E] w-60 h-60 cursor-pointer transform transition-transform hover:scale-105 text-center flex items-center justify-center text-[#FFC107] font-bold rounded-lg shadow-md hover:shadow-lg"
            onClick={() => handleButtonClick(set.id)}
          >
            <div className="p-4 text-sm">
              <h2>{set.title}</h2>
            </div>
          </div>
        ))
      ) : (
        <p>No flashcard sets found.</p>
      )}
    </div>
  );
}
