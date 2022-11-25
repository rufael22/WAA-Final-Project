import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProperties } from 'services/PropertyService';
import { CircularLoading } from 'components/Loading/CircularLoading';
import PropertyList from 'components/PropertyList/PropertyList';

import './Property.scss';


export const PropertyByRole = (props) => {
  const [refreshData, setRefreshData] = useState(false);
  const propertyState = useSelector((state) => state.property);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProperties());
  }, []);

  useEffect(() => {
    if (refreshData) {
      dispatch(getAllProperties())
        .then(() => {
          setRefreshData(false);
      })
    }
  }, [refreshData]);

  return (
    <div className='property-list'>
      {
        propertyState.loadedProperties === false &&
        <CircularLoading size={'20vh'} />
      }
      {
        propertyState.loadedProperties === true && 
        <PropertyList
          properties={propertyState.properties}
          setRefresh={setRefreshData}
          roles={props.roles}
          showTitle={false}
          itemPerPage={12}
        />
      }
    </div>
  );
}