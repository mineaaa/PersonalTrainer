import { useState, useEffect } from "react";
import CustomerGrid from "./customerGrid";
import AddCustomer from "./addCustomer";
import { CSVLink } from "react-csv";
import { Snackbar } from "@mui/material";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

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

    const addCustomer = (customer) => {
        fetch(customer_URL,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)

            })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setMessage("Client was added");
                    setOpen(true);
                }
                else {
                    alert("Couldn't add a customer")
                }
            })
            .catch(err => console.log(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            console.log("params: ", params.data.links[0].href)
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMessage('Customer was deleted succesfully');
                        setOpen(true);
                        getCustomers();
                    } else {
                        alert('Something went wrong!');
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setMessage("Client's information was updated");
                    setOpen(true);
                } else {
                    console.log(JSON.stringify(customer));
                    alert("Customer's information could not be edited");
                }
            })
            .catch(error => console.log(error));
    };

    const csvData = customers.map(customer => ({
        FirstName: customer.firstname,
        LastName: customer.lastname,
        Address: customer.streetaddress,
        Postcode: customer.postcode,
        City: customer.city,
        Email: customer.email,
        Phone: customer.phone
    }));

    return (
        <>

            <h1>👥🩵 Customers 🩵👥</h1>
            <AddCustomer addCustomer={addCustomer} />
            <CSVLink data={csvData} filename={"customerlist.csv"} separator={";"}>Download CSV file</CSVLink>
            <CustomerGrid customers={customers} deleteCustomer={deleteCustomer} updateCustomer={updateCustomer} />

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            ></Snackbar>
        </>
    );
}
