import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogTypes{
        "id": number,
        "title": string,
        "content": string,
        "author": {
            "name": string
        }
} 

export const useBlog=({id}:{id:number})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogTypes>(); 

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Fetched Blogs:", response.data);
            setBlog(response.data.blog); 
        })
        .catch(err => {
            console.error("Error fetching blogs:", err.response?.data || err.message);
        })
        .finally(() => setLoading(false));
    }, [id]);

    return { loading, blog };


}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogTypes[]>([]); // ✅ Default value as []

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Fetched Blogs:", response.data);
            setBlogs(response.data|| []); // ✅ Ensure blogs is always an array
        })
        .catch(err => {
            console.error("Error fetching blogs:", err.response?.data || err.message);
        })
        .finally(() => setLoading(false));
    }, []);

    return { loading, blogs };
};