export const formatCurrency = (value) => {
  return value?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};
