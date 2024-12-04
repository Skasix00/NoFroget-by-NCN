import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
	user: null,
};

export const stateSlice = createSlice({
	name: "state",
	initialState,
	reducers: {
		userData: (state, action) => {
			state.user = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
		},
	},
});

export const { userData, logoutUser } = stateSlice.actions;

const selectState = (state) => state.state;

export const selectUserData = createSelector([selectState], (state) => state.user);

export default stateSlice.reducer;
