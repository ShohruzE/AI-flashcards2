"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '@clerk/nextjs';

interface FlashcardSet {
  id: string;
  title: string;
  createdAt: string;
  items: any[]; 
}

export default function FlashcardSetsList() {
  const { userId } = useAuth();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, 'flashcards'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const sets: FlashcardSet[] = [];
        querySnapshot.forEach((doc) => {
          sets.push({ id: doc.id, ...doc.data() } as FlashcardSet);
        });

        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    fetchFlashcardSets();
  }, [userId]);

  return (
    <div>
      {flashcardSets.length > 0 ? (
        flashcardSets.map((set) => (
          <div key={set.id} className="flashcard-set">
            <h2>{set.title}</h2>
            <p>Created at: {new Date(set.createdAt).toLocaleString()}</p>
            <p>Number of Flashcards: {set.items.length}</p>
            {/* you can add more details or a link to view the flashcards */}
          </div>
        ))
      ) : (
        <p>No flashcard sets found.</p>
      )}
    </div>
  );
}
