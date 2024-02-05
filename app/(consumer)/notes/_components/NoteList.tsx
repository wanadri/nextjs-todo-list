"use client"

import { useNoteStore } from "@/store/Note";
import { useEffect, useState, useRef } from "react";
import NoteForm from "./NoteForm";
import clsx from 'clsx';

function NoteList() {
  // refs
  const holdTimeOut = useRef<NodeJS.Timeout>();

  // state
  const notes = useNoteStore((state) => state.notes);
  const displayForm =  useNoteStore((state) => state.displayNoteForm);
  const [editMode, setEditMode] = useState(false);

  // store actions
  const getNoteList = useNoteStore((state) => state.getNoteList);
  const toggleNoteForm = useNoteStore((state) => state.toggleNoteForm);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  // actions
  const setWiggleCard = () =>   setEditMode(true);
  const holdCard = () => holdTimeOut.current = setTimeout(setWiggleCard, 3000);
  const cancelHoldTime = () => {
    if (! editMode) {
      clearTimeout(holdTimeOut.current)
    }
  }
  const cancelEditMode = () => setEditMode(false);

  // useEffect
  useEffect( () => {
    getNoteList();
  },[getNoteList]);

  return (
    <>
        {notes.map((note) => {
          return (
            <div
              onMouseDown={(e) => holdCard()}
              onMouseUp={(e) => cancelHoldTime()}
              key={note.id}
              className={
                clsx('note-card flex flex-col bg-gray-100 p-4 rounded-md space-y-2 w-[30%] relative', editMode && 'wiggle-card')
              }
            >
              {
                editMode &&
                <div className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1 -mx-2 -my-2 cursor-pointer" onClick={() => deleteNote(note.id)} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              }
              <span className="font-semibold text-lg">{note.title}</span>
              <span>{note.content}</span>
            </div>
          )
        })}
        <div
          className={
            clsx('flex flex-col bg-gray-700 p-4 rounded-md space-y-2 w-[30%] text-gray-100 font-semibold')
          }
        >
          {
            displayForm ?
              <NoteForm /> :
              <div className="flex flex-col items-center align-middle">
                {
                      editMode &&
                      <button onClick={() => cancelEditMode()}>Cancel</button>
                }
                <button onClick={() => toggleNoteForm()}>Add Note</button>
              </div>
          }
        </div>
    </>
  )
}

export default NoteList