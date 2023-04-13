import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommonService from "../../services/CommonService";

const Events = () => {
  const isAdmin = CommonService.isAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setEvents] = useState(null);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState(isAdmin ? [
    {field: 'eventName', headerName: 'Event Name'},
    {field: 'eventType', headerName: 'Type'},
    {field: 'eventDescription', headerName: 'Description'},
    {field: 'eventDate', headerName: 'Event Date'},
    {field: 'courseName', headerName: 'Course Name'},
    {field: 'action', headerName: 'Action', filter: false, sortable: false, cellRenderer: params => {
      // put the value in bold
      return (
        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <div style={{cursor: 'pointer', color: 'rgb(102, 178, 255)'}} id="edit">Edit</div>
          <div style={{cursor: 'pointer', color: 'rgb(102, 178, 255)'}} id="delete">Delete</div>
        </div>
      );
  }}
  ]: [
    {field: 'eventName', headerName: 'Event Name'},
    {field: 'eventType', headerName: 'Type'},
    {field: 'eventDescription', headerName: 'Description'},
    {field: 'eventDate', headerName: 'Event Date'},
    {field: 'courseName', headerName: 'Course Name'}
  ]);
  const defaultColDef = useMemo( ()=> ({
    sortable: true, filter: true, autoHeight: true, resizable: true
  }));
  const cellClickedListener = useCallback( clickEvent => {
    console.log('cellClicked', clickEvent);
    if (clickEvent.event.target.id === 'edit') {
      navigate(`/editEvent/${clickEvent.data.eventId}`);
    } else if (clickEvent.event.target.id === 'delete') {
      deleteCourse(clickEvent.data.eventId);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await EventService.getEvents(isAdmin);
      setEvents(response.data);
      gridRef.current.api.sizeColumnsToFit();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteCourse = (id) => {
    EventService.deleteEvent(id).then((res) => {
      fetchData();
    });
  };

  return (
    <div className="container mx-auto my-8" style={{padding: '3%'}}>
      <div className="event" style={{display: isAdmin ? 'block' : 'none'}}>
        <button
          onClick={() => navigate("/addEvent")}
          className="btn btn-secondary"
        >
          Add Event
        </button>
      </div>
      <div className="usertable ag-theme-alpine" style={{width: '74vw', height: '85vh', marginTop: '1%'}}>
      <AgGridReact
           ref={gridRef}
           rowData={courses}
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Enrolled Users</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="members-modal-body" style={{maxHeight: '50vh',overflow: 'auto'}}></div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Events;
