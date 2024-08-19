"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '@clerk/nextjs';
import { FolderPen, Trash2 } from 'lucide-react';
import EditModal from '@/components/EditModal';
import DeleteModal from '@/components/DeleteModal';

interface FlashcardSet {
  id: string;
  title: string;
  createdAt: Date;
  items: any[];
}

export default function Library({ isSubscribed }: { isSubscribed: boolean }) {
  const { userId } = useAuth();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      if (!userId) return;
      try {
        const q = query(
          collection(db, "flashcards"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const sets: FlashcardSet[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date(data.createdAt);
          sets.push({
            id: doc.id,
            title: data.title,
            createdAt,
            items: data.items,
          });
        });
        setFlashcardSets(sets);
      } catch (error) {
        console.error("Error fetching flashcard sets:", error);
      }
    };
    fetchFlashcardSets();
  }, [userId]);

  const editFlashcardSetName = async (setId: string) => {
    try {
      const set = doc(db, 'flashcards', setId);
      await updateDoc(set, { title: newTitle });
      setFlashcardSets((prevSets) => //displays new title
        prevSets.map((set) =>
          set.id === setId ? { ...set, title: newTitle } : set
        )
      );
      setIsEditing(null);
      setNewTitle('');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating flashcard set:', error);
    }
  };

  const deleteFlashcardSet = async (setId: string) => {
    try {
      await deleteDoc(doc(db, 'flashcards', setId));
      setFlashcardSets((prevSets) =>
        prevSets.filter((set) => set.id !== setId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
    }
  }

  const handleButtonClick = (setId: string) => {
    router.push(`/learn/${setId}`);
  };

  return (
    <div className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <div className="container flex flex-row mx-auto p-8 items-center">
        <h1 className="text-start text-2xl font-bold pr-4">Your Flashcards</h1>
        <p className="text-2xl font-medium">{flashcardSets.length}</p>
      </div>
      <div className="container mx-auto flex flex-wrap justify-start gap-10">
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set) => (
            <div
              key={set.id}
              className="relative bg-[#4E342E] w-60 h-60 cursor-pointer transform transition-transform hover:scale-105 text-center flex items-center justify-center text-[#FFC107] font-bold rounded-lg shadow-md hover:shadow-lg"
              onClick={() => handleButtonClick(set.id)}
              style={{
                borderRadius: "8px",
              }}
            >
              <div className="p-4 text-sm">
                <h2>{set.title}</h2>
                <p>{set.items.length} items</p>
              </div>
              <button
                className="absolute bottom-2 left-2 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(set.id);
                  setNewTitle(set.title);
                  setIsEditModalOpen(true);
                }}
              >
                <FolderPen size={24} />
              </button>
              <button 
                className="absolute bottom-2 left-10 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleting(set.id);
                  setIsDeleteModalOpen(true);
                }}
                >
                <Trash2 size={24} />
              </button>
            </div>
          ))
        ) : (
          <p>No flashcard sets found.</p>
        )}
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={() => editFlashcardSetName(isEditing!)}
        title={newTitle}
        setTitle={setNewTitle}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => deleteFlashcardSet(isDeleting)}
      />
    </div>
  );
}