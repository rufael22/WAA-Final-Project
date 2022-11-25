import './SearchWidget.scss';
import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchWidget = () => {
    const nav = useNavigate();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    // location: street, city, zipcode
    const locationChanged = (e) => {
        let txt = e.target.value;
        let arr = txt.split(',');
        if (arr.length > 0) {
            setStreet(arr[0].trim());
        }
        if (arr.length > 1) {
            setCity(arr[1].trim());
        }
        if (arr.length > 2) {
            setZipCode(arr[2].trim());
        }
    };

    const locationKeyDowned = (e) => {
        if (e.keyCode === 13) {
            searchClicked(e);
        }
    };

    const searchClicked = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if (street !== '') {
            searchParams.append('street', street);
        }
        if (city !== '') {
            searchParams.append('city', city);
        }
        if (zipCode !== '') {
            searchParams.append('zipCode', zipCode);
        }
        let url = '/property-list?' + searchParams.toString();
        nav(url);
    };

    return (
        <div className="searchWidget">
            <div className="property-search-header">
                <h3>Find Your Future Home</h3>
            </div>
            <Grid container padding={2}>
                <Grid item xs={12} sx={{mb: 2}}>
                    <TextField
                        fullWidth
                        placeholder="Address, City, Zipcode"
                        id="locationInput"
                        variant="outlined"
                        onChange={locationChanged}
                        onKeyDown={locationKeyDowned}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Button variant="contained" onClick={searchClicked}>Search</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SearchWidget;