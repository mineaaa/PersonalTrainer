import React, { useRef, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingGrid(props) {
    const gridRef = useRef();

    const columns = [
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Duration",
            field: "duration",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Activity",
            field: "activity",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Firstname",
            field: "customer.firstname",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Lastname",
            field: "customer.lastname",
            sortable: true,
            filter: true,
            floatingFilter: true,
        }
    ];



    return (
        <div className="ag-theme-material" style={{ height: '700px', width: '95%', margin: 'auto' }}>
            <AgGridReact
                rowData={props.trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                rowSelection="single"
                onGridReady={params => gridRef.current = params.api}
            />

        </div>
    );
}
