const { createSlice } = require("@reduxjs/toolkit");

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencySymbol: "₹",
    currencyName: "INR",
    currencyRate: 1,
  },
  reducers: {
    setCurrency(state, action) {
      const currencyName = action.payload;

      // if (currencyName === "USD") {
      //   return (state = {
      //     currencySymbol: "$",
      //     currencyRate: 0.012,
      //     currencyName: "USD",
      //   });
      // }

      if (currencyName === "INR") {
        return (state = {
          currencySymbol: "₹",
          currencyRate: 1,
          currencyName: "INR",
        });
      }
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
