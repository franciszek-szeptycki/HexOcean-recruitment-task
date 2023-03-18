import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Form, Field, useForm} from 'react-final-form';
import {DishTypeType, IFormData} from "../assets/types";
import DetailsForm from "./DetailsForm";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";


export default () => {

    const [dishType, setDishType] = useState<DishTypeType>('');
    const [updatedTime, setUpdatedTime] = useState(new Date());

    const submitForm = (formData: IFormData) => {

        toast("Processing data...", {toastId: "processing", type: "info", autoClose: false, isLoading: true})

        axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes', formData)
            .then(() => {
                toast("Data processed successfully!", {toastId: "success", type: "success"})
                setUpdatedTime(new Date())
            }).catch((err: any) => {
                toast.dismiss("processing")

                for (const prop in err.response.data) {
                    const propToName: any = { "name": "Name", "preparation_time": "Preparation time", "type": "Type", "no_of_slices": "Number of slices", "diameter": "Diameter", "spiciness_scale": "Spiciness scale", "slices_of_bread": "Slices of bread"}
                    toast(`${propToName[prop]} ${err.response.data[prop][0]}`, {toastId: prop, type: "error"})
                }
            }).catch(() => toast("Server error, try again later...", {toastId: "server-error", type: "error"}))
            .finally(() => toast.dismiss("processing"))
    }


    return (
        <Form
            onSubmit={(values: IFormData) => submitForm(values)}
            subscription={{ submitting: true }}
            render={({ handleSubmit, form, submitting }) => (
                <form data-testid="form" className="form main-form" onSubmit={handleSubmit}>
                    <h1 className="form__title" >Create an <span>order</span>.</h1>

                    <div className="form__item" >
                        <label className="form__item-label" >Name:</label>
                        <Field name="name" component="input" type="text" placeholder="What's the name of your dish?" className="form__item-input" />
                    </div>

                    <div className="form__item" >
                        <label className="form__item-label" >Preparation time:</label>
                        <Field name="preparation_time" component="input" type="time"  step={1} className="form__item-input" />
                    </div>

                    <div className="form__item" >
                        <label className="form__item-label" >Type:</label>
                        <Field name="type" component="select" className="form__item-input" validate={value => setDishType(value)} >
                            <option value="" >---</option>
                            <option value="pizza" >Pizza</option>
                            <option value="soup" >Soup</option>
                            <option value="sandwich" >Sandwich</option>
                        </Field>
                    </div>

                    <DetailsForm dishType={dishType} form={form} updatedTime={updatedTime}/>

                    <button type="submit" disabled={submitting} className="form__submit" >Submit</button>
                </form>
            )}
        />
    );
};
