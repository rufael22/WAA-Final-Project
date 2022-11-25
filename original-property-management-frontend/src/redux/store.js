import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import propertySlice from './slices/propertySlice';
import reportSlice from './slices/reportSlice';

export const store = configureStore({
  reducer: {
    property: propertySlice.reducer,
    report: reportSlice.reducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
