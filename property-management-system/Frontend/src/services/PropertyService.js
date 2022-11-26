import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./AxiosService";


export const getAllProperties = createAsyncThunk(
  'properties/fetchAll',
  async () => {
    const result = await axiosInstance.get('/properties');
    return result.data;
});

export const getPropertyById = createAsyncThunk('properties/fetchById', async (id) => {
  const response = await axiosInstance.get(`/properties/${id}`);
  return response.data;
});

export const contact = createAsyncThunk('properties/contact', async (payload) => {
    const response = await axiosInstance.post('/contacts/contact', payload);
    return response.data;
})

export const requestVisit = createAsyncThunk('properties/visit', async (payload) => {
    const response = await axiosInstance.post('/contacts/visit', payload);
    return response.data;
})

export const submitApplication = createAsyncThunk('properties/application', async (payload) => {
  const response = await axiosInstance.post('/contacts/application', payload);
  return response.data;
})

export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData) => {
    try {
      const response = await axiosInstance.post('/properties', propertyData);
      return response.data;
    } catch(err) {
      return err.error;
    }
});

export const getPropertyByEmail = createAsyncThunk('properties/fetchByEmail', async (email) => {
    const response = await axiosInstance.get(`/users/${email}/favourites`);
    return response.data;
});

export const updateListedProperty = createAsyncThunk(
  'properties/updateListed',
  async (data) => {
    const { id, listed } = data;
    const result = await axiosInstance.patch(`/properties/${id}/listed/${listed}`);
    return result.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id) => {
    const result = await axiosInstance.delete(`/properties/${id}`);
    return result.data;
  }
);

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async (data) => {
    const { id, ...property } = data;
    const result = await axiosInstance.put(`/properties/${id}`, property);
    return result.data;
  }
);