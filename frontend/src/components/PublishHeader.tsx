import { Avatar } from "./Blogcard";

const PublishHeader = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center px-40 py-4">
        {/* Left section */}
        <div className="flex items-center">
          <div className="text-3xl pr-4 font-extrabold font-serif">Medium</div>
          <div className="text-sm pr-4  text-slate-700 font-normal">Drafts of nikhil</div>
          <div className="text-sm text-slate-500 font-light">saved</div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Publish button */}
          <button
            type="button"
            className="text-white bg-green-600 font-medium rounded-full text-sm pl-2 pr-2 pt-1 pb-1 text-center"
          >
            Publish
          </button>
          
          {/* Bell Icon (for notifications or other actions) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          
          {/* Avatar */}
          <Avatar size={28} name="Nikhil Achale" />
        </div>
      </div>
    </div>
  );
};

export default PublishHeader;