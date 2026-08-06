import BoxDisplay from './common/BoxDisplay.tsx';
import Tooltip from './common/Tooltip.tsx';
import MCTooltipBox from './MCTooltipBox.tsx';

export default function ItemDisplay({ item, text, img }: { item: string, text?: string, img: string }) {
    
    const formatNumber = (n: string) => {
        const num = typeof n === 'string' ? parseFloat(n) : n

        if (isNaN(num)) return '0'

        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString()
    } 

    return (
        <Tooltip tooltip={<MCTooltipBox item_id={item} scale="text-[1cqw]" />} className="">
            <BoxDisplay 
                text={formatNumber(text ?? '0')} 
                img={img} 
                className={`flex flex-col border border-slate-300 bg-[#162030] w-fit h-fit rounded-sm p-2 ${text && parseFloat(text) >= 100 ? 'pr-4' : 'px-3' } gap-2 justify-center items-center relative`}
                imgClassName="w-8 h-8 object-contain [image-rendering:pixelated]" 
                textClassName={`text-slate-50 text-shadow-gray-600 text-shadow-[1px_1px_0px_#133f3f] font-[Minecraft] absolute top-1/2 ${text && parseFloat(text) >= 100 ? 'left-3/5' : 'left-3/4'} -translate-x-1/2`}
            />
        </Tooltip>
    );
}