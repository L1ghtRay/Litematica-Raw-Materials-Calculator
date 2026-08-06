interface DataDisplayProps<T> {
    data: T | null;
    func?: (data: T) => Map<string, unknown> | Record<string, unknown>;
    className?: string;
}

export default function DataDisplay<T>({ data, func, className } : DataDisplayProps<T>) {
    if (data === null) return null;

    const transformed_data = func ? func(data) : (data as unknown);
    const plain_data = transformed_data instanceof Map ? Object.fromEntries(transformed_data) : transformed_data;

    return (
        <div className={className}>
            {data !== null && <pre className={"text-slate-50"}>{JSON.stringify(plain_data, null, 4)}</pre>}
        </div>
    );
}