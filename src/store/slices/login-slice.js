const { createSlice } = require("@reduxjs/toolkit");

const loginSlice = createSlice({
  name: "login",
  initialState: {
    ismodel: false,
    userdata: {},
  },
  reducers: {
    loginModel(state, action) {
      if (state.ismodel) {
        state.ismodel = false;
      } else {
        state.ismodel = true;
      }
    },
    userIplogin(state, action) {
      if (action.payload) {
        state.userdata = action.payload;
      }
    },
    userLogin(state, action) {
      if (action.payload.status) {
        state.userdata = action.payload.details;
        sessionStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    userLogout(state, action) {
      state.userdata = "";
      sessionStorage.clear();
    },
    userUpdate(state, action) {
      state.userdata = action.payload;
    },
  },
});

export const { loginModel, userLogin, userLogout, userUpdate ,userIplogin} =
  loginSlice.actions;
export default loginSlice.reducer;
