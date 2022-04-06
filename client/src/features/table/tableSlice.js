import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSensorData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setSensorData } = tableSlice.actions;

export const selectTable = (state) => state.table.value;

export default tableSlice.reducer;
