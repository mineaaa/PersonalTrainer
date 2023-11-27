import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    DialogTitle,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format, parse } from "date-fns";

export default function AddTraining(props) {
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: '',
    });

    const [open, setOpen] = useState(false);


    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };

    const handleDateChange = (newDate) => {
        setTraining({ ...training, date: newDate })
    };

    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    const handleSave = async () => {
        props.addTraining(training);
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">
                New Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>

                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            format="DD.MM.YYYY HH:mm"
                            value={training.date}
                            name="date"
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                    <br />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        name="duration"
                        onChange={handleInputChanged}
                    />
                    <br />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        name="activity"
                        onChange={handleInputChanged}
                    />
                    <br />
                    <TextField
                        margin="dense"
                        select
                        label="Customer"
                        value={training.customer}
                        name="customer"
                        onChange={handleInputChanged}
                        sx={{ width: '220px' }}
                    >
                        {props.customers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {`${customer.firstname} ${customer.lastname}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
