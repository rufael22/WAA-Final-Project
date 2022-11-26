import { getTenLatestProperties, getSumRentTypeProperties, getSumSellTypeProperties, getTotalApplications, getViewsPerLocation } from 'services/ReportService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalApplications: 0,
  sumSellTypeProperties: 0,
  sumRentTypeProperties: 0,
  tenLatestProperties: [],
  viewsPerLocation: {}
}

const reportSlice = createSlice({
  name: 'report',
  initialState: {...initialState},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTotalApplications.fulfilled, (state, action) => {
      state.totalApplications = action.payload;
    }).addCase(getSumSellTypeProperties.fulfilled, (state, action) => {
      state.sumSellTypeProperties = action.payload;
    }).addCase(getSumRentTypeProperties.fulfilled, (state, action) => {
      state.sumRentTypeProperties = action.payload;
    }).addCase(getTenLatestProperties.fulfilled, (state, action) => {
      state.tenLatestProperties = [...action.payload];
    }).addCase(getViewsPerLocation.fulfilled, (state, action) => {
      state.viewsPerLocation = action.payload;
    })
  }
});

export default reportSlice;