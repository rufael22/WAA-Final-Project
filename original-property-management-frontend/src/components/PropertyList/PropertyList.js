import { Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
 //import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import DataPagination from "../DataPagination/DataPagination";
import PropertyCard from "./PropertyCard";
//import { deleteProperty } from 'services/PropertyService';
import { useDispatch } from "react-redux";

export default function PropertyList(props) {
    const { properties, itemPerPage, roles, ...others } = props;
    let [page, setPage] = useState(1);
    const count = Math.ceil(properties.length / itemPerPage );
    const DATA_PAGINATION = DataPagination(properties, itemPerPage);

    const dispatch = useDispatch();

    useEffect(() => {
        gotoPage(1);
    }, [properties]);

    const gotoPage = (page) => {
        setPage(page);
        DATA_PAGINATION.goTo(page);
    }

    const pageChanged = (e, page) => {
        gotoPage(page);
    }

    const handleDelete = (id) => {
        if (typeof props.setRefresh === "function") {
            props.setRefresh(true);
        }
    }

    return (
        <div>
            {
                props.showTitle !== false &&
                <h3>Property List</h3>
            }
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {DATA_PAGINATION.currentData().map(prop =>
                    <Grid key={prop.id} xs={12} md={6} lg={4} xl={3}>
                        <PropertyCard {...prop} roles={roles} {...others} deletedFunc={() => handleDelete(prop.id)} />
                    </Grid>
                )}
            </Grid>
            <div className="pagination">
                <Pagination
                    count={count}
                    size="large"
                    color="primary"
                    page={page}
                    onChange={pageChanged}
                />
            </div>
        </div>
    )
}