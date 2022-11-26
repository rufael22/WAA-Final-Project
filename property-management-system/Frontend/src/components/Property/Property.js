import React, { useEffect, useState } from "react";

import { CreateProperty } from "./CreateProperty/CreateProperty";
import { getLoggedRoles } from "Utils";
import { PropertyByRole } from "./PropertyByRole/PropertyByRole";
import Constants from "Constants";
import { useNavigate } from "react-router";
import axios from "axios";
import axiosInstance from "../../services/AxiosService";


const houses =
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const houses2 = "../assets/images/houses2.jpeg";
//
export const Property = (props) => {
  // have a state to save all the fetched properties
  const [property, setProperties] = useState([]);

  useEffect(() => {
   function fetch(){
     console.log("Hello")
    const url = "/properties"
         axiosInstance.post(url)
         .then(res=>{
           console.log(res.data)})
        }
        fetch()
        // setAlertContent("Added to favorite list.");
        // setOpenAlert(true);
   
      // let properties = axios.get('.......')
      // axios.get("http://localhost:8080/properties",null,{
      //   'Content-Type': 'application/json',
      //   'X-Auth-Token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydWZhZWx5b2hhbm5lc0BtaXUuZWR1IiwiaWF0IjoxNjY5NDE5NTUxLCJleHAiOjE2Njk0MjA2MzF9.HFIn914tV4RLscuklEhmAWTzGDIbFY6__RtEloxy4rpyBvEGTQGl-XcMUrheVaEvYL5BTL9th3VUTmE1mEvn_g',
      // })
      // .then(res=>setProperties(res.data))
      
   
  }, []);
  const navigate = useNavigate();
  return (
    <div
      className="container bg-image"
      style={{
        backgroundImage: `url(https://pngtree.com/freebackground/black-technology-real-estate-background-poster-banner_1028580.html)`,
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "200%",
      }}
    >
      <div className="row">
        <div className="col-md-4 offset-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                search
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Property Managment Portals</h1>

      <div className="row mt-5" onClick={() => navigate("/login")}>
        {property.length > 0 &&
          property.map((item) => (
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <img src={item.image} className="w-100" />
                  <p>{item.price}</p>
                  <p>{item.name}</p>
                  <p>{item.catagory}</p>
                  <button>buy/rent</button>
                  <button>delete</button>
                  <button>edit</button>
                </div>
              </div>
            </div>
          ))}
        {/* <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <img src={houses} className="w-100" />
              <p>$7000</p>
              <p>Location : ....</p>
              <p>Number of Rooms : 3</p>
            </div>
          </div>
        </div> */}
        {/* <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <img src={houses} className="w-100" />
              <p>$7000</p>
              <p>Location : ....</p>
              <p>Number of Rooms : 3</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
