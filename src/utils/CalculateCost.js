export const calculateCost = ({ type, weight, senderCenter, receiverCenter }) => {
  let baseCost = 60;

  // Parcel type
  if (type === "non-document") {
    baseCost += 40;
  }

  // Weight cost (optional)
  if (weight) {
    baseCost += weight * 10;
  }

  // Service center distance logic (simple example)
  if (senderCenter !== receiverCenter) {
    baseCost += 30;
  }

  return baseCost;
};
