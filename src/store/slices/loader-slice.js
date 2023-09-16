const { createSlice } = require("@reduxjs/toolkit");

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: true,
  },
  reducers: {
    setLoader(state, action) {
      state.loader = true;
    },
    setLoaderOff(state, action) {
      state.loader = false;
    },
  },
});

export const { setLoader, setLoaderOff } = loaderSlice.actions;
export default loaderSlice.reducer;
