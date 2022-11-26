import dayjs from 'dayjs';

export const initialProperty = {
  price: '',
  numOfRoom: '',
  propertyType: '',
  homeType: '',
  location: {
    street: '',
    city: '',
    zipCode: '',
  },
  overview: '',
  availableDate: dayjs(),
  pictures: [],
};

export const initValidProperty = {
  price: '',
  numOfRoom: '',
  propertyType: '',
  homeType: '',
  street: '',
  city: '',
  zipCode: ''
};