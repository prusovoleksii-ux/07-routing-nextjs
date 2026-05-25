import axios from "axios";
import { NewNoteValues, Note } from "../types/note";

const url = "https://notehub-public.goit.study/api/notes";

export interface Resp {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, currentPage: number): Promise<Resp> {
  const res = await axios.get<Resp>(url, {
    params: {
      search: query,
      page: currentPage,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`${url}/${id}`, 
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }
    });
  return res.data;
};

export async function postNote(newNote: NewNoteValues): Promise<Note> {
  const res = await axios.post<Note>(
    url, 
    newNote, 
    {headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await axios.delete<Note>(
    url+'/'+noteId, 
    {headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}