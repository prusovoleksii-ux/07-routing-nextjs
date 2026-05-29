"use client";

import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

const NoteDetailsClient = ({ id }: Props) => {
  const router = useRouter();


  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const handleGoBack = () => {
      const isSure = confirm('Are you sure?');
    if (isSure) {
      router.back();
    }
  };

  return (
    <>
    <button onClick={handleGoBack}>Back</button>
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
    </>
  );
};

export default NoteDetailsClient;