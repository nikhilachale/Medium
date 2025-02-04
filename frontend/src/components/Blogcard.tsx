interface BlogcardProps {
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
}

export const Blogcard = ({ authorName, title, content, publishDate }: BlogcardProps) => {
    return (
        <div className="border-b border-slate-200 pb-4 p-4 pt-5">
            <div className="flex text-xl">
                <div className="flex justify-center flex-col pr-1">
                    <Avatar size={20} name={authorName} />
                </div>

                <div className="font-light text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 pr-1"> 
                    <Circle />
                </div>

                <div className="font-thin flex justify-center flex-col text-slate-500 text-sm">{publishDate}</div>
            </div>
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="text-lg font-normal">
                {content.slice(0, 100)}....
            </div>
            <div className="text-slate-400 text-sm font-light pt-2">
                {`${Math.ceil(content.length / 100)} min(s) Read`}
            </div>
        </div>
    );
}

export function Avatar({ name, size }: { name: string; size: number }) {
    return (
        <div
            className="relative inline-flex items-center justify-center rounded-full bg-gray-500 text-gray-100"
            style={{ width: `${size}px`, height: `${size}px`, fontSize: `${size / 2}px` }}
        >
            <span>{name[0]}</span>
        </div>
    );
}

const Circle = () => {
    return (
        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
    );
};