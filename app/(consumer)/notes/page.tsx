import { Suspense } from "react"
import NoteList from "./_components/NoteList"
import Loading from "./loading"

function Notes() {
  return (
    <div className="flex justify-center bg-white h-screen w-screen text-gray-600 p-20">
      <div className="flex flex-col items-center space-y-4 w-full">
        <span className="font-semibold text-4xl">My Notes</span>
        <Suspense fallback={<Loading />}>
          <NoteList></NoteList>
        </Suspense>
      </div>
    </div>
  )
}

export default Notes