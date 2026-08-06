import React, { useState, useRef, type ReactNode } from "react";


interface TooltipProps {
    children: ReactNode;
    tooltip: ReactNode;
    wrapperClassName?: string;
    className?: string;
    classAdd?: string;
    delay?: number;
}

export default function Tooltip({ children, tooltip, wrapperClassName = '', className = 'px-3 py-2 rounded-lg bg-slate-900 border-slate-600 text-slate-50 text-sm shadow-lg', classAdd = '', delay = 0 }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => setVisible(true), delay);
    }

    const handleMouseLeave = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className={`inline-block ${wrapperClassName}`}>
            {children}
            {visible && (
                <div
                    style={{
                        position: 'fixed',
                        top: pos.y + 16,
                        left: pos.x + 16,
                        pointerEvents: 'none',
                        zIndex: 50
                    }}
                    className={`${className} ${classAdd} transition-opacity duration-150`} 
                >
                    {tooltip}
                </div>
            )}
        </div>
    );
}