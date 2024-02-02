"use client"

import { useNoteStore } from "@/store/Note";
import { useEffect, useState } from "react";

function NoteList() {
  // state
  const notes = useNoteStore((state) => state.notes);
  const displayForm =  useNoteStore((state) => state.displayNoteForm);

  // methods || actions
  const getNoteList = useNoteStore((state) => state.getNoteList);
  const toggleNoteForm = useNoteStore((state) => state.toggleNoteForm);

  useEffect( () => {
    getNoteList();
  });

  return (
    <>
        {notes.map((note) => {
          return (
            <div key={note.id} className="flex flex-col bg-gray-100 p-4 rounded-md space-y-2 w-[30%] border border-gray-400">
              <span className="font-semibold text-lg">{note.title}</span>
              <span>{note.content}</span>
            </div>
          )
        })}
        <div className="flex flex-col bg-gray-100 p-4 rounded-md space-y-2 w-[30%] border border-gray-400 items-center align-middle">
          {displayForm ? <div>Form </div> : <div><button onClick={() => toggleNoteForm()}>Add Note</button></div>}
        </div>
    </>
  )
}

export default NoteList