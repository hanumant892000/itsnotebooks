import { BaseUrls } from "../BaseUrls";
import { useNotes } from "../contextapi/NotesState";
import { errorEmitter, successEmitter } from "../ToastifyEmitter";

const NoteCard = ({ noteId, title, description, image, createdAt, createdBy }) => {

  const { setAllNotes, allNotes } = useNotes()
  const currDate = new Date(createdAt)

  const deleteNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: receive cookies
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        successEmitter(data.message)
        // setAllNotes((notes) => notes?.filter((elm) => elm?._id != noteId))
        let newnotes = allNotes?.filter((elm)=>elm?._id!=noteId)
        setAllNotes(newnotes)
      }
      else {
        errorEmitter(data.message)
      }
    } catch (error) {
      console.log(error);
      errorEmitter("Internal Server Error")
    }
  }

  return (
    <>
      <article
        className="group relative overflow-hidden rounded-md border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >

        <div className="relative overflow-hidden">
          <img
            src={image || 'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260'}
            alt="Blog Image"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />


          <span
            className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
          >
            Technology
          </span>


          <div className="absolute right-3 top-3 flex gap-2">
            <span
              title="Edit"
              className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full bg-white text-rose-600 shadow transition hover:bg-rose-600 hover:text-white"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </span>

            <span
              title="Delete"
              onClick={deleteNote}
              className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full bg-white text-red-500 shadow transition hover:bg-red-500 hover:text-white"
            >
              <i className="fa-solid fa-trash-can"></i>
            </span>
          </div>
        </div>


        <div className="p-5">

          <div
            className="mb-3 flex justify-between items-center gap-2 text-sm text-gray-500"
          >
            <span><i className="fa-regular fa-calendar-days text-rose-500"></i>{currDate.toLocaleString()}</span>
            <span className="font-medium text-gray-400"> 5 min read </span>
          </div>


          <h2
            className="mb-3 text-md font-bold leading-snug text-gray-800 transition-colors group-hover:text-rose-600"
          >
            {title}
          </h2>


          <p className="text-sm leading-6 text-gray-600">
            {description?.slice(0,150)}...
          </p>
        </div>
      </article>
    </>
  );
};

export default NoteCard;
