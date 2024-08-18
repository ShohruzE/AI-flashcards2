"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '@clerk/nextjs';

interface FlashcardSet {
  id: string;
  title: string;
  createdAt: Date;
  items: any[];
}

export default function Library() {
  const { userId } = useAuth();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, 'flashcards'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const sets: FlashcardSet[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
          sets.push({ id: doc.id, title: data.title, createdAt, items: data.items });
        });

        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    fetchFlashcardSets();
  }, [userId]);

  const handleButtonClick = (setId: string) => {
    router.push(`/learn/${setId}`);
  };

  return (
    <div className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <div className="container flex flex-row mx-auto p-8 items-center">
        <h1 className="text-start text-2xl font-bold pr-4">Your Flashcards</h1>
        <p className="text-2xl font-medium">{flashcardSets.length}</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set, index) => (
            <div
              key={set.id}
              className="relative w-32 h-32 bg-yellow-500 cursor-pointer transform transition-transform hover:scale-105 text-center flex items-center justify-center text-white font-bold"
              onClick={() => handleButtonClick(set.id)}
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                margin: index % 2 === 0 ? "0px 10px 20px 0px" : "20px 0px 0px 10px",
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
      </div>
    </div>
  );
}
