
const titleCase = (str: string) =>  str.replace(/(^|[\s_])([a-z])/gi, (_, sep, letter) => sep + letter.toUpperCase()).replace('Of', 'of').replace('The', 'the');

const block_of_items = ['amethyst', 'bamboo', 'coal', 'copper', 'diamond', 'emerald', 'gold', 'iron', 'lapis', 'netherite', 'quartz', 'raw_copper', 'raw_gold', 'raw_iron', 'redstone', 'resin', 'stripped_bamboo', 'waxed_copper'];

export default function MCTooltipBox({ item_id, scale = '' }: { item_id: string, scale?: string }) {
    let item = titleCase(item_id.replace('minecraft:' ,'').replaceAll('_', ' '));

    if (block_of_items.includes(item) && item.includes('Block')) item = `Block of ${item.replace(' Block', '')}`

    return (
        <div className={`rounded-sm bg-linear-180 from-[#06004b] to-[#040025] p-0.5 border-2 border-black ${scale}`}>
            <div className="flex flex-col gap-1 bg-black font-minecraft p-1 leading-none [text-box-trim:start] [text-box-edge:cap]">
                <div className="text-slate-50 text-shadow-gray-600 text-shadow-[1px_1px_0px_#133f3f]">{item}</div>
                <div className="text-gray-500 text-shadow-gray-900 text-shadow-[1px_1px_0px_#133f3f]">{item_id}</div>
            </div>
        </div>
    );
}