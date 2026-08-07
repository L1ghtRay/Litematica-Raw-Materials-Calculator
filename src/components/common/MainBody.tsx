export default function MainBody({ classAdd = '', children }: { classAdd?: string; children: any }) {
    return (
        <div className={`${classAdd} flex flex-col justify-start items-center w-full min-h-screen h-fit bg-gray-950 pt-(--header-height) pb-(--header-height)`}>
            {children}
        </div>
    );
}