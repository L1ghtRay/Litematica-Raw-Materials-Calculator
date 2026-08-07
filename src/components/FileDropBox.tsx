import { useState, useRef } from 'react';
import { type RawMatsData } from '../scripts/materialListGenerator.ts';

interface FileDropBoxProps {
    onLoad: (data: RawMatsData) => void;
}

export default function FileDropBox({ onLoad }: FileDropBoxProps) {
    const [error, setError] = useState<string | null>(null);
    const [is_dragging, setIsDragging] = useState(false);
    const [file_name, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function readFile(file: File | undefined) {
        if (!file) return;
        
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result;
            if (typeof result !== "string") return
            try {
                onLoad(JSON.parse(result));
            } catch {
                setError("That file isn't a valid JSON");
            }
        };
        reader.onerror = () => setError("Couldn't read that file");
        reader.readAsText(file);
        console.log(file);
    }

    return (
        <div className="flex flex-col justify-start items-center gap-4 transition-all duration-200 ease-out hover:scale-110">
            <div 
                onClick={() => inputRef.current?.click()} 
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    readFile(e.dataTransfer.files[0]);
                }}
                className={`${file_name ? 'px-4 py-2': 'px-24 py-12 border-dashed'} w-fit h-fit border-2 rounded-lg flex items-center justify-center cursor-pointer ${is_dragging ? 'border-blue-500 hover:border-blue-50 bg-blue-950': ' border-slate-400'}`}
            >
                <input ref={inputRef} type="file" className="hidden" onChange={(e) => readFile(e.target.files?.[0])} />
                <p className="text-slate-50">{file_name ? file_name : 'Click to upload a Litematica block-list JSON file'}</p>
            </div>
            {error && <p className="text-red-600 border-2 border-red-800 rounded-lg p-4">{error}</p>}
        </div>
    );
}