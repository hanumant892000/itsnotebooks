import { Link } from "react-router-dom";
import { useNotes } from "../contextapi/NotesState";
import NoteCard from '../components/NoteCard.jsx'
const Notes = () => {

  const { allNotes } = useNotes()
  console.log(allNotes);

  return (
    <>
      <div className="mx-auto pt-12 px-6 max-w-xl text-center">
        <h1 className="text-3xl capitalize pb-10 font-bold dark:text-gray-800 sm:text-5xl">
          Your Notes on cloud <br />
          <strong className="font-bold text-red-700 p-3 sm:block">
            {" "}
            - safe and secure{" "}
          </strong>
        </h1>
        { allNotes?.length > 0 && <Link
          to="/createnote"
          className="px-6 py-3 text-lg font-semibold rounded dark:bg-rose-600 dark:text-gray-50"
        >
          Create Notes
        </Link>}
      </div>
      <div className="px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {allNotes?.length > 0 && <h1 className="text-3xl pb-10 font-bold leading-none max-md:text-xl">
          Your <span className="text-rose-500">Notes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </h1>}
        {allNotes?.length > 0 ? <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {allNotes?.map((item) => {
            return <NoteCard key={item.title} noteId={item?._id} title={item?.title} description={item?.description} image={item?.image} createdAt={item?.createdAt} createdBy={item.createdBy} />
          })}
        </div>
          :
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-rose-50 via-white to-indigo-50 px-6 py-10 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-100 text-rose-500 shadow-sm">
              <i className="fa-regular fa-note-sticky text-4xl"></i>
            </div>


            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              No Notes Yet!
            </h2>


            <p className="mb-6 max-w-sm text-sm leading-6 text-gray-500">
              You haven't created any notes yet. Start organizing your thoughts
              and keep your important information in one place.
            </p>


            <Link
              to="/createnote"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-rose-600 hover:shadow-lg"
            >
              <i className="fa-solid fa-plus"></i>
              Create Your First Note
            </Link>

          </div>
        }

      </div>
    </>
  );
};

export default Notes;
