import React, {useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getPropertyByEmail} from "../../services/PropertyService";
import FavoritePropertyCard from "./FavoritePropertyCard";
import Grid from "@mui/material/Unstable_Grid2";
import {deriveEmailFromToken} from "../../Utils";

export default function FavoriteProperty(props){
    const favPropertyState = useSelector((state) => state.property);
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPropertyByEmail(deriveEmailFromToken()));
    },[]);


    return(
         <div className="container">
            <h3>Saved Home</h3>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {!favPropertyState.loadedFavProperties ? <div>Loading...</div>:
                favPropertyState.favProperties.map(prop =>
                    <Grid key={prop.id} xs={12} md={6} lg={4} xl={3}>
                        <FavoritePropertyCard {...prop} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}