import React, { useState } from 'react';
import './todoForm.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Flip, toast } from 'react-toastify';
import { useTodoContext } from '../../Context/ContextProvider';


const TodoForm = () => {

    const { fetchTodos,formSubmitURL } = useTodoContext()

    const [description,setDescription] = useState('')
    const maxLength = 500;

    const initialValues = {
        title: '',
        date: new Date(),
        description: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required"),
        date: Yup.string().required("Date is Required"),
        description: Yup.string().required("Need To Fill Description Message")
    });

    const handleInputChange = (e, setFieldTouched, setFieldValue) => {
        const { name, value } = e.target;
        const inputText = value.slice(0, maxLength);
        setFieldTouched(name, true);
        setFieldValue(name, inputText);
        setDescription(inputText); 
    };
    

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${formSubmitURL}`, values);
            if (response.status === 200 || response.status === 201) {
                toast.success("Todo Added Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                });
                resetForm();
                fetchTodos();
            } else {
                throw new Error("Failed to add todo");
            }
        } catch (error) {
            console.error("Error Submitting Form", error);
            toast.error("Failed to add todo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className='form_container'>
            <header className='header'>
                <h4 className='title d-flex animate__animated animate__bounceInUp'>Todo List</h4>
            </header>
            <div className="container">
                <div className="row form_row">
                    <div className="col-6 img_col">
                        <img className='todo_img animate__animated animate__backInDown' style={{ width: '90%', maxWidth: '100%', height: '400px', margin: '0', padding: '0' }} src="/image.png" alt="todo_profile" />
                    </div>
                    <div className="col-6">
                        <div className="todo_form">
                            <div className="c-card animate__animated animate__backInDown">
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ isSubmitting, touched, errors, setFieldTouched, setFieldValue }) => (
                                        <Form className="row form">
                                            <div className='mb-1'>
                                                <label htmlFor="title" className="form-label">
                                                    Title
                                                    {touched.title && errors.title && <sup style={{ color: 'red' }}>*</sup>}
                                                    {touched.title && !errors.title && <sup style={{ color: 'green' }}>*</sup>}
                                                </label>
                                                <Field type="text" className="form-control" id="title" name="title" placeholder="Please Enter Todo Title here.."
                                                    onChange={(e) => handleInputChange(e, setFieldTouched, setFieldValue)} />
                                                <ErrorMessage name="title" component="div" className="error-message text-danger" />
                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor="date" className="form-label date mb-2">
                                                    Date
                                                    {touched.date && errors.date && <sup style={{ color: 'red' }}>*</sup>}
                                                    {touched.date && !errors.date && <sup style={{ color: 'green' }}>*</sup>}
                                                </label>
                                                <Field type='date'
                                                    className="form-control"
                                                    id="date"
                                                    name="date"
                                                    onChange={(e) => handleInputChange(e, setFieldTouched, setFieldValue)} />
                                                <div>
                                                </div>
                                                <ErrorMessage name="date" component="div" className="error-message text-danger" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="message" className="form-label">
                                                    Description
                                                    {touched.description && errors.description && <sup style={{ color: 'red' }}>*</sup>}
                                                    {touched.description && !errors.description && <sup style={{ color: 'green' }}>*</sup>}
                                                </label>
                                                <Field as="textarea" className="form-control" id="description" name="description" placeholder='Text..' rows="3"
                                                    onChange={(e) => handleInputChange(e, setFieldTouched, setFieldValue)} />
                                                    <p className="description_length">{description.length}/{maxLength}</p>
                                                <ErrorMessage name="description" component="div" className="error-message text-danger" />

                                            </div>
                                            <div className="col-12 button_container">
                                                <button className='Todo_button' data-toggle="modal" data-target="#exampleModalCenter" type='submit' disabled={isSubmitting}>
                                                    <div className="svg-wrapper-1">
                                                        <div className="svg-wrapper">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="30"
                                                                height="30"
                                                                className="icon"
                                                            >
                                                                <path
                                                                    d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span>Add Todo</span>
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoForm;
