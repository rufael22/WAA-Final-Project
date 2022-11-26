import { useState } from "react";
import { Box, Button, Modal, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { style } from './ModalStyle'
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { deriveEmailFromToken } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { requestVisit } from "../../services/PropertyService";

export default function RequestTour(props) {
    const { property } = props;
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [dateTime, setDateTime] = useState(dayjs());

    const [visitType, setVisitType] = useState('IN_PERSON');

    const initialForm = {
        name: '',
        phone: '',
        email: deriveEmailFromToken(),
        message: `I am interested in ${property.location.street}, ${property.location.city}, ${property.location.zipCode}`,
        dateTime: dateTime.toString(),
        visitType: visitType,
        ownerEmail: property.owner.email
    }

    const [formState, setFormState] = useState(initialForm);

    const onInputChanged = (e) => {
        setFormState({...formState,
                            [e.target.name]: e.target.value})
    }

    const handleChange = (event, newVisitType) => {
        setVisitType(newVisitType);
        setFormState({...formState, visitType: newVisitType})
    };

    const onRequestVisitClicked = () => {
        if(!!formState.name && !!formState.phone && !!formState.message) {
            dispatch(requestVisit({...formState}));
            setFormState(initialForm);
            setOpen(false);
        }
    }

    return (

        <>
            <Button size="medium" className='btn-request-tour' variant="contained" onClick={handleOpen}>Request a tour</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <h2 id="child-modal-title">Tour with a Buyer's Agent <Button onClick={handleClose}>Close</Button></h2>
                    <p id="child-modal-description">
                        Go on a personalized tour of this home by connecting with a local buyers' agent who advertises on WAA Property
                    </p>
                    <p>Select an appointment type</p>
                    <div>
                        <ToggleButtonGroup
                            color="primary"
                            value={visitType}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            fullWidth={true}
                        >
                            <ToggleButton value="IN_PERSON">In-person</ToggleButton>
                            <ToggleButton value="VIDEO_CHAT">Video chat</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className='date-time'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Select a date time"
                                value={dateTime}
                                onChange={(newValue) => { setDateTime(newValue) }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='contact-input'><TextField required fullWidth id="outlined-basic" label="Name" name='name' variant="standard" onChange={onInputChanged}/></div>
                    <div className='contact-input'><TextField required fullWidth id="outlined-basic" label="Phone" variant="standard" name='phone' onChange={onInputChanged}/></div>
                    <div className='contact-input'><TextField disabled fullWidth id="outlined-basic" label="Email" variant="standard" value={formState.email}/></div>
                    <div className='contact-input'><TextField
                        fullWidth={true}
                        id="outlined-basic"
                        label="Message"
                        variant="standard"
                        multiline
                        maxRows={4}
                        value={formState.message}
                        name="message"
                        onChange={onInputChanged}
                    /></div>
                    <div>
                        <Button className='btn-request-time' variant='contained' size='large' onClick={onRequestVisitClicked}>Contact</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}