# Litematica Raw Materials Calculator

A web app that turns a Litematica material list into a shopping list of raw, base level Minecraft resources. Instead of stopping at "you need 40 oak stairs and 12 pistons," it walks every crafting recipe backward until it reaches ingots, cobblestone, wood, and other genuinely raw materials, then tells you how many stacks and shulker boxes of each you need to gather.

## What it does

Litematica's built in material list tells you the finished items a schematic needs, but those items still have to be crafted from something. This tool takes that material list and recursively resolves each item through Minecraft's crafting recipes until only base resources remain, so you know what to actually go mine, farm, or trade for.

Given a material list, the calculator:

1. Parses the item names and totals from the uploaded file.
2. Builds a dependency graph of every item and the recipe needed to craft it, expanding sub ingredients recursively.
3. Topologically sorts that graph so ingredient totals are calculated in the correct order.
4. Sums how many of each base ingredient are required across every recipe that uses it.
5. Converts the final totals into shulker boxes, stacks, and leftover items so the output matches how you would actually carry the materials in game.

## Features

- Recursive recipe resolution using real Minecraft recipe data, including recipes with multiple valid crafting methods.
- Stonecutter priority toggle, so recipes that can be cut with a stonecutter are preferred over crafting table recipes when both exist.
- Reversible base ingredient compression, which converts loose ingots, gems, and similar items into their block form once you have enough to make a block, and back again for any remainder.
- Tag substitution for ambiguous ingredients such as planks, wool, coal, sand, and eggs, so a generic tag like "any planks" resolves to a concrete item like oak planks. (To-be-added)
- Two output views for both the calculated results and the parsed material list: a Minecraft style inventory and shulker box grid, and a raw JSON style data view.
- Minecraft styled UI, including item icons, tooltips, and inventory slot rendering, built to feel like part of the game.

## How to use it

1. In Minecraft, open Litematica's material list for the schematic you want to build.
2. Export or save that material list as a JSON file.
3. Open the calculator in your browser and either click the upload box or drag and drop the JSON file onto it.
4. Review the parsed material list, then choose your calculation options:
   - Prioritize Stonecutter Recipes, to prefer stonecutter recipes over crafting recipes where both are available.
   - Compress Reversible Base Ingredients, to roll loose base materials into blocks once you have a full stack or more.
5. Click Calculate to generate the raw material breakdown, shown as shulker boxes, stacks, and remaining items.

## Expected input format

The uploaded file should be a JSON file with the following shape, matching the item names and totals produced by Litematica's material list:

```json
{
  "Materials": [
    { "Item": "minecraft:oak_planks", "Total": 256 },
    { "Item": "minecraft:redstone", "Total": 64 }
  ]
}
```

## Tech stack

- React 19 with TypeScript
- Vite as the build tool and dev server
- Tailwind CSS for styling
- lucide react for icons
- A bundled recipe dataset covering vanilla Minecraft crafting, smelting, and stonecutting recipes

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/L1ghtRay/Litematica-Raw-Materials-Calculator.git
cd Litematica-Raw-Materials-Calculator
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Project structure

```
src/
  App.tsx                        Top level app layout and state
  components/                    UI components, including the file drop box,
                                  material and ingredient grids, and shared
                                  common components
  scripts/
    materialListGenerator.ts     Parses the uploaded material list into a
                                  usable map of items and totals
    ingredientListGenerator.ts   Builds the recipe dependency graph and
                                  calculates raw material totals
  assets/
    recipes.json                 Bundled recipe data used to resolve items
                                  down to their raw ingredients
public/
  item/                          Item icon images used in the UI
```

## Notes

This project is not affiliated with Mojang, Microsoft, or the Litematica mod. Minecraft is a trademark of Mojang Synergies AB, referenced here only to describe compatibility.
