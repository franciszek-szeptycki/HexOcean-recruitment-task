import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {DishTypeType, IFormData } from "./assets/types";
import axios from "axios";
import FormContent from "./components/FormContent";
import {Form} from "react-final-form";
import {resFailed, resNetworkError, resSuccess} from "./features/api";

export default () => {

    // HANDLING DISH TYPE VALUE
    const [dishType, setDishType] = useState<DishTypeType>('');

    // HANDLING FORM SUBMIT TIME ( FOR RESETTING FORM )
    const [submitTime, setSubmitTime] = useState(new Date());

    const [disabled, setDisabled] = useState(false);


    // SUBMITTING FORM
    const submitForm = (formData: IFormData) => {

        // BLOCKING FORM
        setDisabled(true)

        // TURNING ON PROCESSING TOAST
        toast("Processing data...", {
            toastId: "processing",
            type: "info",
            autoClose: false,
            isLoading: true
        })

        // SUBMITTING FORM
        axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes', formData)
            // POSITIVE
            .then(() => {
                resSuccess()
                setSubmitTime(new Date())
            })
            // FAILED
            .catch((err: any) => resFailed(err))
            // NETWORK ERROR
            .catch(() => resNetworkError())
            // TURNING OFF PROCESSING TOAST + UNBLOCKING FORM
            .finally(() => {
                toast.dismiss("processing")
                setDisabled(false)
            })
    }

    return (
        <div className="App" >
            {/* NOTIFICATION SYSTEM ( REACT-TOASTIFY ) */}
            <ToastContainer />

            {/* REACT-FINAL-FORM ( REDUX-FORM ) */}
            <Form
                onSubmit={(values: IFormData) => submitForm(values)}
                render={({ handleSubmit, form }) => {

                    // RESETING FORM AFTER SUCCESSFUL SUBMIT
                    useEffect(() => {
                        form.reset()
                    }, [submitTime])

                    return <FormContent handleSubmit={handleSubmit} dishType={dishType}
                            setDishType={setDishType} form={form} disabled={disabled} />
                }
            }/>
        </div>
    )
}