import { useState, useEffect } from "react";
import CustomerGrid from "./customerGrid";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const customer_URL = 'https://traineeapp.azurewebsites.net/api/customers';



    const getCustomers = () => {
        fetch(customer_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData", responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getCustomers();
    }, []);
    return (
        <>
            <h1>🩵 Customers 🩵</h1>

            <CustomerGrid customers={customers} />
        </>
    );
}
