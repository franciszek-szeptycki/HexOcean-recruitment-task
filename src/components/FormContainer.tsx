import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Form, Field, useForm} from 'react-final-form';
import {DishTypeType, IFormData} from "../assets/types";
import DetailsForm from "./DetailsForm";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";


export default () => {

    const [dishType, setDishType] = useState<DishTypeType>('');

    const submitForm = (formData: IFormData) => {

        toast("Processing data...", {toastId: "processing", type: "info"})

        axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes', formData)
            .then((res: AxiosResponse<any>) => {
                toast.dismiss("processing")
                toast("Data processed successfully!", {toastId: "success", type: "success"})
            }).catch((err: any) => {
                toast.dismiss("processing")

                for (const prop in err.response.data) {
                    toast(`${prop} ${err.response.data[prop][0]}`, {toastId: prop, type: "error"})
                }
        })
        }


    return (
        <Form
            onSubmit={(values: IFormData) => submitForm(values)}
            subscription={{ submitting: true }}
            render={({ handleSubmit, form, submitting }) => (
                <form data-testid="form" className="form main-form" onSubmit={handleSubmit}>
                    <h1 className="form__title" >Create an order</h1>
                    <div className="form__item" >
                        <label className="form__item-label" >Dish Name:</label>
                        <Field name="name" component="input" type="text" placeholder="Enter dish name" className="form__item-input" />
                    </div>

                    <div className="form__item" >
                        <label className="form__item-label" >Preparation Time:</label>
                        <Field name="preparation_time" component="input" type="time" defaultValue="00:00:00" step={1} className="form__item-input" />
                    </div>

                    <div className="form__item" >
                        <label className="form__item-label" >Dish Type</label>
                        <Field name="type" component="select" className="form__item-input" validate={(value) => {
                            setDishType(value)
                            return !value
                        }} >
                            <option value="" >---</option>
                            <option value="pizza" >Pizza</option>
                            <option value="soup" >Soup</option>
                            <option value="sandwich" >Sandwich</option>
                        </Field>
                    </div>

                    <DetailsForm dishType={dishType} form={form} />

                    <button type="submit" disabled={submitting} className="form__submit" >Submit</button>
                </form>
            )}
        />
    );
};
