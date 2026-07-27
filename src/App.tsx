import './App.css';
import HeaderBar from './components/common/HeaderBar.tsx';
import MainBody from './components/common/MainBody.tsx';
import FileDropBox from './components/FileDropBox.tsx';
import { useState } from 'react';
import InputMaterialsDisplay from './components/InputMaterialsDisplay.tsx';
import { type RawMatsData } from './scripts/materialListGenerator.ts';
import OutputOptionsBar from './components/OutputOptionsBar.tsx';
import { calculateIngredients, type StackBreakdown } from './scripts/ingredientListGenerator.ts';
import OutputIngredientsDisplay from './components/OutputIngredientsDisplay.tsx';

export default function App() {
	const [mats_data, setMatsData] = useState<RawMatsData | null>(null);
	const [ing_output, setIngOutput] = useState<Map<string, StackBreakdown> | null>(null);

	const handleCalculate = (stonecutter_crafting: boolean, compress_items: boolean, default_substitutions: Map<string, string>,  logs_to_log: boolean) => {
		if (!mats_data) return;
		setIngOutput(calculateIngredients(mats_data, stonecutter_crafting, compress_items, default_substitutions, logs_to_log));
	};

	return (
		<>
			<HeaderBar />
			<MainBody title={'Building Materials Calculator'} titleFont={'Minecraft'} className="gap-4">
				<FileDropBox onLoad={setMatsData} />
				{mats_data !== null && <InputMaterialsDisplay data={mats_data} />}

				{mats_data !== null && <OutputOptionsBar onCalculate={handleCalculate} />}
				{ing_output !== null && <OutputIngredientsDisplay data={ing_output} />}
			</MainBody>
		</>
	)
}
