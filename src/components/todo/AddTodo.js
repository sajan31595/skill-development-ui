import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoService from "../../services/TodoService";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    todoName: "",
    // status: "",
    description: "",
    // createdOn: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'todoName') {
      if (value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
      }
    }
    setTodo({ ...todo, [e.target.name]: value });
  };

  const saveTodo = (e) => {
    e.preventDefault();
    if (todo.todoName) {
      TodoService.saveTodo(todo)
      .then((response) => {
        console.log(response);
        navigate("/todo");
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert("Please enter valid details!!!");
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setTodo({
      name: "",
      description: "",
      // createdOn: "",
      // status: ""
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b" style={{padding: '3%'}}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add Todo</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            Name *
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="todoName"
            value={todo.todoName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600  col-sm-2 text-sm font-normal">
            Description
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="description"
            value={todo.description}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>      

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveTodo}
            className="btn-secondary btn  text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="btn-secondary btn  text-white font-semibold  cancel bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
