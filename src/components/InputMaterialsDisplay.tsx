import { getMatsMap } from '../scripts/materialListGenerator.ts';
import { type RawMatsData } from '../scripts/materialListGenerator.ts';

export default function InputMaterialsDisplay({ data } : { data: RawMatsData }) {
    return (
        <div>
            {data !== null && <pre className="text-slate-50">{JSON.stringify(Object.fromEntries(getMatsMap(data)), null, 2)}</pre>}
        </div>
    );
}