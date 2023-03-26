import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoService from "../../services/TodoService";
import Todo from "./Todo";

const Todos = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await TodoService.getTodos();
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteTodo = (e, id) => {
    e.preventDefault();
    TodoService.deleteTodo(id).then((res) => {
      if (todos) {
        setTodos((prevElement) => {
          return prevElement.filter((todo) => todo.todoId !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addTodo")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add Todo
        </button>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-300">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Description
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Status
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Created on
              </th>
            </tr>
          </thead>

          {!loading && (
            <tbody className="bg-white">
              {todos.map((todo) => (
                <Todo
                  todo={todo}
                  deleteTodo={deleteTodo}
                  key={todo.todoId}
                ></Todo>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Todos;
