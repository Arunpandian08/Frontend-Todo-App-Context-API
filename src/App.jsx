import React from 'react';
import TodoForm from './Components/Todo_form/TodoForm';
import TodoList from './Components/Todo_list/TodoList';
import BackgroundAnimation from './Components/Utility/Animation/BackgroundAnimation';
import Loader from './Components/Utility/Loader/Loader';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTodoContext } from './Context/ContextProvider';


const App = () => {
  const { loading } = useTodoContext()
  return (
    <div className='app scroll-container'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <BackgroundAnimation />
          <div className="main-container">
            <TodoForm />
            <TodoList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default App;