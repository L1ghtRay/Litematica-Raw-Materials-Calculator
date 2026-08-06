import './App.css';
import HeaderBar from './components/common/HeaderBar.tsx';
import MainBody from './components/common/MainBody.tsx';
import FileDropBox from './components/FileDropBox.tsx';
import { useState } from 'react';
import DataDisplay from './components/DataDisplay.tsx';
import { getMatsMap, type RawMatsData } from './scripts/materialListGenerator.ts';
import OutputOptionsBar from './components/OutputOptionsBar.tsx';
import { calculateIngredients, type StackBreakdown } from './scripts/ingredientListGenerator.ts';
import DisplaySwitcher from './components/DisplaySwitcher.tsx';
import { Box, CodeXml, Package2 } from 'lucide-react';
import RawMaterialsGrid from './components/RawMaterialsGrid.tsx';
import StorageBoxes from './components/StorageBoxes.tsx';
import MCTooltipBox from './components/MCTooltipBox.tsx';

export default function App() {
	const [mats_data, setMatsData] = useState<RawMatsData | null>(null);
	const [ing_output, setIngOutput] = useState<Map<string, StackBreakdown> | null>(null);

	const handleCalculate = (stonecutter_crafting: boolean, compress_items: boolean, default_substitutions: Map<string, string>,  logs_to_log: boolean) => {
		if (!mats_data) return;
		setIngOutput(calculateIngredients(mats_data, stonecutter_crafting, compress_items, default_substitutions, logs_to_log));
	};

	const handleMatsLoad = (data: RawMatsData) => {
		setMatsData(data);
		setIngOutput(null);
	}

	return (
		<>
			<HeaderBar />
			<MainBody title={'Building Materials Calculator'} titleFont={'Minecraft-Title'} className="gap-6">
				<FileDropBox onLoad={handleMatsLoad} />
				<DisplaySwitcher 
					className="p-4 min-h-[20vh] min-w-1/2 max-w-2/3 bg-slate-800 border border-blue-950 rounded-lg"
					toggelSwitchProps={{
						className: 'rounded-lg bg-slate-900',
						buttonClassName: 'w-7 h-7 rounded-lg',
						activeBgClassName: 'bg-slate-300',
						child1: (active) => <Box size={20} color={active ? 'black' : 'white'} />,
						child2: (active) => <CodeXml size={20} color={active ? 'black' : 'white'} />
					}}
					element1={mats_data != null && <RawMaterialsGrid data={getMatsMap(mats_data)} />}
					element2={mats_data !== null && <DataDisplay data={mats_data} func={getMatsMap} className="bg-[#162030] border p-2 border-slate-400 rounded-lg max-h-[calc(100vh*1/2)] overflow-y-auto" />}
				/>

				{mats_data !== null && <OutputOptionsBar onCalculate={handleCalculate} />}

				{ing_output !== null && <DisplaySwitcher 
					className="p-4 min-h-[25vh] min-w-1/4 w-fit bg-slate-800 border border-blue-950 rounded-lg"
					toggelSwitchProps={{
						className: 'rounded-lg bg-slate-900',
						buttonClassName: 'w-7 h-7 rounded-lg',
						activeBgClassName: 'bg-slate-300',
						child1: (active) => <Package2 size={20} color={active ? 'black' : 'white'} />,
						child2: (active) => <CodeXml size={20} color={active ? 'black' : 'white'} />
					}}
					element1={mats_data !== null && <StorageBoxes data={ing_output}/>}
					element2={mats_data !== null && <DataDisplay data={ing_output} className="border p-2 border-slate-400 rounded-lg bg-[#162030] max-h-dvh overflow-y-auto" />}
				/>}
			</MainBody>
		</>
	)
}
