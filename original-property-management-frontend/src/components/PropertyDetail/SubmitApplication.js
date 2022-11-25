import { deriveEmailFromToken } from "../../Utils";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { style } from './ModalStyle'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitApplication } from "../../services/PropertyService";

export default function SubmitApplication(props) {
    const { property } = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const openClicked = (e) => {
        setOpen(true);
    }

    const closeClicked = (e) => {
        setOpen(false);
    }

    const initialForm = {
        name: "",
        phone: "",
        email: deriveEmailFromToken(),
        currentStreet: "",
        currentCity: "",
        currentZipCode: "",
        incomeMonthly: 0,
        incomeSource: "",
        employmentCurrent: "",
        employmentSince: "",
        employmentPrevious: "",
        employmentDuration: "",
        referenceName: "",
        referenceAddress: "",
        referencePhone: "",
        signatureName: "",
        signatureDate: "",
        ownerEmail: property.owner.email
    }

    const [formState, setFormState] = useState(initialForm);

    const onInputChanged = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const submitApplicationClicked = (e) => {
        console.log(formState);
        if (!!formState.name && !!formState.phone &&
            !!formState.signatureName && formState.signatureDate) {
            dispatch(submitApplication({ ...formState }));
            setFormState(initialForm);
            setOpen(false);
        }
    }

    return (
        <div>
            <Button size="medium" variant="contained" onClick={openClicked}>Send Application</Button>
            <Modal hideBackdrop
                open={open}
                onClose={closeClicked}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <h2 id="child-modal-title">Submit Application <Button onClick={closeClicked}>Close</Button></h2>
                    <div className="contact-input">
                        <TextField required fullWidth id="sa-name"
                            label="Name" name="name" variant="standard"
                            onChange={onInputChanged} />
                    </div>
                    <div className="contact-input">
                        <TextField required fullWidth id="sa-phone"
                            label="Phone" name="phone" variant="standard"
                            onChange={onInputChanged} />
                    </div>
                    <label>Current Address:</label>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-address-street"
                                label="Street" name="currentStreet" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-address-city"
                                label="City" name="currentCity" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-address-street"
                                label="ZipCode" name="currentZipCode" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                    </Grid>
                    <br />
                    <label>Income:</label>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-income-monthly"
                                label="Monthly Income" name="incomeMonthly" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-income-source"
                                label="Income Source" name="incomeSource" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                    </Grid>
                    <br />
                    <label>Employment:</label>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-emp-cur"
                                label="Current Employment" name="employmentCurrent" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField type="date" fullWidth id="sa-emp-since"
                                name="employmentSince" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-emp-prev"
                                label="Previous" name="employmentPrevious" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-emp-dur"
                                label="Duration" name="employmentDuration" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                    </Grid>
                    <br />
                    <label>Reference:</label>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-ref-name"
                                label="Name" name="referenceName" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-ref-address"
                                label="Address" name="referenceAddress" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={4} md={4} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-ref-phone"
                                label="Phone" name="referencePhone" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                    </Grid>
                    <br />
                    <label>Your Signature:</label>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField fullWidth id="sa-sig-name"
                                label="Name" name="signatureName" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ minWidth: 20 }}>
                            <TextField type="date" fullWidth id="sa-sig-date"
                                name="signatureDate" variant="standard"
                                onChange={onInputChanged} />
                        </Grid>
                    </Grid>
                    <br />

                    <div>
                        <Button className="btn-request-time" variant="contained"
                            size="large" onClick={submitApplicationClicked}>Submit</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}