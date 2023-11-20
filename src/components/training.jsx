import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import TrainingGrid from "./trainingGrid";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    const trainingURL = `https://traineeapp.azurewebsites.net/gettrainings`;

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

    return (
        <>
            <h1> 🤍 🏋️‍♀️Trainings 🏋️‍♀️🤍</h1>
            <TrainingGrid trainings={trainings} />
        </>
    );
}
