import { create } from 'zustand'

type NoteState = {
  notes: Note[],
  displayNoteForm: boolean,
  toggleNoteForm: () => void,
  addNote: (note: Note) => void,
  getNoteList: () => Promise<void>,
  storeForm: (form: NoteForm) => void,
}

type Note = {
  id: string;
  title: string;
  content: string;
}

type NoteForm = Omit<Note, 'id'>;

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
  },
  storeForm: async (form: NoteForm) => {
    console.log(form);
    await fetch('http://localhost:4000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
  },
}))