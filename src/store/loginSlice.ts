import { login } from "@/api";
import { LoginResponseType, LoginType } from "@/api/type";
import { Message } from "@arco-design/web-react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const initialState: LoginResponseType = {
  userId: null,
  userName: null,
  roleCode: null,
  token: null,
  success: false,
  regionId: null,
  msg: "",
  repair: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<LoginResponseType>) => {
      return action.payload;
    },
  },
});

export const loginAsync = (data: LoginType) => (dispatch: AppDispatch) => {
  login(data)
    .then(({ data }) => {
      dispatch(LOGIN(data));
    })
    .catch((res) => {
      Message.error(res.message);
    });
};

export const { LOGIN } = loginSlice.actions;

export default loginSlice.reducer;