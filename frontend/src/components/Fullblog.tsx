import { BlogTypes } from "../hooks/useBlogs";
import { Avatar } from "./Blogcard";

export const Fullblog = ({ blog }: { blog: BlogTypes }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-screen-xl px-10  pt-20">
                <div className="grid grid-cols-12 ">
                    <div className="col-span-8 flex flex-col ">
                        <div className="text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2 ">
                            Posted on 24 Feb 2024
                        </div>
                        <div className="pt-3 text-justify">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 pl-10 pr-10 text-slate-600 text-lg ">
                        Author
                        <div className="flex">
                            <div className="pr-2 flex flex-col justify-center">
                            <Avatar size={30} name= {blog.author.name || "Unknown"}/>
                            </div>
                            <div className="">
                            <div className="text-xl font-bold  ">
                       {blog.author.name || "Unknown"}
                        </div> 
                        <div className="pt-2 text-slate-700">
                        Designs generated from v0.dev - an AI service by vercel that lets you generate frontends
                    </div>
                            </div>

                        </div>
                       
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Fullblog;