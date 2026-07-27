export interface RawMatsData {
    Materials: { Item: string; Total: number }[];
}

export function getMatsMap(data: RawMatsData): Map<string, number> {
    return new Map(Array.from(data.Materials.map(x => [x.Item, x.Total])));
}