import { Avatar } from "./Blogcard"; // Ensure Avatar is correctly imported

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between py-3 px-10">
            <div className="text-lg flex flex-col justify-center">Medium</div>
            <div>
                <Avatar size={28} name="Nikhil Achale" />
            </div>
        </div>
    );
}