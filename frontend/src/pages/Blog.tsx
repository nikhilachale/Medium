
import Fullblog from "../components/Fullblog";
// import { FullBlog } from "../components/FullBlog";
// import { Spinner } from "../components/Spinner";

import {useParams} from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import { Appbar } from "../components/Appbar";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id ? parseInt(id) : 0
    });

    if (loading || !blog) {
        return <div>
          
        <FullBlogSkeleton/>
        </div>
    }
    return <div>
        <Appbar/>
        <Fullblog blog={blog} />
    </div>
}

const FullBlogSkeleton = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-screen-xl px-10 pt-20">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 flex flex-col space-y-4">
                        {/* Skeleton for Title */}
                        <div className="w-3/4 h-8 bg-gray-300 rounded animate-pulse"></div>

                        {/* Skeleton for Post Date */}
                        <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>

                        {/* Skeleton for Content */}
                        <div className="w-full h-32 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="col-span-4 pl-10 pr-10 text-slate-300 text-lg space-y-4">
                        {/* Skeleton for Author Section */}
                        <div className="flex items-center space-x-4">
                            {/* Skeleton for Avatar */}
                            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>

                            {/* Skeleton for Author Name and Info */}
                            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>

                        {/* Skeleton for Description */}
                        <div className="w-48 h-6 bg-gray-300 rounded animate-pulse mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};