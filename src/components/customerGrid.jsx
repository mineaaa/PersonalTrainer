import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import EditCustomer from "./editCustomer";

export default function customerGrid(props) {

    const gridRef = useRef();
    const columns = [
        {
            headerName: 'Firstname',
            field: 'firstname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Lastname',
            field: 'lastname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Address',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'E-mail',
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => props.deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        },
        {
            cellRenderer: params =>
                <EditCustomer params={params.data} updateCustomer={props.updateCustomer} />
            , width: 120
        }
    ];

    return (
        <>

            <div className="ag-theme-material"
                style={{ height: '700px', width: '95%', margin: 'auto' }} >

                <AgGridReact

                    rowData={props.customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    rowSelection="single"
                    onGridReady={params => gridRef.current = params.api}
                >


                </AgGridReact>
            </div>

        </>
    )

}