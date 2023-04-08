import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Courses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', headerName: 'Course Name'},
    {field: 'description', headerName: 'Description'},
    {field: 'type', headerName: 'Type'},
    {field: 'start_date', headerName: 'Start Date'},
    {field: 'members', headerName: 'Members', filter: false, sortable: false, cellRenderer: params => {
      // put the value in bold
      return (
        <i class="bx bx-group" style={{fontSize: '1.2rem',cursor: 'pointer', color: 'rgb(102, 178, 255)'}} id="members"></i>
      );
  }},
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
      navigate(`/editCourse/${clickEvent.data.id}`);
    } else if (clickEvent.event.target.id === 'delete') {
      deleteCourse(clickEvent.data.id);
    } else if (clickEvent.event.target.id === 'members') {
      const memberModalBody = document.querySelector('#members-modal-body');
      memberModalBody.innerHTML = displayMembers(clickEvent.data.members || []);
      $('#myModal').modal({
        show: true
      });
    }
  }, []);

  const displayMembers = (showMembersList) => {
    let innerHtml = ``;
    showMembersList.forEach(member => {
      innerHtml += `<div>${member}</div>`;
    });
    return innerHtml;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourses();
      setCourses(response.data);
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
    CourseService.deleteCourse(id).then((res) => {
      fetchData();
    });
  };

  return (
    <div className="container mx-auto my-8" style={{padding: '3%'}}>
      <div className="course">
        <button
          onClick={() => navigate("/addCourse")}
          className="btn btn-secondary"
        >
          Add Course
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

export default Courses;
