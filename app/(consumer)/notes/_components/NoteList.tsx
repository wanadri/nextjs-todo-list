"use client";

import { useNoteStore } from "@/store/Note";

function NoteList() {
  useNoteStore((state) => state.getNoteList);

  const notes = useNoteStore((state) => state.notes);

  return (
    <>
      <div>
        {notes.map((note) => {
          return (
            <div key={note.id} className="flex flex-col bg-gray-100 p-4 rounded-md space-y-2">
              <span className="font-semibold text-lg">{note.title}</span>
              <span>{note.content}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NoteList