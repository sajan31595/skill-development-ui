import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CommonService from "../../services/CommonService";

const Courses = () => {
  const isAdmin = CommonService.isAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  const [enrolledUser, setEnrolledUser] = useState(null);
  const gridRef = useRef();
  const memberGridRef = useRef();
  const [columnDefs, setColumnDefs] = useState(isAdmin ? [
    {field: 'courseName', headerName: 'Course Name'},
    {field: 'description', headerName: 'Description'},
    {field: 'type', headerName: 'Type'},
    {field: 'start_date', headerName: 'Start Date'},
    {field: 'group_link', headerName: 'Group link'},
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
  ] : [{field: 'courseName', headerName: 'Course Name'},
  {field: 'description', headerName: 'Description'},
  {field: 'type', headerName: 'Type'},
  {field: 'start_date', headerName: 'Start Date'},
  {field: 'group_link', headerName: 'Group link'}]);
  const [memberColumnDefs, setMemberColumnDefs] = useState([
    {field: 'enrolled', headerName: 'Enrolled', headerCheckboxSelection: true,
    checkboxSelection: true, filter: false, sortable: false,
    cellRenderer: param => {return ``;},showDisabledCheckboxes: true,
    cellStyle: params => {
      return params.data.enrolled ? {'pointer-events': 'none', opacity: '0.4' }
        : '';
    }},
    {field: 'userName', headerName: 'User'},
    {field: 'email', headerName: 'Email'},
  ]);
  const defaultColDef = useMemo( ()=> ({
    sortable: true, filter: true, autoHeight: true, resizable: true, flex: 1, minWidth: 100,
  }));
  const cellClickedListener = useCallback( clickEvent => {
    console.log('cellClicked', clickEvent);
    if (clickEvent.event.target.id === 'edit') {
      navigate(`/editCourse/${clickEvent.data.id}`);
    } else if (clickEvent.event.target.id === 'delete') {
      deleteCourse(clickEvent.data.id);
    } else if (clickEvent.event.target.id === 'members') {
      CourseService.getEnrolledUsers(clickEvent.data.id).then((res) => {
        setEnrolledUser(res.data);
        memberGridRef.current.api.forEachNode((node) =>
          node.setSelected(!!node.data && node.data.enrolled)
        );
        const courseTitle = document.querySelector('#courseTitle');
        courseTitle.setAttribute('couser-id', clickEvent.data.id);
        courseTitle.innerHTML = clickEvent.data.courseName;
        $('#myModal').modal({
          show: true
        });
      });
    }
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    memberGridRef.current.api.forEachNode((node) =>
      node.setSelected(!!node.data && node.data.enrolled)
    );
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourses(isAdmin);
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

  const enrollUsers = () => {
    const selectedData = memberGridRef.current.api.getSelectedNodes();
    console.log(selectedData);
    let userIds = [];
    selectedData.forEach(row => {
      userIds.push(row.data.userId);
      enrolledUser.forEach(user => {
        if (user.userId === row.data.userId) {
          user.enrolled = true;
        }
      });
    });
    const params = {
      courseId: document.querySelector('#courseTitle').getAttribute('couser-id'),
      userIds: userIds

    };
    CourseService.addUserToCourse(params).then((res) => {
      setEnrolledUser(enrolledUser);
      // memberGridRef.current.api.destroy();
      $('#myModal').modal('hide');
    });
  };

  return (
    <div className="container mx-auto my-8" style={{padding: '3%'}}>
      <div className="course" style={{display: isAdmin ? 'block' : 'none'}}>
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
        <h5 class="modal-title" id="courseTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body ag-theme-alpine" id="members-modal-body" style={{width: '35vw',overflow: 'auto', height: '50vh'}}>
      <AgGridReact
    ref={memberGridRef}
    rowData={enrolledUser}
    pagination={true}
    paginationAutoPageSize={true}
    columnDefs={memberColumnDefs}
    defaultColDef={defaultColDef}
    enableCellTextSelection={true}
    animateRows={true}
    ensureDomOrder={true}
    rowSelection={'multiple'}
    suppressRowClickSelection={true}
    onFirstDataRendered={onFirstDataRendered}
    />
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button" class="btn btn-primary" onClick={enrollUsers}>Enroll</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Courses;
