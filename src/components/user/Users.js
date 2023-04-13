import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import User from "./User";
import 'bootstrap/dist/css/bootstrap.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommonService from "../../services/CommonService";

const Users = () => {
  const navigate = useNavigate();
  const isAdmin = CommonService.isAdmin();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'username'},
    {field: 'age'},
    {field: 'phoneNumber'},
    {field: 'birthDate'},
    {field: 'sex'},
    {field: 'email'},
    {field: 'action', headerName: 'Action', filter: false, sortable: false, cellRenderer: params => {
      // put the value in bold
      return (
        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <div style={{cursor: 'pointer', color: 'rgb(102, 178, 255)'}} id="edit">Edit</div>
          <div style={{cursor: 'pointer', color: 'rgb(102, 178, 255)'}} id="delete">Delete</div>
        </div>
      );
  }}
  ]);
  const defaultColDef = useMemo( ()=> ({
    sortable: true, filter: true, autoHeight: true, resizable: true
  }));
  const cellClickedListener = useCallback( clickEvent => {
    console.log('cellClicked', clickEvent);
    if (clickEvent.event.target.id === 'edit') {
      navigate(`/editUser/${clickEvent.data.id}`);
    } else if (clickEvent.event.target.id === 'delete') {
      deleteUser(clickEvent.data.id);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
      gridRef.current.api.sizeColumnsToFit();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (id) => {
    UserService.deleteUser(id).then((res) => {
      fetchData();
    });
  };

  return (
    <div className="container mx-auto my-8" style={{padding: '3% 0 0 2%'}}>
      <div style={{display: isAdmin ? 'block' : 'none'}}>
        <button
          onClick={() => navigate("/addUser")}
          className="btn btn-secondary"
        >
          Add User
        </button>
      </div>
      <div className="usertable ag-theme-alpine" style={{width: '76vw', height: '85vh', marginTop: '1%'}}>
        <AgGridReact
           ref={gridRef}
           rowData={users}
           pagination={true}
           paginationAutoPageSize={true}
           columnDefs={columnDefs}
           defaultColDef={defaultColDef}
           enableCellTextSelection={true}
           animateRows={true}
           ensureDomOrder={true}
           suppressCellFocus={true}
           onCellClicked={cellClickedListener}
           />
      </div>
    </div>
  );
};

export default Users;
