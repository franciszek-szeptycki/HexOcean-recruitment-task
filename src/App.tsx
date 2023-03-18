import FormContainer from "./components/FormContainer";
import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default () => {


    return (
        <div className="App" >
            <FormContainer />
            <ToastContainer />
        </div>
    )
}