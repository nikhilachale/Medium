import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { BlogcardSkeleton } from "../components/BlogSkeleton";

import { useBlogs } from "../hooks/useBlogs";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
      return <div><BlogcardSkeleton/></div>;
  }

  // ✅ Check if blogs is undefined or empty before using .map()
  if (!blogs || blogs.length === 0) {
      return <div>No blogs found.</div>;
  }

  return (
      <div className="">
          <Appbar />
          <div className="flex justify-center">
              <div className="flex justify-center flex-col max-w-xl">
                  {blogs.map((blog, index) => (
                      <Blogcard 
                          id={blog.id}
                          key={index}
                          authorName={blog?.author?.name || "Unknown"} 
                          title={blog?.title || "No Title"}
                          content={blog?.content || "No Content Available"}
                          publishDate={"12 Feb 2024"}
                      />
                  ))}
              </div>
          </div>
      </div>
  );
};

export default Blogs;