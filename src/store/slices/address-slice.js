import { apiAddress } from "../../service/api";
import { getApi } from "../../service/axiosCall";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an asynchronous thunk for fetching address items
export const fetchAddressItems = createAsyncThunk(
  "address/fetchAddressItems",
  async (url) => {
    try {
      const response = await getApi(url);
      return response;
    } catch (error) {
      throw Error("Failed to fetch address items: " + error.message);
    }
  }
);

// Create an asynchronous thunk for fetching address items by ID
export const fetchAddressItemsById = createAsyncThunk(
  "address/fetchAddressItemsById",
  async (id) => {
    try {
      const response = await getApi(`${apiAddress.getaddressbyid}${id}`);
      return response;
    } catch (error) {
      throw Error("Failed to fetch address items by ID: " + error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressitems: [],
    addressitem: {},
    loading: false,
    error: null,
  },
  reducers: {
    emptyAddress(state, action) {
      state.addressitem = {};
      state.addressitems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressItems.fulfilled, (state, action) => {
        state.loading = false;
        state.addressitems = action.payload;
      })
      .addCase(fetchAddressItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAddressItemsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressItemsById.fulfilled, (state, action) => {
        state.loading = false;
        state.addressitem = action.payload;
      })
      .addCase(fetchAddressItemsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { emptyAddress } = addressSlice.actions;
export default addressSlice.reducer;
