import { create } from 'zustand'
import useApi from '@/hooks/useApi';

type NoteState = {
  notes: Note[],
  displayNoteForm: boolean,
  toggleNoteForm: () => void,
  addNote: (note: Note) => void,
  getNoteList: () => Promise<void>,
  storeForm: (form: NoteForm) => void,
  deleteNote: (id: string) => void,
}

type Note = {
  id: string;
  title: string;
  content: string;
}

type NoteForm = Omit<Note, 'id'>;

export const useNoteStore = create<NoteState>()((set,get) => ({
  notes: [],
  displayNoteForm: false,
  toggleNoteForm: () => set((state) => ({ displayNoteForm: !state.displayNoteForm })),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  getNoteList: async () => {
      const response = await useApi.get({ url: '/notes' });
      const notes = await response.json();

      set({ notes });

      return notes;
  },
  storeForm: async (form: NoteForm) => {
    await useApi.post({ url: '/notes', body: JSON.stringify(form) });
    await get().getNoteList();
  },
  deleteNote: async (id: string) => {
    await useApi.destroy({ url: `/notes/${id}` });
    await get().getNoteList();
  }
}))