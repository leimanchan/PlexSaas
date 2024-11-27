// book-calculator-ai/config.js

export const artPrintsConfig = {
  fields: [
      {
          name: "Quantity",
          type: "number",
          default: 1,
          required: true,
          setup_cost: 0
      },
      {
          name: "Orientation",
          type: "dropdown",
          options: [
              { label: "Auto-detected", setup_cost: 0 },
              { label: "Portrait", setup_cost: 0 },
              { label: "Landscape", setup_cost: 0 }
          ],
          required: false
      },
      {
          name: "Size",
          type: "dropdown",
          options: [
              { label: "5.5\" x 8.5\"", setup_cost: 15 },
              { label: "Custom Size", setup_cost: 25 }
          ],
          required: true
      },
      {
          name: "Colors (Front)",
          type: "radio",
          options: [
              { label: "Color", base_price_per_page: 0.5, setup_cost: 40 },
              { label: "Grayscale", base_price_per_page: 0.4, setup_cost: 50 }
          ],
          required: true
      },
      {
          name: "Colors (Back)",
          type: "radio",
          options: [
              { label: "None", base_price_per_page: 0.00, setup_cost: 0 },
              { label: "Color", base_price_per_page: 0.3, setup_cost: 20 },
              { label: "Grayscale", base_price_per_page: 0.2, setup_cost: 10 }
          ],
          required: true
      },
      {
          name: "Paper Type",
          type: "dropdown",
          options: [
              { label: "Satin", base_price_per_sheet: 0.4, setup_cost: 20 },
              { label: "Satin AQ", base_price_per_sheet: 0.6, setup_cost: 100 },
              { label: "Uncoated Textured", base_price_per_sheet: 0.6, setup_cost: 50 },
              { label: "Uncoated", base_price_per_sheet: 0.4, setup_cost: 20 }
          ],
          required: true
      },
      {
          name: "Paper Weight",
          type: "radio",
          options: [
              { label: "100lb Text", base_price_per_sheet: 0.13, setup_cost: 20 },
              { label: "80lb Cover", base_price_per_sheet: 0.25, setup_cost: 30 },
              { label: "100lb Cover", base_price_per_sheet: 0.28, setup_cost: 30 },
              { label: "120lb Cover", base_price_per_sheet: 0.32, setup_cost: 30 }
          ],
          required: true
      },
      {
          name: "Lamination (Front)",
          type: "radio",
          options: [
              { label: "None", base_price_per_sheet: 0.00, setup_cost: 0 },
              { label: "Gloss Lamination", base_price_per_sheet: 0.5, setup_cost: 40 },
              { label: "Matte Lamination", base_price_per_sheet: 0.5, setup_cost: 40 },
              { label: "Soft-Touch Matte Lamination", base_price_per_sheet: 0.5, setup_cost: 35 },
              { label: "Soft-Touch Snake Skin Matte Lamination", base_price_per_sheet: 0.5, setup_cost: 45 },
              { label: "Sandy Matte Lamination", base_price_per_sheet: 0.5, setup_cost: 40 }
          ],
          required: false
      },
      {
          name: "Lamination (Back)",
          type: "radio",
          options: [
              { label: "None", base_price_per_sheet: 0.00, setup_cost: 0 },
              { label: "Gloss Lamination", base_price_per_sheet: 0.3, setup_cost: 10 },
              { label: "Matte Lamination", base_price_per_sheet: 0.3, setup_cost: 10 },
              { label: "Soft-Touch Matte Lamination", base_price_per_sheet: 0.3, setup_cost: 10 },
              { label: "Soft-Touch Snake Skin Matte Lamination", base_price_per_sheet: 0.3, setup_cost: 10 },
              { label: "Sandy Matte Lamination", base_price_per_sheet: 0.3, setup_cost: 10 }
          ],
          required: false
      }
  ],
  sheet_multipliers: {
      printing_front: [
          { range: "1-25", multiplier: 1.00 },
          { range: "26-50", multiplier: 0.94 },
          { range: "51-100", multiplier: 0.88 },
          { range: "101-250", multiplier: 0.82 },
          { range: "251-500", multiplier: 0.76 },
          { range: "501-750", multiplier: 0.70 },
          { range: "751-1000", multiplier: 0.64 },
          { range: "1001-1500", multiplier: 0.58 },
          { range: "1501-2000", multiplier: 0.52 },
          { range: "2001-3000", multiplier: 0.46 },
          { range: "3001-3500", multiplier: 0.35 }
      ],
      printing_back: [
          { range: "1-25", multiplier: 1.00 },
          { range: "26-50", multiplier: 0.94 },
          { range: "51-100", multiplier: 0.88 },
          { range: "101-250", multiplier: 0.82 },
          { range: "251-500", multiplier: 0.76 },
          { range: "501-750", multiplier: 0.70 },
          { range: "751-1000", multiplier: 0.64 },
          { range: "1001-1500", multiplier: 0.58 },
          { range: "1501-2000", multiplier: 0.52 },
          { range: "2001-3000", multiplier: 0.46 },
          { range: "3001-3500", multiplier: 0.35 }
      ]
  },
  imposition_categories_flatprints: [
      { name: "8-up-XSML", maxWidth: 5, maxHeight: 8, slotsPerSheet: 8 },
      { name: "8-up", maxWidth: 6, maxHeight: 9, slotsPerSheet: 8 },
      { name: "6-up", maxWidth: 7, maxHeight: 9, slotsPerSheet: 6 },
      { name: "4-up", maxWidth: 9, maxHeight: 12, slotsPerSheet: 4 },
      { name: "2-up", maxWidth: 10, maxHeight: 10, slotsPerSheet: 2 },
      { name: "2-up-XL", maxWidth: 12, maxHeight: 18, slotsPerSheet: 2 },
      { name: "1-up-XXL", maxWidth: 19.5, maxHeight: 27.75, slotsPerSheet: 1 }
  ],
  size_multipliers: [
      { name: "Large", minWidth: 13.1, minHeight: 19.1, multiplier: 1.2, setup_cost: 50 },
      { name: "Extra Large", minWidth: 14.1, minHeight: 22.1, multiplier: 1.5, setup_cost: 100 }
  ]
};
