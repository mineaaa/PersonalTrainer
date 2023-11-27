import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: props.customer?.firstname || '',
        lastname: props.customer?.lastname || '',
        streetaddress: props.customer?.streetaddress || '',
        postcode: props.customer?.postcode || '',
        city: props.customer?.city || '',
        email: props.customer?.email || '',
        phone: props.customer?.phone || ''
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.updateCustomer(customer, props.customer?.links[0].href || '');
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen} variant="text">Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Firstname'
                        value={customer.firstname}
                        name="firstname"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='Lastname'
                        value={customer.lastname}
                        name="lastname"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='Streetaddress'
                        value={customer.streetaddress}
                        name="streetaddress"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='Postcode'
                        value={customer.postcode}
                        name="postcode"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='City'
                        value={customer.city}
                        name="city"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='E-mail'
                        value={customer.email}
                        name="email"
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='Phone'
                        value={customer.phone}
                        name="phone"
                        onChange={handleInputChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
