import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Field} from 'react-final-form';
import {DishTypeType, IFormData} from "../assets/types";
import {DateInput, DetailsInputWrapper, DishInput, SelectDishInput} from "./FormItems";


export default ({dishType, updatedTime, handleSubmit, setDishType, form}: {form: any, dishType: DishTypeType, updatedTime: Date, handleSubmit: any, setDishType: Dispatch<SetStateAction<DishTypeType>>}) => {

    useEffect(() => {
        const {values} = form.getState()
        const baseProps = ['name', 'preparation_time', 'type']
        for (const key in values) {
            // @ts-ignore
            if (!baseProps.includes(key)) form.change(key, undefined)
        }
    }, [dishType])

    useEffect(() => {
        form.reset()
    }, [updatedTime])

    return (
        <form data-testid="form" className="form main-form" onSubmit={handleSubmit}>
            <h1 className="form__title">Create an <span>order</span>.</h1>
            <DishInput/>
            <DateInput/>
            <SelectDishInput setDishType={setDishType} />
            <DetailsInputWrapper dishType={dishType} />
            <button type="submit" disabled={false} className="form__submit">Submit</button>
        </form>
    )
};
