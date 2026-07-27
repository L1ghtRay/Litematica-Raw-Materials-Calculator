import ActionButton from './common/ActionButton.tsx';
import ToggleButton from './common/ToggleButton.tsx';
import { useState } from 'react';
import Tooltip from './common/Tooltip.tsx';

interface OutputOptionsBarProps {
    onCalculate: (stonecutter_crafting: boolean, compress_items: boolean, default_substitutions: Map<string, string>, logs_to_log: boolean) => void;
}

export default function OutputOptionsBar({ onCalculate }: OutputOptionsBarProps) {
    const [stonecutter_crafting, setStonecutterCrafting] = useState(true);
    const [compress_items, setCompressItems] = useState(false);
    // const [logs_to_log, setLogsToLog] = useState(false);

    const default_substitutions: Map<string, string> = new Map(Object.entries({
        '#minecraft:planks': 'minecraft:oak_planks',
        '#minecraft:wool': 'minecraft:white_wool'
    }));

    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Tooltip tooltip="Prioritize Stonecutter Recipes">
                <ToggleButton active={stonecutter_crafting} onToggle={setStonecutterCrafting} className="w-32 h-32" alt="stonecutter_crafting" />
            </Tooltip>
            <Tooltip tooltip="Compress Reversible Base Ingredients">
                <ToggleButton active={compress_items} onToggle={setCompressItems} className="w-32 h-32" alt="compress_items" />
            </Tooltip>
            
            {/* <ToggleButton active={logs_to_log} onToggle={setLogsToLog} className="w-32 h-32" alt="logs_to_log" /> */}

            <ActionButton onAction={() => onCalculate(stonecutter_crafting, compress_items, default_substitutions, true)} className="w-64 h-32" label="Calculate" font="Minecraft" />
        </div>
    );
}