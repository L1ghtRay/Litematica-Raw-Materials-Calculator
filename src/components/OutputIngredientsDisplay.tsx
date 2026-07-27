import { type StackBreakdown } from '../scripts/ingredientListGenerator.ts';

export default function OutputIngredientsDisplay({ data }: { data: Map<string, StackBreakdown> }) {
    return (
        <div>
            {data !== null && <pre className="text-slate-50">{JSON.stringify(Object.fromEntries(data), null, 2)}</pre>}
        </div>
    );
}