import React from "react";
import { useNavigate } from "react-router-dom";

const Todo = ({ todo, deleteTodo }) => {
const navigate = useNavigate();

const editTodo = (e, todoId) => {
e.preventDefault();
navigate(`/editTodo/${todoId}`);
};

return (
<tr key={todo.todoId}>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{todo.name}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{todo.description}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{todo.status}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{todo.createdOn}</div>
              </td>

              <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                            <button
                            type="button"
                            className="link-button text-sm text-indigo-500 hover:text-indigo-900 hover:cursor-pointer"
                            onClick={(e, id) => editTodo(e, todo.todoId)}
                            >
                            Edit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                            type="button"
                            className="link-button text-sm text-indigo-500 hover:text-indigo-900 hover:cursor-pointer"
                            onClick={(e, id) => deleteTodo(e, todo.todoId)}
                            >
                            Delete
                            </button>
              </td>

</tr>
);
};

export default Todo;
