import recipe_data from '../assets/recipes.json' with { type: 'json' };
import { type RawMatsData } from './materialListGenerator.ts';


const base_items = ['bone_meal', 'coal', 'cobbled_deepslate', 'cobblestone', 'copper_ingot', 'diamond', 'emerald', 'gold_ingot', 'honey_bottle', 'iron_ingot', 'lapis_lazuli', 'netherite_ingot', 'quartz', 'redstone', 'resin_clump', 'slime_ball', 'wheat'];
const compressed_items: Map<string, string> = new Map(Object.entries({
    'minecraft:bone_meal': 'minecraft:bone_block',
    'minecraft:coal': 'minecraft:coal_block',
    'minecraft:copper_ingot': 'minecraft:copper_block',
    'minecraft:diamond': 'minecraft:diamond_block',
    'minecraft:emerald': 'minecraft:emerald_block',
    'minecraft:gold_ingot': 'minecraft:gold_block',
    'minecraft:honey_bottle': 'minecraft:honey_block',
    'minecraft:iron_ingot': 'minecraft:iron_block',
    'minecraft:lapis_lazuli': 'minecraft:lapis_block',
    'minecraft:netherite_ingot': 'minecraft:netherite_block',
    'minecraft:redstone': 'minecraft:redstone_block',
    'minecraft:resin_clump': 'minecraft:resin_block',
    'minecraft:slime_ball': 'minecraft:slime_block',
    'minecraft:wheat': 'minecraft:hay_block'
}));
const invalid_recepies = ['dried_kelp.json'];
const recipe_stick = 'stick.json';
const all_recipes = new Map(Object.entries(recipe_data));


function getStackSize(item: string): number {
    const items_16 = new Set([
        "minecraft:ender_pearl", 
        "minecraft:egg", 
        "minecraft:snowball",
        "minecraft:blue_egg",
        "minecraft:brown_egg"
    ]);
    
    const unstackable_keywords = new Set([
        "bed", 
        "milk_bucket",
        "snow_bucket",
        "lava_bucket"
    ])
    
    const sixteen_keywords = new Set([
        "sign", 
        "banner"
    ])

    if (items_16.has(item)) return 16;
    if (Array.from(unstackable_keywords).some(i => item.includes(i))) return 1
    if (Array.from(sixteen_keywords).some(i => item.includes(i))) return 16

    return 64;
}


function toStackBreakdown(count: number, stack_size: number): StackBreakdown {
    const sb_count: number = Math.floor(count / (27 * stack_size));
    const stx_count: number = Math.floor((count - (27 * stack_size * sb_count)) / stack_size)
    const rem_count: number = count % stack_size;
    return { sb_count, stx_count, rem_count };
}



export interface StackBreakdown {
    sb_count: number;
    stx_count: number;
    rem_count: number;
}


