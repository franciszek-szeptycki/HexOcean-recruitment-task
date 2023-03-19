import React, { useEffect } from 'react';
import { DishTypeType } from "../assets/types";
import { DurationField, DetailedFieldsWrapper, DishField, SelectDishField } from "./FormItems";


export default ({dishType, handleSubmit, setDishType, form, disabled}: {dishType: DishTypeType, handleSubmit: any, setDishType: any, form: any, disabled: boolean}) => {

    // RESETING DETAILED INPUTS ON CHANGING DISH TYPE
    useEffect(() => {
        const {values} = form.getState()
        const baseProps = ['name', 'preparation_time', 'type']
        for (const key in values) {
            if (!baseProps.includes(key)) form.change(key, undefined)
        }
    }, [dishType])

    return (
        <form data-testid="form" className="form" onSubmit={handleSubmit}>
            <h1 className="form__title">Create an <span>order</span>.</h1>
            <DishField/>
            <DurationField/>
            <SelectDishField setDishType={setDishType} />
            <DetailedFieldsWrapper dishType={dishType} />
            <button type="submit" disabled={disabled} style={{cursor: disabled ? "wait" : "pointer"}} className="form__submit">Submit</button>
        </form>
    )
};
