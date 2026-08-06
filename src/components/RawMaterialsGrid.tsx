import { useEffect, useRef, useState } from 'react';
import ItemDisplay from './ItemDisplay.tsx'

export default function RawMaterialsGrid({ data }: { data: Map<string, number> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [maxWidth, setMaxWidth] = useState<number | null>(null);

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const widths = Array.from(container.children).map(
            (el) => el.getBoundingClientRect().width
        )
        if (widths.length) setMaxWidth(Math.max(...widths))
    }, [data])

    return (
        <div className="grid w-full h-fit border border-slate-50 bg-[#162030] gap-y-2 p-4 rounded-lg place-items-center" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(4rem, 1fr))' }}>
            {Array.from(data).map(([item, count]) => {
                const text = item.replace(/^minecraft:/, "");
                return (
                    <ItemDisplay
                        key={item}
                        item={item}
                        text={count.toString()}
                        img={`/item/${text}.png`}
                    />
                );
            })}
        </div>
    );
}