import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import TrainingGrid from "./trainingGrid";
import AddTraining from "./addTraining";
import dayjs from "dayjs"


export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [message, setMessage] = useState('');
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const customersURL = 'https://traineeapp.azurewebsites.net/getcustomers';

    const trainingURL = `https://traineeapp.azurewebsites.net/gettrainings`;
    const add_trainingURL = `https://traineeapp.azurewebsites.net/api/trainings`;


    const formatDate = (dateString) => format(new Date(dateString), "dd.MM.yyyy HH:mm");

    const getTrainings = () => {
        fetch(trainingURL)
            .then(response => response.json())
            .then(responseData => {
                const transformedTrainings = responseData.map(training => ({
                    ...training,
                    date: formatDate(training.date),
                }));
                setTrainings(transformedTrainings);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getTrainings();
    }, []);

    useEffect(() => {
        fetch(customersURL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData);
            })
            .catch(error => console.error(error));
    }, []);


    const addTraining = (training) => {
        fetch(add_trainingURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: dayjs(training.date).toISOString(),
                activity: training.activity,
                duration: training.duration,
                customer: `https://traineeapp.azurewebsites.net/api/customers/${training.customer}`,
            }),
        })
            .then(response => {
                if (response.ok) {
                    getTrainings();
                } else {
                    alert('Adding a training failed');
                }
            })
            .catch(err => console.log(err));
    };

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`,
                { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMessage('Training was deleted succesfully');
                        setOpen(true);
                        getTrainings();
                    }
                    else {
                        alert('Something went wrong!');
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }

    }

    return (
        <>
            <h1> 🤍 🏋️‍♀️Trainings 🏋️‍♀️🤍</h1>
            <AddTraining addTraining={addTraining} customers={customers} />
            <TrainingGrid trainings={trainings} deleteTraining={deleteTraining} />



        </>
    );
}
