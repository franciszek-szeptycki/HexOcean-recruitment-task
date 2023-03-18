import {Field} from "react-final-form";
import React, {useEffect} from "react";
import {DishTypeType} from "../assets/types";

export default ({dishType, form, updatedTime}: {dishType: DishTypeType, form: any, updatedTime: Date}) => {

    const {values} = form.getState()

    useEffect(() => {
        const baseValues = ['name', 'preparation_time', 'type']
        for (let key in values) {
            if (!baseValues.includes(key)) form.change(key, undefined)
        }
    }, [dishType])

    useEffect(() => {
        form.reset()
    }, [updatedTime])


    return (
        <div className="details-wrapper">
            <DetailInputField name="no_of_slices" labelName="Number of slices" selected={dishType === "pizza"} placeholder="How many pizza slices?" />
            <DetailInputField name="diameter" labelName="Diameter" step={0.01} selected={dishType === "pizza"} placeholder="What pizza size (diameter)?" />
            <DetailInputField name="spiciness_scale" labelName="Spiciness scale" step={1} max={10} selected={dishType === "soup"} placeholder="What spiciness level (1-10)" />
            <DetailInputField name="slices_of_bread" labelName="Slices of bread" selected={dishType === "sandwich"} placeholder="How many bread slices?" />
        </div>
    )
}

const DetailInputField = ({labelName, name, step = null, max = null, selected, placeholder}: {labelName: string, name: string, step?: number | null, max?: number | null, selected: boolean, placeholder: string}) => (
    <div className={`form__item ${selected ? "" : "form__item-hidden"}`} >
        <label className="form__item-label" >{labelName}:</label>
        <Field name={name} component="input" type="number" step={step}  min={1} max={max}
               className="form__item-input" placeholder={placeholder} />
    </div>
)
