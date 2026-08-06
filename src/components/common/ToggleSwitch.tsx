import { type ReactNode } from 'react';

interface ToggleSwitchProps {
    state: boolean;
    switchMode: (state: boolean) => void;
    className?: string;
    buttonClassName?: string;
    activeBgClassName?: string;
    child1?: (active: boolean) => ReactNode;
    child2?: (active: boolean) => ReactNode;
}

export default function ToggleSwitch({ state, switchMode, className, buttonClassName = '', activeBgClassName = '', child1, child2 }: ToggleSwitchProps) {
    return (
        <div>
            <div className={`flex flex-row w-fit h-fit ${className}`}>
                <button className={`${buttonClassName} flex items-center justify-center ${state ? 'bg-transparent' : activeBgClassName}`} onClick={() => switchMode(false)}>
                    {child1?.(!state)}
                </button>
                <button className={`${buttonClassName} flex items-center justify-center ${!state ? 'bg-transparent' : activeBgClassName}`} onClick={() => switchMode(true)}>
                    {child2?.(state)}
                </button>
            </div>
        </div>
    );
}