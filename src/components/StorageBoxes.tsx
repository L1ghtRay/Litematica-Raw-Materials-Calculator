import type { StackBreakdown } from "../scripts/ingredientListGenerator";
import Tooltip from "./common/Tooltip";
import MCTooltipBox from "./MCTooltipBox";

interface StorageBoxesProps {
    data?: Map<string, StackBreakdown>;
}

interface SlotData {
    item: string;
    count: number;
}

export default function StorageBoxes({ data = new Map([["minecraft:dirt", { sb_count: 0, stx_count: 0, rem_count: 45 }]]) }: StorageBoxesProps) {
    const boxes_data: Array<Record<number, SlotData>> = [];

    let stack_num = 1;
    let sb_data: Record<number, SlotData> = {}

    const pushSlot = (item: string, count: number) => {
        sb_data[stack_num++] = { item, count };
        if (stack_num > 27) {
            stack_num = 1;
            boxes_data.push(sb_data);
            sb_data = {};
        }
    };

    for (const [item, count] of data) {
        const total_stacks = count.sb_count * 27 + count.stx_count;

        for (let stx = 0; stx < total_stacks; stx++) {
            pushSlot(item, 64);
        }

        if (count.rem_count > 0) {
            pushSlot(item, count.rem_count);
        }
    }

    if (Object.keys(sb_data).length > 0) {
        boxes_data.push(sb_data);
    }

    return (
        <div className="relative w-125 flex flex-col justify-center gap-2 p-4 border border-white rounded-lg">
            {boxes_data.map((box, boxIndex) => (
                <div key={boxIndex} className="relative">
                    <img src="inv.png" className="[image-rendering:pixelated] w-full h-auto block" />
                    <div 
                        className="grid absolute grid-cols-9 grid-rows-3 @container"
                        style={{
                            top: '10.5%',
                            left: '4.05%',
                            width: '91.75%',
                            height: '78.5%',
                            columnGap: '1.1575%',
                            rowGap: '4%'
                        }}
                    >
                        {Object.entries(box).map(([slotNum, slot]) => (
                            <Tooltip 
                                key={slotNum}
                                tooltip={<MCTooltipBox item_id={slot.item} scale="text-[4cqw]"/>} 
                                wrapperClassName="h-full" 
                                className="h-100"
                            >
                                <div className="w-full h-full @container relative group">
                                    <img src={`/item/${slot.item.replace('minecraft:', '')}.png`} className="[image-rendering:pixelated] w-full h-full p-px" />
                                    <div className="w-full h-full absolute inset-0 bg-gray-50/0 group-hover:bg-gray-50/50 pointer-events-none" />
                                    <span className="text-slate-50 text-shadow-gray-550 text-shadow-[0.1em_0.1em_0px_#133f3f] font-[Minecraft] text-[50cqw] absolute top-1/2 -right-1/32">{slot.count}</span>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}