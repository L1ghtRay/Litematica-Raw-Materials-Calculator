interface ItemDisplayProps {
    text?: string;
    img?: string;
    className?: string;
    textClassName?: string;
    imgClassName?: string;
}

export default function BoxDisplay({ text, img, className = '', textClassName = '', imgClassName = '' }: ItemDisplayProps ) {
    return (
        <div className={className}>
            {img && <img src={img} className={imgClassName} />}
            {text && <span className={textClassName}>{text}</span>}
        </div>
    );
}