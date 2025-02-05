import axios from "axios";
import { Avatar } from "../components/Blogcard";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();
    // Publish the blog
    const handlePublish = async () => {
        setLoading(true); // Show loading state
        setError(null); // Reset error state
        setSuccess(null); // Reset success message
    
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage");
            setLoading(false);
            return;
        }
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: desc
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

          navigate(`/blog/${response.data.blog.id}`)
            // Handle successful response
            setSuccess("Blog published successfully!");
            console.log(response.data.blog.id); // Handle your response data
        } catch (err: any) {
            // Handle error
            if (err.response) {
                // This means the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message || "Failed to publish the blog. Please try again.");
            } else if (err.request) {
                // The request was made but no response was received
                setError("Network error. Please try again.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("An unexpected error occurred.");
            }
            console.error(err); // Log the error for debugging
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="p-4">
            <div className="">
                <div className="flex justify-between items-center px-40 py-4">
                    {/* Left section */}
                    <div className="flex items-center">
                    <Link to={`/blogs`}>
                        <div className="text-3xl pr-4 cursor-pointer font-extrabold font-serif">Medium</div></Link>
                        <div className="text-sm pr-4 text-slate-700 font-normal">Drafts of nikhil</div>
                        <div className="text-sm text-slate-500 font-light">saved</div>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-6">

                        <button
                            onClick={handlePublish}
                            disabled={loading} // Disable the button while loading
                            type="button"
                            className="text-white bg-green-600 font-medium cursor-pointer rounded-full text-sm pl-3 pr-3 pt-2 pb-2 text-center"
                        >
                            {loading ? "Publishing..." : "Publish"}
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

            <div className="m-10 pl-48 flex w-full pr-56">
                <div className="flex-grow">
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        id="helper-text"
                        aria-describedby="helper-text-explanation"
                        className="bg-slate-50 border-l font-serif border-gray-300 text-gray-900 text-3xl block w-full h-fit p-2.5"
                        placeholder="Title"
                    />

                    <textarea
                        id="helper-text"
                        onChange={(e) => setDesc(e.target.value)}
                        aria-describedby="helper-text-explanation"
                        className="bg-slate-50 border-l font-serif border-gray-300 mt-4 text-gray-900 text-2xl w-full h-56 p-2.5"
                        placeholder="Tell your story..."
                    />
                </div>
            </div>

            {/* Display success or error message */}
            {success && <div className="text-green-600 mt-4">{success}</div>}
            {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
    );
};

export default Publish;