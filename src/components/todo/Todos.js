import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TodoService from "../../services/TodoService";
import Todo from "./Todo";
import 'bootstrap/dist/css/bootstrap.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Todos = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'todoName'},
    {field: 'description'},
    {field: 'status'},
    {field: 'createdOn'},
    {field: 'modifiedOn'},
    {field: 'action', headerName: 'Action', filter: false, sortable: false, cellRenderer: params => {
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
      navigate(`/editTodo/${clickEvent.data.todoId}`);
    } else if (clickEvent.event.target.id === 'delete') {
      deleteTodo(clickEvent.data.todoId);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await TodoService.getTodos();
      setTodos(response.data);
      gridRef.current.api.sizeColumnsToFit();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTodo = (id) => {
    TodoService.deleteTodo(id).then((res) => {
      fetchData();
    });
  };

  return (
    <div className="container mx-auto my-8" style={{padding: '3% 0 0 2%'}}>
      <div>
        <button
          onClick={() => navigate("/addTodo")}
          className="btn btn-secondary"
        >
          Add Todo
        </button>
      </div>
      <div className="usertable ag-theme-alpine" style={{width: '76vw', height: '85vh', marginTop: '1%'}}>
      <AgGridReact
           ref={gridRef}
           rowData={todos}
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

export default Todos;