export function calculateIngredients(raw_mats_data: RawMatsData, prioritize_stonecutter: boolean, compress_items: boolean, default_substitutions: Map<string, string>, logs_to_log: boolean): Map<string, StackBreakdown> {
    const mats = new Map(raw_mats_data.Materials.map(mat => [mat.Item, mat.Total]));
    
    interface NodeData {
        order: number,
        count: number,
        edges: Set<string>,
        recipe?: any
    }

    class DAG {
        graph: Map<string, NodeData>;

        constructor() { 
            this.graph = new Map();
        }

        addNode(node: string) {
            if (!this.graph.has(node)) {
                const count = mats.get(node);
                this.graph.set(node, {
                    order: Number.MAX_VALUE,
                    count: count ?? 0,
                    edges: new Set()
                });
            }
        }

        addEdge(from_node: string, to_node: string) {
            this.addNode(from_node);
            this.addNode(to_node);
            this.graph.get(from_node)?.edges.add(to_node);
        }

        addRecipe(node: string, recipe: any) {
            this.addNode(node);
            const item = this.graph.get(node);
            if (item) item.recipe = recipe;
        }

        getNeighbours(node: string) { return Array.from(this.graph.get(node)?.edges || []); }

        debugPrint() {
            for (const [node, data] of this.graph.entries()) {
                console.log(`${data.order} | ${data.count}x ${node}${(data.recipe) ? ` -> ${Array.from(data.edges).join(', ')} | ${JSON.stringify(data.recipe)}` : ''}`);
            }
        }

        debug() { return this.graph; }

        topologicalSort() {
            const visited = new Map<string, 'visiting' | 'done'>();
            let count = 1;

            const dfs = (node: string) => {
                const state = visited.get(node);

                if (state === 'visiting') {
                    console.warn(`Cycle detected at node: ${node}`);
                    return;
                }

                if (state === 'done') return;

                visited.set(node, 'visiting');

                for (const neighbour of this.getNeighbours(node)) { dfs(neighbour); }

                const node_data = this.graph.get(node);
                if (node_data) node_data.order = count++;

                visited.set(node, 'done');
            }

            for (const item of this.graph.keys()) {
                if (!visited.has(item)) dfs(item);
            }
        }

        sortByOrder() { this.graph = new Map(Array.from(this.graph.entries()).sort((a, b) => b[1].order - a[1].order)); }

        calcIngredientsCount() {
            this.sortByOrder();

            for (const data of this.graph.values()) {
                if (data.recipe) {
                    const min_craft_count = Math.ceil(data.count / data.recipe.yield);
                    
                    for (const ingredient of data.edges) {
                        this.graph.get(ingredient)!.count += min_craft_count * data.recipe.components[ingredient];
                    }
                } else {
                    continue;
                }
            }
        }
    }


    const active_recipes = new DAG()
    const processed_items = new Set<string>();


    function getRecipe(item: string, main_ingredient: any = null): any {
        const item_recipes = all_recipes.get(item);
        if (!item_recipes || item_recipes.length === 0)  return null;

        let recipe: any = null;

        if (main_ingredient) {
            recipe = item_recipes.find(r => main_ingredient in r.components) ?? null;
        } else {
            for (const r of item_recipes) {
                if (invalid_recepies.includes(r.origin)) continue;
                if (item == 'minecraft:stick' && r.origin != recipe_stick) continue;
                if (prioritize_stonecutter && item_recipes?.some(rec => rec.method == 'minecraft:stonecutting') && r.method !== 'minecraft:stonecutting') continue;
                if (!recipe) recipe = r;
            }
        }

        recipe.components = Object.fromEntries(Object.entries(recipe.components).map(([k, v]) => [getItemSub(k) ?? k, v]));
        
        return recipe;
    }

    function getItemSub(item: string): any {
        let i: string = default_substitutions.get(item) ?? item;

        if (i.includes('_logs') && logs_to_log) i = i.replace(/^#(.+)_logs$/, '$1_log');

        return i
    }

    function discoverIngredients(i: string): void {
        const item: string = getItemSub(i);

        if (processed_items.has(item)) return;
        processed_items.add(item);

        if (base_items.some(x => item == 'minecraft:' + x)) return;

        const recipe = getRecipe(item);
        if (!recipe) return;
        
        active_recipes.addRecipe(item, recipe);

        for (const component in recipe.components) {
            const comp = getItemSub(component);
            active_recipes.addEdge(item, comp);
            discoverIngredients(comp);
        }
    }

    
    for (const item of mats.keys()) {
        discoverIngredients(item);
    }

    active_recipes.topologicalSort();
    active_recipes.calcIngredientsCount();

    if (compress_items) {
        for (const item of active_recipes.graph.keys()) {
            if (compressed_items.has(item)) {
                if (active_recipes.graph.get(item)!.count > getStackSize(item)) {
                    const comp_item = compressed_items.get(item);
                    if (comp_item) {
                        active_recipes.addEdge(item, comp_item);

                        const recipe = getRecipe(item, comp_item);

                        active_recipes.graph.get(item)!.recipe = null;
                        active_recipes.graph.get(comp_item)!.recipe = null;
                        active_recipes.graph.get(comp_item)?.edges.clear();
                        active_recipes.graph.get(comp_item)!.order = 0;

                        const item_count = active_recipes.graph.get(item)?.count;
                        if (item_count) {
                            active_recipes.graph.get(item)!.count = item_count % recipe.yield;
                            active_recipes.graph.get(comp_item)!.count = Math.floor(item_count / recipe.yield); 
                        }
                    }
                }
            }
        }
    }

    active_recipes.sortByOrder();

    const result: Map<string, StackBreakdown> = new Map<string, StackBreakdown>();
    for (const [item, data] of active_recipes.debug().entries()) {
        if (!data.recipe) {
            result.set(item, toStackBreakdown(data.count, getStackSize(item)));
        }
    }

    return new Map(Array.from(result.entries()).sort(([itemA, dataA], [itemB, dataB]) => (((((dataB.sb_count * 27) + dataB.stx_count) * getStackSize(itemB)) + dataB.rem_count) - ((((dataA.sb_count * 27) + dataA.stx_count) * getStackSize(itemA)) + dataA.rem_count))));
}
