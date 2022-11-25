import React, { useEffect, useState } from "react";

import { CreateProperty } from "./CreateProperty/CreateProperty";
import { getLoggedRoles } from "Utils";
import { PropertyByRole } from "./PropertyByRole/PropertyByRole";
import Constants from "Constants";
import { useNavigate } from "react-router";
import axios from "axios";
const houses =
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const houses2 = "../assets/images/houses2.jpeg";
//
export const Property = (props) => {
  // have a state to save all the fetched properties
  const [property, setProperties] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      // let properties = axios.get('.......')
      let data = [
        {
          id: 1,
          name: "House",
          category: "For Rent",
          price: 3000,
          image:
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          id: 2,
          name: "Apartment",
          category: "For Rent",
          price: 2000,
          image:
            "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?cs=srgb&dl=pexels-jessica-bryant-1370704.jpg&fm=jpg",
        },
        {
          id: 3,
          name: "Condo",
          category: "For Sell",
          price: 50000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJQhxdTUh1pKA1sThcw1Jgg4lxUATDfTjU8gdYMNV2VOf1vcSD-p-DeckmGdQqusYYuG4&usqp=CAU",
        },
        {
          id: 4,
           name: "Building",
          category: "For Sell",
          price: 60000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCr06io93raCPVc0usiGtx3ZQnsYwRpKhZ8iUcagDYB2nSXOwutTRGj1n_ILdy5QPa_k&usqp=CAU",
        },
      ];
      setProperties(data);
    };
    fetch();
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

      <h1>Property Management Services</h1>

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
