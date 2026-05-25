"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteList.module.css'
import Link from 'next/link';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: (noteId: string) => deleteNote(noteId),
        onSuccess: () => {
            console.log("Note deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    return (
        <>
        <ul className={css.list}>
            {notes.length !== 0 &&
                notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={() => deleteMutation.mutate(note.id)}>Delete</button>
                        <Link href={`/notes/${note.id}`}>View Details</Link>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}