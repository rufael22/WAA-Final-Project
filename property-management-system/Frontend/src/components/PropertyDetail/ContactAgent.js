import { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { style } from './ModalStyle'
import { useDispatch } from "react-redux";
import { contact } from "../../services/PropertyService";
import { deriveEmailFromToken } from "../../Utils";

export default function ContactAgent(props) {

    const { property } = props;

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const initialForm = {
        name: '',
        phone: '',
        email: deriveEmailFromToken(),
        message: `I am interested in ${property.location.street}, ${property.location.city}, ${property.location.zipCode}`,
        ownerEmail: property.owner.email
    }

    const [formState, setFormState] = useState(initialForm);

    const onInputChanged = (e) => {
        setFormState({...formState,
            [e.target.name]: e.target.value})
    }

    const onContactClicked = () => {
        if(!!formState.name && !!formState.phone && !!formState.message) {
            dispatch(contact({...formState}));
            setFormState(initialForm);
            setOpen(false);
        }
    }

    return (

        <>
            <Button size="medium" className='btn-contact-agent' variant="contained" onClick={handleOpen}>Contact Agent</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <h2 id="child-modal-title">Contact Agent <Button onClick={handleClose}>Close</Button></h2>

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
                        <Button className='btn-request-time' variant='contained' size='large' onClick={onContactClicked}>Contact Agent</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}