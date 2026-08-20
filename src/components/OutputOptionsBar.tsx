import ActionButton from './common/ActionButton.tsx';
import ToggleButton from './common/ToggleButton.tsx';
import { useState } from 'react';
import Tooltip from './common/Tooltip.tsx';
import CompressIngsIcon from '../assets/compressIngsIcon.svg?react';
import StonecutterIcon from '../assets/stonecutterIcon.svg?react';

interface OutputOptionsBarProps {
    onCalculate: (stonecutter_crafting: boolean, compress_items: boolean, default_substitutions: Map<string, string>, logs_to_log: boolean) => void;
}

export default function OutputOptionsBar({ onCalculate }: OutputOptionsBarProps) {
    const [stonecutter_crafting, setStonecutterCrafting] = useState(true);
    const [compress_items, setCompressItems] = useState(false);
    // const [logs_to_log, setLogsToLog] = useState(false);

    const default_substitutions: Map<string, string> = new Map(Object.entries({
        '#minecraft:planks': 'minecraft:oak_planks',
        '#minecraft:wool': 'minecraft:white_wool',
        '#minecraft:eggs': 'minecraft:egg',
        '#minecraft:coals': 'minecraft:coal',
        '#minecraft:sands': 'minecraft:sand',
        '#minecraft:smelts_to_glass': 'minecraft:sand',
        '#minecraft:wooden_slabs': 'minecraft:oak_slab',
        '#minecraft:soul_fire_base_blocks': 'minecraft:soul_sand'
    }));

    return (
        <div className="flex flex-row gap-4 items-center justify-center border border-slate-500 p-4 rounded-lg">
            <Tooltip tooltip="Prioritize Stonecutter Recipes"  classAdd="font-minecraft text-[1em]">
                <ToggleButton active={stonecutter_crafting} onToggle={setStonecutterCrafting} classAdd="w-24 h-24 p-3" alt="stonecutter_crafting" icon={StonecutterIcon} />
            </Tooltip>
            <Tooltip tooltip="Compress Reversible Base Ingredients" classAdd="font-minecraft text-[1em]">
                <ToggleButton active={compress_items} onToggle={setCompressItems} classAdd="w-24 h-24 p-3" alt="compress_items" icon={CompressIngsIcon} />
            </Tooltip>
            
            {/* <ToggleButton active={logs_to_log} onToggle={setLogsToLog} className="w-32 h-32" alt="logs_to_log" /> */}

            <ActionButton onAction={() => onCalculate(stonecutter_crafting, compress_items, default_substitutions, true)} classAdd="w-48 h-24" label="Calculate" font="Minecraft-Title" labelClassAdd="text-[15cqw]" />
        </div>
    );
}