import CustomButton from './CustomButton.tsx';

interface ActionButtonProps {
    icon?: string;
    alt?: string;
    label?: string;
    font?: string;
    disabled?: boolean;
    className?: string;
    classAdd?: string;
    disabledClassName?: string;
    dimClassName?: string;
    labelClassAdd?: string;
    onAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ActionButton({ onAction, ...rest }: ActionButtonProps) {
    return <CustomButton {...rest} onClick={onAction} />;
}