// Define shipping zones with base rates and multipliers
const zones = [
  { name: "Local", baseRate: 6.93, multiplier: 0.50, zipRanges: [[90001, 93599]] },
  { name: "Nearby", baseRate: 8.18, multiplier: 0.70, zipRanges: [[97001, 97920], [84001, 84784]] },
  { name: "Central", baseRate: 9.89, multiplier: 0.80, zipRanges: [[73301, 79999]] },
  { name: "Farther Midwest", baseRate: 8.78, multiplier: 1.32, zipRanges: [[43001, 45999]] },
  { name: "East Coast", baseRate: 8.78, multiplier: 1.5, zipRanges: [[10001, 14925], [30301, 39999]] },
  { name: "Alaska", baseRate: 30.00, multiplier: 3.25, zipRanges: [[99501, 99950]] },
  { name: "Hawaii", baseRate: 30.00, multiplier: 4.00, zipRanges: [[96701, 96898]] },
];

// Function to calculate shipping cost
export function calculateShipping(zip, weight) {
  if (!zip || zip.length !== 5 || isNaN(parseInt(zip)) || weight <= 0) {
    return "Please provide a valid 5-digit ZIP code and positive weight.";
  }

  const zipCode = parseInt(zip);

  // Determine the shipping zone
  let shippingZone = null;
  for (const zone of zones) {
    for (const range of zone.zipRanges) {
      if (zipCode >= range[0] && zipCode <= range[1]) {
        shippingZone = zone;
        break;
      }
    }
    if (shippingZone) break;
  }

  if (!shippingZone) {
    return "ZIP code is out of range. Unable to calculate shipping.";
  }

  // Split weight into boxes if weight > 20 lbs
  const maxBoxWeight = 20; // Maximum weight per box
  const numBoxes = Math.ceil(weight / maxBoxWeight);
  const weightsPerBox = Array(numBoxes).fill(maxBoxWeight);
  weightsPerBox[numBoxes - 1] = weight % maxBoxWeight || maxBoxWeight; // Adjust last box weight

  // Calculate the shipping cost for each box
  let totalShippingCost = 0;
  weightsPerBox.forEach((boxWeight) => {
    totalShippingCost += shippingZone.baseRate + shippingZone.multiplier * boxWeight;
  });

  return `Shipping to ZIP ${zip} (${shippingZone.name} Zone) for a total weight of ${weight} lbs:
  - Number of boxes: ${numBoxes}
  - Total shipping cost: $${totalShippingCost.toFixed(2)}`;
}

