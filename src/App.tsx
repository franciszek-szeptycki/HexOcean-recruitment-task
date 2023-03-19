import FormContainer from "./components/OrderForm";
import React, {useRef, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {DishTypeType, IFormData} from "./assets/types";
import axios from "axios";
import OrderForm from "./components/OrderForm";
import {Form} from "react-final-form";
import {resFailed, resServerError, resSuccess} from "./features/api";

export default () => {

    const [dishType, setDishType] = useState<DishTypeType>('');
    const [updatedTime, setUpdatedTime] = useState(new Date());

    const submitForm = (formData: IFormData) => {

        // TURN ON PROCESSING TOAST
        toast("Processing data...", {
            toastId: "processing",
            type: "info",
            autoClose: false,
            isLoading: true
        })

        axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes', formData)
            // POSITIVE
            .then(() => resSuccess(setUpdatedTime))
            // NEGATIVE
            .catch((err: any) => resFailed(err))
            // SERVER ERROR
            .catch(() => resServerError())
            // TURN OFF PROCESSING TOAST
            .finally(() => toast.dismiss("processing"))
    }

    return (
        <div className="App" >
            <Form
                onSubmit={(values: IFormData) => submitForm(values)}
                subscription={{ submitting: true }}
                render={({ handleSubmit, form, submitting }) => <OrderForm
                    handleSubmit={handleSubmit} updatedTime={updatedTime} dishType={dishType}
                    setDishType={setDishType} form={form} /> }/>
            <ToastContainer />
        </div>
    )
}