import {Field} from "react-final-form";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {DishTypeType} from "../assets/types";

// WHAT'S NAME OF YOUR DISH?
export const DishInput = () => (
    <div className="form__item">
        <label className="form__item-label">Name:</label>
        <Field name="name" component="input" type="text" placeholder="What's the name of your dish?"
               className="form__item-input"/>
    </div>
)

// PREPARATION TIME?
export const DateInput = () => (
    <div className="form__item">
        <label className="form__item-label">Preparation time:</label>
        <Field name="preparation_time" component="input" type="time" step={1}
               className="form__item-input"/>
    </div>
)


export const SelectDishInput = ({setDishType}: {setDishType: Dispatch<SetStateAction<DishTypeType>>}) => (
    <div className="form__item">
        <label className="form__item-label">Type:</label>
        <Field name="type" component="select" className="form__item-input"
               validate={value => setDishType(value)}>
            <option value="">---</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
        </Field>
    </div>
)


export const DetailsInputWrapper = ({dishType}: {dishType: DishTypeType}) => (
    <div className="details-wrapper">
        <DetailInputField name="no_of_slices" labelName="Number of slices" selected={dishType === "pizza"} placeholder="How many pizza slices?" />
        <DetailInputField name="diameter" labelName="Diameter" step={0.01} selected={dishType === "pizza"} placeholder="What pizza size (diameter)?" />
        <DetailInputField name="spiciness_scale" labelName="Spiciness scale" step={1} max={10} selected={dishType === "soup"} placeholder="What spiciness level (1-10)" />
        <DetailInputField name="slices_of_bread" labelName="Slices of bread" selected={dishType === "sandwich"} placeholder="How many bread slices?" />
    </div>
)


const DetailInputField = ({labelName, name, step = null, max = null, selected, placeholder}: {labelName: string, name: string, step?: number | null, max?: number | null, selected: boolean, placeholder: string}) => (
    <div className={`form__item ${selected ? "" : "form__item-hidden"}`} >
        <label className="form__item-label" >{labelName}:</label>
        <Field name={name} component="input" type="number" step={step}  min={1} max={max}
               className="form__item-input" placeholder={placeholder} />
    </div>
)
