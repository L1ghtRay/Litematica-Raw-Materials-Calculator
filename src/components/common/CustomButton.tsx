import React, { useState } from 'react';

interface CustomButtonProps {
    icon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    alt?: string;
    label?: string;
    font?: string;
    lit?: boolean;
    disabled?: boolean;
    className?: string;
    classAdd?: string;
    disabledClassName?: string;
    litClassName?: string;
    dimClassName?: string;
    labelClassAdd?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export default function CustomButton({
    icon,
    label,
    alt = label,
    lit = false,
    disabled = false,
    className = 'gap-1 rounded-lg border-2',
    classAdd = '',
    disabledClassName = 'opacity-40 grayscale cursor-not-allowed border-slate-700 bg-slate-900',
    litClassName = 'border-blue-400 bg-blue-950 shadow-[0_0_12px_rgba(96,165,250,0.6)] hover:scale-110',
    dimClassName = 'border-slate-500 bg-slate-800 hover:scale-110 hover:border-slate-300',
    font = 'semibold',
    labelClassAdd = '',
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

    const iconClasses = 'w-full h-full object-contain pointer-events-none transition-all duration-200 ease-out text-blue-200';
    const iconStyle: React.CSSProperties = {
        filter: lit ? 'brightness(1) saturate(1)' : 'brightness(0.45) saturate(0.6)'
    };

    const renderIcon = () => {
        if (!icon) return null;

        if (typeof icon === 'string') {
            return (
                <img
                    src={icon}
                    alt={alt ?? ''}
                    className={iconClasses}
                    style={iconStyle}
                />
            );
        }

        const Icon = icon; // capitalize so JSX renders it as a component, not <icon>
        return (
            <Icon
                className={iconClasses}
                style={iconStyle}
                aria-hidden={!alt}
                role={alt ? 'img' : undefined}
            />
        );
    };

    return (
        <button
            onClick={disabled || loading ? undefined : handleClick}
            disabled={disabled || loading}
            className={`flex flex-col items-center justify-center transition-all duration-200 ease-out @container ${className} ${classAdd} ${disabled ? disabledClassName : lit ? litClassName : dimClassName}`}
        >
            {renderIcon()}
            {label && <span className={`text-slate-50 leading-none pointer-events-none ${labelClassAdd}`} style={{ fontFamily: font}}>{label}</span>}
        </button>
    );
}