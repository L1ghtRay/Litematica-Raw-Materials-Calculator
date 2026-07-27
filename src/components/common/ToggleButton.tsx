import CustomButton from './CustomButton.tsx';

interface ToggleButtonProps {
    icon?: string;
    alt?: string;
    label?: string;
    font?: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    disabledClassName?: string;
    litClassName?: string;
    dimClassName?: string;
    onToggle: (next: boolean) => void;
}

export default function ToggleButton({ active, onToggle, ...rest }: ToggleButtonProps) {
    return <CustomButton {...rest} lit={active} onClick={() => onToggle(!active)}/>;
}