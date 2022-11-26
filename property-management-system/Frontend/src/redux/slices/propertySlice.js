import { createSlice } from "@reduxjs/toolkit";
import {
  contact,
  createProperty,
  getPropertyByEmail,
  getAllProperties,
  getPropertyById,
  requestVisit,
  submitApplication,
  updateProperty,
  updateListedProperty,
  deleteProperty
} from "services/PropertyService";

const initialState = {
  properties: [],  loadedProperties: false,
  property: null,  loadedProperty: false,
  contactResponse: null,
  applicationResponse: null
}

const propertySlice = createSlice({
  name: 'property',
  initialState: {...initialState},
  reducers: {
    resetContactResponse: (state) => {
      state.contactResponse = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.property = action.payload;
      state.loadedProperty = true;
    });

    builder.addCase(createProperty.pending, (state) => {
        state.loadedProperty = false;
    });

    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.properties = action.payload;
      state.loadedProperties = true;
    });

    builder.addCase(getAllProperties.pending, (state) => {
      state.loadedProperties = false;
    });

    builder.addCase(getPropertyById.fulfilled, (state, action) => {
        state.property = action.payload;
        state.loadedProperty = true;
    });

    builder.addCase(getPropertyById.pending, (state) => {
      state.loadedProperty = false;
    });

    builder.addCase(contact.fulfilled, (state, action) => {
      state.contactResponse = action.payload;
    });

    builder.addCase(requestVisit.fulfilled, (state, action) => {
      state.contactResponse = action.payload;
    });

    builder.addCase(getPropertyByEmail.pending, (state) => {
      state.loadedFavProperties = false;
    });
    builder.addCase(getPropertyByEmail.fulfilled, (state, action) => {
      state.favProperties = action.payload;
      state.loadedFavProperties = true;
    });

    builder.addCase(submitApplication.fulfilled, (state, action) => {
      state.applicationResponse = action.payload;
    });

    builder.addCase(updateProperty.pending, (state) => {
      state.loadedProperty = false;
    });
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      state.loadedProperty = true;
      state.property = action.payload;
    });

    builder.addCase(updateListedProperty.pending, (state) => {
      state.loadedProperty = false;
    });
    builder.addCase(updateListedProperty.fulfilled, (state, action) => {
      state.loadedProperty = true;
      state.property = action.payload;
    });

    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.loadedProperty = true;
      state.property = action.payload;
    });
  }
});

export const { resetContactResponse } = propertySlice.actions;

export default propertySlice;