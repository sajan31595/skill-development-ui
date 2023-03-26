import { useEffect } from "react";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoService from "../../services/TodoService";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todoId: id,
    name: "",
    description: "",
    status: "",
    createdOn: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTodo({ ...todo, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodoService.getTodoById(todo.todoId);
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[todo.id]);

  const updateTodo = (e) => {
    e.preventDefault();
    console.log(todo);
    TodoService.updateTodo(todo, id)
      .then((response) => {
        console.log(response);
        navigate("/todos");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Todo</h1>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={todo.name}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={todo.description}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Status
          </label>
          <input
            type="text"
            name="dept"
            value={todo.status}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Created On
          </label>
          <input
            type="email"
            name="email"
            value={todo.createdOn}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateTodo}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/todos")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
