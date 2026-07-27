import { useState } from 'react';

interface CustomButtonProps {
    icon?: string;
    alt?: string;
    label?: string;
    font?: string;
    lit?: boolean;
    disabled?: boolean;
    className?: string;
    disabledClassName?: string;
    litClassName?: string;
    dimClassName?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export default function CustomButton({
    icon,
    label,
    alt = label,
    lit = false,
    disabled = false,
    className = '',
    disabledClassName = 'opacity-40 grayscale cursor-not-allowed border-slate-700 bg-slate-900',
    litClassName = 'border-blue-400 bg-blue-950 shadow-[0_0_12px_rgba(96,165,250,0.6)] hover:scale-110',
    dimClassName = 'border-slate-500 bg-slate-800 hover:scale-110 hover:border-slate-300',
    font = 'semibold',
    onClick
}: CustomButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick || loading) return;
        try {
            setLoading(true);
            await onClick(e);
        } catch (err) {
            console.error('Button action failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={disabled || loading ? undefined : handleClick}
            disabled={disabled || loading}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 transition-all duration-200 ease-out ${disabled ? disabledClassName : lit ? litClassName : dimClassName} ${className}`}
        >
            {icon && (
                <img src={icon} alt={alt ?? ''} className="w-full h-full object-contain pointer-events-none transition-all duration-200 ease-out" style={{filter: lit ? 'brightness(1) saturate(1)' : 'brightness(0.45) saturate(0.6)'}} />
            )}
            {label && <span className={`text-[1cqw] text-slate-50 leading-none pointer-events-none`} style={{ fontFamily: font}}>{label}</span>}
        </button>
    );
}