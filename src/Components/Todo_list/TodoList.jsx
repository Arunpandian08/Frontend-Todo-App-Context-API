import React, { useEffect, useState } from 'react';
import './todoList.css';
import Loader from '../Utility/Loader/Loader';
import { useTodoContext } from '../../Context/ContextProvider';

const TodoList = () => {

    const { todos, handleStatusUpdate, handleDelete, setFilterType, filterType } = useTodoContext()
    const [loading, setLoading] = useState(false);

    const handleStatusUpdateAndFetch = async (_id) => {
        try {
            setLoading(true);
            await handleStatusUpdate(_id);
            setLoading(false);
        } catch (error) {
            console.error("Error updating status", error);
            setLoading(false);
        }
    };


    const handleDeleteAndFetch = async (_id) => {
        try {
            setLoading(true);
            await handleDelete(_id);
            setLoading(false);
        } catch (error) {
            console.error("Error deleting todo", error);
            setLoading(false);
        }
    };


    //Filter todo's based on the filterType
    const filteredTodos = todos.data && todos.data.filter(item => {
        if (filterType === 'all') {
            return true;
        } else {
            return item.status === filterType;
        }
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    return (
        <div className="list_container">
            <nav className='navbar animate__animated animate__fadeIn p-2 mt-5'>
                <div className="backdrop-text">Status:</div>
                <div className="filters">
                    <span>
                        <button className="a-button" onClick={() => setFilterType('all')}>
                            <span className="a-button_lg">
                                <span className="a-button_sl"></span>
                                <span className="a-button_text">All</span>
                            </span>
                        </button>

                    </span>
                    <span>
                        <button className="p-button" onClick={() => setFilterType('pending')}>
                            <span className="p-button_lg">
                                <span className="p-button_sl"></span>
                                <span className="p-button_text">Pending..</span>
                            </span>
                        </button>
                    </span>
                    <span>
                        <button className="c-button" onClick={() => setFilterType('completed')}>
                            <span className="c-button_lg">
                                <span className="c-button_sl"></span>
                                <span className="c-button_text">Completed</span>
                            </span>
                        </button>
                    </span>
                </div>
            </nav>
            {loading ? (<Loader />) : (
                <div className="container">
                    <div className="row">
                        {filteredTodos && filteredTodos.map((item, index) => {
                            //Format the date before displaying
                            const formattedDate = formatDate(item.date)
                            return (
                                <div className="col cards animate__animated animate__zoomInDown" key={index}>
                                    <div className="three-d-card">
                                        <div className="card-wrapper">
                                            <div className="card-face front">
                                                <div className="card-content">
                                                    <div className="card-title">{item.title}</div>
                                                    <div className="card-date">{formattedDate}</div>
                                                    <div className={`card-status ${item.status === 'completed' ? 'completed' : 'pending'}`}>{item.status}</div>
                                                </div>
                                            </div>
                                            <div className="card-face back">
                                                <div className="card-content">
                                                    <div className="card-title">{item.title}</div>
                                                    <div className="card-description">{item.description}</div>
                                                </div>
                                                <div className="card-footer">
                                                    <button type="button" className={`complete ${item.status === 'completed' ? 'disabled' : ''}`}
                                                        onClick={() => handleStatusUpdateAndFetch(item._id)}
                                                        disabled={item.status === 'completed'}>
                                                        Completed
                                                    </button>

                                                    <button className="delete" type="button" onClick={() => handleDeleteAndFetch(item._id)} >
                                                        <span className="text">Delete</span>
                                                        <span className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
