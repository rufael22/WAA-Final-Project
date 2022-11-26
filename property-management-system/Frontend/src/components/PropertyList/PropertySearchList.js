import { useEffect, useState } from "react";
import {
    Button, Checkbox, FormControl, Grid,
    InputLabel, ListItemText, MenuItem,
    OutlinedInput, Select, TextField
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../services/AxiosService";
import Constants from "Constants";
import PropertyList from "./PropertyList";
import { currencyUSDFormatter, getLoggedRoles } from 'Utils';
import "./PropertyList.scss";

const DEFAULT_IMG = process.env.PUBLIC_URL + "/slider-1.jpeg";
const HOME_TYPES = [
    "Apartment",
    "Building",
    "Condo",
    "House",
    "Trailer"
];
const RENT = "rent";
const SELL = "sell";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MAX_PRICE = 100_000_000;

export default function PropertySearchList(props) {
    const [urlParams] = useSearchParams();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [locationTxt, setLocationTxt] = useState('');
    const [type, setType] = useState('sell');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
    const [minPricesVal, setMinPricesVal] = useState([]);
    const [maxPricesVal, setMaxPricesVal] = useState([]);
    const [noBed, setNoBed] = useState(0);
    const [homeType, setHomeType] = useState([]);
    const [roles, setRoles] = useState();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        handleUrlParams();
        initMinMax(SELL);
        setHomeType([...HOME_TYPES]);
    }, []);

    const initMinMax = (type) => {
        setMinPrice(0);
        setMaxPrice(MAX_PRICE);

        let minArr = [{ value: 0, text: 'Any' }];
        let maxArr = [{ value: MAX_PRICE, text: 'Any' }];
        for (let i = 1; i < 10; i++) {
            let value = i * 100_000;
            if (type === RENT) {
                value = i * 500;
            }
            let minItem = {
                value: value,
                text: currencyUSDFormatter.format(value)
            }
            minArr.push(minItem);

            let maxItem = {
                value: value,
                text: currencyUSDFormatter.format(value)
            }
            maxArr.push(maxItem);
        }
        for (let i = 0; i < 5; i++) {
            let value = 1_000_000 + i * 250_000
            if (type === RENT) {
                value = (i + 10) * 500;
            }
            let minItem = {
                value: value,
                text: currencyUSDFormatter.format(value)
            }
            minArr.push(minItem);

            let maxItem = {
                value: value,
                text: currencyUSDFormatter.format(value)
            }
            maxArr.push(maxItem);
        }

        setMinPricesVal(minArr);
        setMaxPricesVal(maxArr);
    }

    // get query params from url
    const handleUrlParams = () => {
        let initLocationTxt = "";
        const searchParams = new URLSearchParams();
        let street = urlParams.get("street");
        if (street && street !== "") {
            setStreet(street);
            searchParams.append("street", street);
            initLocationTxt += street;
        }
        initLocationTxt += ",";
        let city = urlParams.get("city");
        if (city && city !== "") {
            setCity(city);
            searchParams.append("city", city);
            initLocationTxt += city;
        }
        initLocationTxt += ",";
        let zipCode = urlParams.get("zipCode");
        if (zipCode && zipCode !== "") {
            setZipCode(zipCode);
            searchParams.append("zipCode", zipCode);
            initLocationTxt += zipCode;
        }

        if (initLocationTxt !== ",,") {
            setLocationTxt(initLocationTxt);
        }
        searchParams.append("onlyLocation", true);
        let url = "/properties/search?" + searchParams.toString();
        getProperties(url);
    }

    // location: street, city, zipcode
    const locationChanged = (e) => {
        let txt = e.target.value;
        setLocationTxt(txt);
        let arr = txt.split(",");
        if (arr.length > 0) {
            setStreet(arr[0].trim());
        }
        if (arr.length > 1) {
            setCity(arr[1].trim());
        }
        if (arr.length > 2) {
            setZipCode(arr[2].trim());
        }
    }

    // Min, Max price
    const priceMenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 120
            }
        }
    };

    const minPriceChanged = (e) => {
        let minVal = e.target.value;
        setMinPrice(minVal);
        console.log("minPrice: " + minVal);
        console.log("maxPrice: " + maxPrice);
        // filter max values
        let maxArr = [{ value: MAX_PRICE, text: 'Any' }];
        for (let i = 1; i < 10; i++) {
            let val = i * 100_000;
            if (type === RENT) {
                val = i * 500;
            }
            if (val >= minVal) {
                let maxItem = {
                    value: val,
                    text: currencyUSDFormatter.format(val)
                }
                maxArr.push(maxItem);
            }
        }
        for (let i = 0; i < 5; i++) {
            let val = 1_000_000 + i * 250_000;
            if (type === RENT) {
                val = (i + 10) * 500;
            }
            if (val >= minVal) {
                let maxItem = {
                    value: val,
                    text: currencyUSDFormatter.format(val)
                }
                maxArr.push(maxItem);
            }
        }
        setMaxPricesVal(maxArr);
    }

    const maxPriceChanged = (e) => {
        let maxVal = e.target.value;
        setMaxPrice(maxVal);
        console.log("minPrice: " + minPrice);
        console.log("maxPrice: " + maxVal);
        // filter min values
        let minArr = [{ value: 0, text: 'Any' }];
        for (let i = 1; i < 10; i++) {
            let val = i * 100_000;
            if (type === RENT) {
                val = i * 500;
            }
            if (val <= maxVal) {
                let minItem = {
                    value: val,
                    text: currencyUSDFormatter.format(val)
                }
                minArr.push(minItem);
            }
        }
        for (let i = 0; i < 5; i++) {
            let val = 1_000_000 + i * 250_000;
            if (type === RENT) {
                val = (i + 10) * 500;
            }
            if (val <= maxVal) {
                let minItem = {
                    value: val,
                    text: currencyUSDFormatter.format(val)
                }
                minArr.push(minItem);
            }
        }
        setMinPricesVal(minArr);
    }

    // Number of beds
    const noBedChanged = (e) => {
        setNoBed(e.target.value);
    }

    // Home type
    const typeChanged = (e) => {
        const type = e.target.value;
        setType(type);
        initMinMax(type);
    }

    const homeTypeMenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };


    const homeTypeChanged = (e) => {
        const value = e.target.value;
        setHomeType(typeof value === 'string' ? value.split(',') : value);
    };

    // search
    const searchClicked = (e) => {
        const searchParams = new URLSearchParams();
        searchParams.append("propertyType", type);
        if (minPrice !== 0) {
            searchParams.append("minPrice", minPrice);
        }
        if (maxPrice !== MAX_PRICE) {
            searchParams.append("maxPrice", maxPrice);
        }
        if (noBed !== 0) {
            searchParams.append("minRoomNumber", noBed);
        }
        if (homeType.length > 0) {
            searchParams.append("homeType", homeType.join());
        }
        if (street !== "") {
            searchParams.append("street", street);
        }
        if (city !== "") {
            searchParams.append("city", city);
        }
        if (zipCode !== "") {
            searchParams.append("zipCode", zipCode);
        }
        let url = "/properties/search?" + searchParams.toString();
        console.log(url);

        getProperties(url);
    }

    const getProperties = async (url) => {
        console.log("Get properties");
        console.log(Constants);
        let properties = await axiosInstance.get(url);
        // set default image
        properties.data.map(prop => {
            prop.mainPicture = prop.pictures != null && prop.pictures.length > 0 ?
                prop.pictures[0] : DEFAULT_IMG
            prop.formattedPrice = currencyUSDFormatter.format(prop.price)
            return prop;
        });
        try {
            let roles = getLoggedRoles();
            setRoles(roles);
        } catch (e) { }
        setProperties(properties.data);
    }


    return (
        <div className="container propertyList">
            <Grid container>
                <Grid item xs={12} md={12} sx={{ mb: 2, minWidth: 300 }}>
                    <TextField fullWidth placeholder="Address, City, Zipcode"
                        id="locationInput"
                        variant="outlined"
                        onChange={locationChanged}
                        value={locationTxt}>
                    </TextField>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item>
                    <FormControl sx={{ mt: 2 }} size="small">
                        <Select
                            labelId="typeLabel"
                            id="type"
                            value={type}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={typeChanged}
                        >
                            <MenuItem value="sell">For Sale</MenuItem>
                            <MenuItem value="rent">For Rent</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl sx={{ mt: 2, minWidth: 130 }} size="small">
                        <InputLabel id="minPriceLabel">Min Price</InputLabel>
                        <Select
                            labelId="minPriceLabel"
                            id="minPrice"
                            value={minPrice}
                            label="Min Price"
                            MenuProps={priceMenuProps}
                            onChange={minPriceChanged}
                        >
                            {minPricesVal.map(price => (
                                <MenuItem key={"min" + price.value} value={price.value}>{price.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl sx={{ mt: 2, minWidth: 130 }} size="small">
                        <InputLabel id="maxPriceLabel">Max Price</InputLabel>
                        <Select
                            labelId="maxPriceLabel"
                            id="maxPrice"
                            value={maxPrice}
                            label="Max Price"
                            MenuProps={priceMenuProps}
                            onChange={maxPriceChanged}
                        >
                            {maxPricesVal.map(price => (
                                <MenuItem key={"max" + price.value} value={price.value}>{price.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl sx={{ mt: 2, minWidth: 80 }} size="small">
                        <InputLabel id="noBedLabel">Beds</InputLabel>
                        <Select
                            labelId="noBedLabel"
                            id="noBed"
                            value={noBed}
                            label="Beds"
                            onChange={noBedChanged}
                        >
                            <MenuItem value={0}>Any</MenuItem>
                            <MenuItem value={1}>1+</MenuItem>
                            <MenuItem value={2}>2+</MenuItem>
                            <MenuItem value={3}>3+</MenuItem>
                            <MenuItem value={4}>4+</MenuItem>
                            <MenuItem value={5}>5+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl sx={{ mt: 2, width: 200 }} size="small">
                        <InputLabel id="homeTypeCheckboxLabel">Home Type</InputLabel>
                        <Select labelId="homeTypeSelectLabel"
                            id="homeTypeSelect"
                            multiple
                            value={homeType}
                            onChange={homeTypeChanged}
                            input={<OutlinedInput label="Home Type" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={homeTypeMenuProps}>
                            {HOME_TYPES.map(home => (
                                <MenuItem key={home} value={home}>
                                    <Checkbox checked={homeType.indexOf(home) > -1} />
                                    <ListItemText primary={home} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>

                <Grid item>
                    <Button variant="contained" sx={{ mt: 2, mb: 2 }}
                        onClick={searchClicked}>Search</Button>
                </Grid>

            </Grid>
            <PropertyList
                properties={properties}
                roles={roles}
                itemPerPage={20}
            />
        </div>
    )
};
