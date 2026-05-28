'use client';

import css from './NotesPage.module.css'
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debouncedSetQuery = useDebouncedCallback((search: string) => {
        setQuery(search)
        setCurrentPage(1);
    }, 300);

    const {data, isSuccess} = useQuery({
        queryKey: ['notes', query, currentPage],
        queryFn: () => fetchNotes(query, currentPage),
        placeholderData: keepPreviousData,
    });
    const totalPages = data?.totalPages ?? 0;

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearchChange={debouncedSetQuery}/>
            {isSuccess && totalPages > 1 && 
                <Pagination
                totalPages={totalPages}
                page={currentPage}
                setPage={setCurrentPage}
                />
            }
                <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
            </header>
            {data && data.notes.length > 0 && 
            <NoteList notes={data.notes} />}
            {/* {isModalOpen &&
            <Modal onClose={closeModal}>
                <NoteForm onClose={closeModal}/>
            </Modal>} */}
        </div>
    );
}