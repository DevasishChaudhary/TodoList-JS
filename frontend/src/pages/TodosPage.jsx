import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../services/todo.service';

const TodosPage = () => {
    const {user, logout}= useAuth();

    const [todos, setTodos]= useState([]);
    const [title, setTitle]= useState("");
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState("");
    const [editId, setEditId]= useState(null);
    const [editTitle, setEditTitle]= useState("");

    useEffect(()=>{
        fetchTodos();
    },[]);

    const fetchTodos= async ()=>{
        try {
            const response= await getTodos();
            setTodos(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch todos");
        }
    }

    const handleCreate= async () =>{
        if(!title.trim()) return; 

        try {
            setLoading(true);
            const response= await createTodo({title});
            setTodos([...todos, response.data]);
            setTitle("");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create Todo");
        } finally{
            setLoading(false);
        }
    }

    const handleToggle = async (todo) =>{
        try {
            const response= await updateTodo( todo._id, {completed: !todo.completed});
            setTodos(
                todos.map((t)=>(t._id===todo._id ? response.data : t))
            );
        } catch (error) {
            setError(error.response?.data?.message || "failed to update todo");
        }
    }

    const handleUpdate= async (todo) =>{
        try {
            const response= await updateTodo( todo._id, {title: editTitle});
            setTodos(
                todos.map((t)=>(t._id===todo._id ? response.data : t))
            );
        } catch (error) {
            setError(error.response?.data?.message || "failed to update todo");
        }
    }

    const handleDelete= async (id) =>{
        try {
            await deleteTodo(id);
        setTodos(todos.filter( t._id !== id));
        } catch (error) {
             setError(error.response?.data?.message || "failed to delete todo");
        }

    }



  return (
    <div>
        //Header
        <div>
            <h1>Welcome {user?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>

        //Error
        {error && <p>{error}</p>}

        //Create Todo
        <div>
            <input 
            type="title"
            placeholder='Title'
            value={title}
            onChange={(e)=> setTitle(e.target.value)} />

            <button onClick={handleCreate} disabled={loading}>{loading ? "ADDING..." : "ADD"}</button>
        </div>

        //TODO LIST
        <div>
            <ul>
                {todos.map((todo)=>(
                    <li key={todo._id}>

                        {editId === todo._id ? (
                            <div>
                                <input 
                                type="text"
                                value={editTitle}
                                onChange={(e)=> setEditTitle(e.target.target.value)}
                                 />

                                 <button onClick={()=>handleUpdate(todo)}>Save</button>
                                 <button onClick={()=> setEditId(null)}></button>
                            </div>

                        ): (
                            <div>
                                <span onClick={()=>handleToggle(todo)}>{todo.title}</span>

                            </div>
                        )}

                        //Edit + Delete
                        {editId !== todo._id && (
                            <div>
                                <button 
                                onClick={()=>{
                                    setEditId(todo._id)
                                    setEditTitle(todo.title);
                                }}>
                                    Edit
                                </button>

                                <button onClick={()=> handleDelete(todo._id)}>Delete</button>
                            </div>
                        )}

                    </li>
                ))}
            </ul>
        </div>

        
        

    </div>
  )
}

export default TodosPage