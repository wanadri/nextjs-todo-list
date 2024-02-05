import { useNoteStore } from "@/store/Note";
import { useForm } from 'react-hook-form';

type FormData = {
    title: string;
    content: string;
};

function NoteForm() {
    // Method || Actions
    const storeNote = useNoteStore(state => state.storeForm);
    const toggleNoteForm = useNoteStore((state) => state.toggleNoteForm);

    // form management
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => storeNote(data));

  return (
    <>
        <form className='flex flex-col space-y-2 text-black' onSubmit={onSubmit}>
            <input type="text" placeholder="Title" className='p-2 rounded-md' {...register('title', { required : "This is required" })} />
            {errors.title && <p role="alert text-red-500">{errors.title.message}</p>}
            <textarea placeholder="Content" className='p-2 rounded-md'  {...register('content', { required : "This is required" })}></textarea>
            {errors.content && <p role="alert text-red-500">{errors.content.message}</p>}
            <button type="submit" className='bg-gray-700 text-gray-100 p-2 rounded-md'>Save</button>
            <button type="button" onClick={() => toggleNoteForm()} className='bg-gray-700 text-gray-100 p-2 rounded-md'>Cancel</button>
        </form>
    </>
  )
}

export default NoteForm