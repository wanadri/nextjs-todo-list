import NoteList from "./_components/NoteList"

function Notes() {
  return (
    <div className="flex justify-center bg-white h-screen w-screen text-gray-600 p-20">
      <div className="flex flex-col items-center space-y-4">
        <span className="font-semibold text-4xl">My Notes</span>
        <div>
          <NoteList></NoteList>
        </div>
      </div>
    </div>
  )
}

export default Notes