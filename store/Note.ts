import { create } from 'zustand'

type NoteState = {
  notes: Note[],
  displayNoteForm: boolean,
  toggleNoteForm: () => void,
  addNote: (note: Note) => void,
  getNoteList: () => Promise<void>
}

type Note = {
  id: string;
  title: string;
  content: string;
}

export const useNoteStore = create<NoteState>()((set) => ({
  notes: [],
  displayNoteForm: false,
  toggleNoteForm: () => set((state) => ({ displayNoteForm: !state.displayNoteForm })),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  getNoteList: async () => {
      const response = await fetch('http://localhost:4000/notes');
      const notes = await response.json();

      set({ notes });

      return notes;
  }
}))