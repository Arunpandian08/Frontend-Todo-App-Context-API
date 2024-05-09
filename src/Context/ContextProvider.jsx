import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);


const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState([])
    const [filterType, setFilterType] = useState('all')

    useEffect(() => {
        fetchTodos()
        // Fetch todos when the component mounts
        fetchFilteredTodos(filterType);
    }, [filterType]);

const baseURL = `https://backend-todo-app-context-api.onrender.com/api/user/get-todo`
const updateURL = `https://backend-todo-app-context-api.onrender.com/api/user/status`
const deleteURL =`https://backend-todo-app-context-api.onrender.com/api/user/delete-todo`
const formSubmitURL =`https://backend-todo-app-context-api.onrender.com/api/user/add-todo`

    const fetchFilteredTodos = async () => {
        try {
            setLoading(true)
            // Simulate a delay to show the loading spinner
            await new Promise(resolve => setTimeout(resolve, 1000));
            let url = baseURL;
            // Modify the URL based on the filter type
            if (filterType === 'pending') {
                url += '?status=pending';
            } else if (filterType === 'completed') {
                url += '?status=completed';
            }

            const response = await axios.get(url);
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos", error);
        } finally {
            setLoading(false)
        }
    };

    const fetchTodos = async()=>{
        try {
            const response = await axios.get(`${baseURL}`)
            setTodos(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatusUpdate = async (_id) => {
        try {
            const response = await axios.put(`${updateURL}/${_id}`, { status: 'completed' });
            const updatedTodo = response.data.data;
            console.log("response:", response.data);
            setTodos(prevTodo => {
                if (Array.isArray(prevTodo)) { // Check if prevTodo is an array
                    return prevTodo.map(item => {
                        if (item._id === _id) {
                            return updatedTodo;
                        }
                        return item;
                    });
                } else {
                    return []; // Initialize with an empty array if prevTodo is not an array
                }
            });
            // Fetch all todos again after updating the status
            fetchTodos();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    const handleDelete = async (_id) => {
        try {
            // Send DELETE request to the backend API to delete the todo item
            await axios.delete(`${deleteURL}/${_id}`);

            // Update the todo state by filtering out the deleted item
            setTodos(prevTodo => Array.isArray(prevTodo) ? prevTodo.filter(item => item._id !== _id) : []);
            // Fetch all todos again after deleted the card
            fetchTodos();
        } catch (error) {
            // Log and throw any errors that occur during the deletion process
            console.error(error);
            throw error;
        }
    }


    return (
        <TodoContext.Provider value={{ loading, todos, fetchTodos,fetchFilteredTodos, handleStatusUpdate, handleDelete, setFilterType, filterType,formSubmitURL }}>
            {children}
        </TodoContext.Provider>
    );
};

export default ContextProvider;