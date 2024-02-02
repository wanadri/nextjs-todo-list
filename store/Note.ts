import { create } from 'zustand'


type NoteState = {
  notes: Note[]
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
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  getNoteList: async () => {
      const response = await fetch('https://localhost:4000/notes');
      const notes = await response.json();
      set({ notes });
  }
}))