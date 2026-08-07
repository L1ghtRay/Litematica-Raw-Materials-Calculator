import Logo from '../../assets/common/Logo.svg?react';
import { useRef, useEffect } from 'react';
import { Menu, X } from "lucide-react";

interface NavLinks {
    text: string;
    link: string;
}

interface TopBarProps {
    links?: NavLinks[];
}

export default function HeaderBar({}: TopBarProps) {
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        const setHeaderHeight = () => {
            document.documentElement.style.setProperty(
                "--header-height",
                `${el.offsetHeight}px`
            );
        };
        setHeaderHeight();

        const observer = new ResizeObserver(setHeaderHeight);
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <header ref={headerRef} className="w-full fixed right-0 left-0 top-0 z-50 border-b border-gray-800 bg-[#030721]/70 backdrop-blur-md text-slate-50">
            <div className="flex items-center justify-between p-4">
                <div className="flex gap-6 items-center">
                    <Menu size={22} />
                    <Logo className="w-7 h-7 text-slate-50" />
                </div>
                
            </div>
        </header>
    );
}