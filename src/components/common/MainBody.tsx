export default function MainBody({ title, titleFont, className, children }: { title: string; titleFont: string; className?: string; children: any }) {
    return (
        <div className={`${className} flex flex-col justify-start items-center w-full min-h-screen h-fit bg-gray-950 pt-(--header-height)`}>
            <h1 style={{ fontFamily: titleFont }} className={`text-slate-100 m-4 mb-6 uppercase text-[28px]`}>{title}</h1>
            {children}
        </div>
    );
}