import { Dialog, DialogContent, TextField, Button, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">New Customer</Button>

            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Firstname'
                        value={customer.firstname}
                        name="firstname"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='Lastname'
                        value={customer.lastname}
                        name="lastname"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='Streetaddress'
                        value={customer.streetaddress}
                        name="streetaddress"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='Postcode'
                        value={customer.postcode}
                        name="postcode"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='City'
                        value={customer.city}
                        name="city"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='E-mail'
                        value={customer.email}
                        name="email"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='Phone'
                        value={customer.phone}
                        name="phone"
                        onChange={handleInputChanged}
                    ></TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </>
    )

}