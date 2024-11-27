import { artPrintsConfig as config } from '../server/config/flatConfig.js';

// Imposition calculator factory
export function createImpositionCalculator(config) {
    return {
        categorize(width, height) {
            const normalizedSize = {
                width: Math.min(width, height),
                height: Math.max(width, height)
            };

            for (const category of config.imposition_categories_flatprints) {
                if (
                    normalizedSize.width <= category.maxWidth &&
                    normalizedSize.height <= category.maxHeight
                ) {
                    return {
                        category: category.name,
                        slotsPerSheet: category.slotsPerSheet
                    };
                }
            }

            throw new Error('Size does not fit into any imposition category');
        }
    };
}

// Paper cost calculator factory
export function createPaperCalculator(config) {
    return {
        getCostPerSheet(paperType, paperWeight) {
            const paperTypeOption = config.fields
                .find((f) => f.name === "Paper Type")
                .options.find((o) => o.label === paperType);

            const paperWeightOption = config.fields
                .find((f) => f.name === "Paper Weight")
                .options.find((o) => o.label === paperWeight);

            return (
                (paperTypeOption.base_price_per_sheet || 0) +
                (paperWeightOption.base_price_per_sheet || 0)
            );
        },

        calculateTotalPaperCost(paperType, paperWeight, sheetsNeeded) {
            const costPerSheet = this.getCostPerSheet(paperType, paperWeight);
            return costPerSheet * sheetsNeeded;
        }
    };
}

// Printing cost calculator factory
export function createPrintingCalculator(config) {
    function gatherPrintingElements(frontMethod, backMethod, sheetsNeeded) {
        // Get front printing data
        const frontOption = config.fields
            .find((f) => f.name === "Colors (Front)")
            .options.find((o) => o.label === frontMethod);

        // Get front quantity multiplier
        const frontMultiplier =
            config.sheet_multipliers.printing_front.find((entry) => {
                const [min, max] = entry.range.split('-').map(Number);
                return sheetsNeeded >= min && sheetsNeeded <= max;
            })?.multiplier || 1;

        // Get back printing data (if any)
        const backOption =
            backMethod !== "None"
                ? config.fields
                      .find((f) => f.name === "Colors (Back)")
                      .options.find((o) => o.label === backMethod)
                : null;

        // Get back quantity multiplier (if needed)
        const backMultiplier = backOption
            ? config.sheet_multipliers.printing_back.find((entry) => {
                  const [min, max] = entry.range.split('-').map(Number);
                  return sheetsNeeded >= min && sheetsNeeded <= max;
              })?.multiplier || 1
            : 0;

        return {
            front: {
                costPerSheet: frontOption.base_price_per_page,
                setupCost: frontOption.setup_cost,
                multiplier: frontMultiplier
            },
            back: backOption
                ? {
                      costPerSheet: backOption.base_price_per_page,
                      setupCost: backOption.setup_cost,
                      multiplier: backMultiplier
                  }
                : null
        };
    }

    return {
        calculatePrintingCost(frontMethod, backMethod, sheetsNeeded) {
            const elements = gatherPrintingElements(
                frontMethod,
                backMethod,
                sheetsNeeded
            );

            // Calculate front costs
            const frontPrintingCost =
                elements.front.costPerSheet *
                sheetsNeeded *
                elements.front.multiplier;

            // Calculate back costs (if any)
            const backPrintingCost = elements.back
                ? elements.back.costPerSheet *
                  sheetsNeeded *
                  elements.back.multiplier
                : 0;

            // Total setup costs
            const totalSetupCost =
                elements.front.setupCost +
                (elements.back ? elements.back.setupCost : 0);

            return {
                cost: frontPrintingCost + backPrintingCost + totalSetupCost,
                frontPrintingCost,
                backPrintingCost,
                setupCost: totalSetupCost,
                frontMultiplier: elements.front.multiplier,
                backMultiplier: elements.back ? elements.back.multiplier : 0
            };
        }
    };
}

// Main calculator factory
export function createFlatPrintCalculator(config) {
    const impositionCalc = createImpositionCalculator(config);
    const paperCalc = createPaperCalculator(config);
    const printingCalc = createPrintingCalculator(config);

    function calculateSheetsNeeded(quantity, slotsPerSheet) {
        return Math.ceil(quantity / slotsPerSheet);
    }

    function formatCurrency(amount) {
        return Number(amount.toFixed(2));
    }

    return {
        calculatePrice({
            quantity,
            width,
            height,
            paperType,
            paperWeight,
            frontPrinting,
            backPrinting
        }) {
            // Get imposition details
            const { slotsPerSheet } = impositionCalc.categorize(width, height);

            // Calculate sheets needed
            const sheetsNeeded = calculateSheetsNeeded(quantity, slotsPerSheet);

            // Calculate paper costs
            const paperCost = paperCalc.calculateTotalPaperCost(
                paperType,
                paperWeight,
                sheetsNeeded
            );

            // Calculate printing costs
            const {
                cost: printingCost,
                frontPrintingCost,
                backPrintingCost,
                setupCost
            } = printingCalc.calculatePrintingCost(
                frontPrinting.method,
                backPrinting?.method || "None",
                sheetsNeeded
            );

            // Calculate totals
            const totalCost = paperCost + printingCost;
            const costPerSheet = totalCost / sheetsNeeded;

            return {
                totalCost: formatCurrency(totalCost),
                sheetsNeeded,
                costPerSheet: formatCurrency(costPerSheet),
                paperCost: formatCurrency(paperCost),
                printingCost: formatCurrency(printingCost),
                frontPrintingCost: formatCurrency(frontPrintingCost),
                backPrintingCost: formatCurrency(backPrintingCost),
                setupCost: formatCurrency(setupCost),
                slotsPerSheet
            };
        }
    };
}

// Create a pre-configured calculator with default config
export const createDefaultCalculator = () =>
    createFlatPrintCalculator(config);
