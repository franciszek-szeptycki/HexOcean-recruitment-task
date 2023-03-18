import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Form, Field, useForm} from 'react-final-form';
import {DishTypeType, IFormData} from "../assets/types";
import DetailsForm from "./DetailsForm";
import {compileString} from "sass";


export default () => {

    const [dishType, setDishType] = useState<DishTypeType>('');

    const submitForm = (formData: IFormData) => {

        console.log(formData);

    }


    return (
        <Form
            onSubmit={(values: IFormData) => submitForm(values)}
            render={({ handleSubmit, form }) => (
                <form data-testid="form" onSubmit={handleSubmit}>
                    <div>
                        <label>Dish Name:</label>
                        <Field name="name" component="input" type="text" placeholder="Enter dish name" validate={value => !value} />
                    </div>

                    <div>
                        <label>Preparation Time:</label>
                        <Field name="preparation_time" component="input" type="time" defaultValue="00:00:00" step={1} validate={value => !value} />
                    </div>

                    <div >
                        <label>Dish Type</label>
                        <Field name="type" component="select" validate={(value) => {
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

                    <button type="submit">Submit</button>
                </form>
            )}
        />
    );
};
