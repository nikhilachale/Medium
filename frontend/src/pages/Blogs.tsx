import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {

  const {loading,blogs}=useBlogs();

  if(loading)
  {
    return(
      <div>
        Loading
      </div>
    )
  }

  const blogData = [
    {
      authorName: "Nikhil Achale",
      title: "Cohort Course Overview",
      content: "In this cohort-based course, we will dive deep into the concepts of programming, data structures, and algorithms. This course is designed to give you hands-on experience in solving real-world problems through practical exercises, projects, and collaborative learning. By the end of this course, you will have a strong foundation in computer science concepts and will be able to confidently apply them in the industry.",
      publishDate: "24 Feb 2024"
    },
    {
      authorName: "John Doe",
      title: "Understanding Machine Learning",
      content: "Machine learning is a powerful field of AI that allows systems to learn from data and make predictions or decisions without being explicitly programmed. This blog will explore the fundamentals of machine learning, its applications, and some of the popular algorithms that are used in the industry.",
      publishDate: "18 Feb 2024"
    },
    {
      authorName: "Jane Smith",
      title: "The Future of Web Development",
      content: "Web development is constantly evolving with new technologies and frameworks emerging every year. In this blog, we will discuss the future trends in web development, including advancements in JavaScript, CSS, and new web development tools that are shaping the digital world.",
      publishDate: "15 Feb 2024"
    },
    {
      authorName: "Alice Johnson",
      title: "Introduction to Cloud Computing",
      content: "Cloud computing is the delivery of computing services like servers, storage, and databases over the internet. This blog will introduce cloud computing concepts, explain its advantages, and discuss popular cloud platforms such as AWS, Google Cloud, and Microsoft Azure.",
      publishDate: "12 Feb 2024"
    }
  ];

  return (
<div className="">
  <Appbar/>
    <div className="flex justify-center">
    <div className="flex justify-center flex-col max-w-xl ">
      {blogData.map((blog, index) => (
        <Blogcard 
          key={index}
          authorName={blog.authorName}
          title={blog.title}
          content={blog.content}
          publishDate={blog.publishDate}
        />
      ))}
    </div>
    </div>
    </div>
  );
};

export default Blogs;