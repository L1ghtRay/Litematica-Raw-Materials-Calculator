import type React from 'react';
import CustomButton from './CustomButton.tsx';

interface ToggleButtonProps {
    icon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    alt?: string;
    label?: string;
    font?: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    classAdd?: string;
    disabledClassName?: string;
    litClassName?: string;
    dimClassName?: string;
    labelClassAdd?: string;
    onToggle: (next: boolean) => void;
}

export default function ToggleButton({ active, onToggle, ...rest }: ToggleButtonProps) {
    return <CustomButton {...rest} lit={active} onClick={() => onToggle(!active)}/>;
}