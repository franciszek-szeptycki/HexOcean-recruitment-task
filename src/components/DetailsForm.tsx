import {Field} from "react-final-form";
import React, {useEffect} from "react";
import {DishTypeType} from "../assets/types";

export default ({dishType, form}: {dishType: DishTypeType, form: any}) => {

    useEffect(() => {
        const {values} = form.getState()
        const baseValues = ['name', 'preparation_time', 'type']
        for (let key in values) {
            if (!baseValues.includes(key)) form.change(key, undefined)
        }
    }, [dishType])


    return (
        <div>
            <DetailInputField name="no_of_slices" labelName="Number of Slices" selected={dishType === "pizza"} />
            <DetailInputField name="diameter" labelName="Diameter" step={0.01} selected={dishType === "pizza"} />
            <DetailInputField labelName="Spiciness Scale" name="spiciness_scale" max={10} selected={dishType === "soup"} />
            <DetailInputField labelName="Slices of Bread" name="slices_of_bread" max={10} selected={dishType === "sandwich"} />
        </div>
    )
}

const DetailInputField = ({labelName, name, step = null, max = null, selected}: {labelName: string, name: string, step?: number | null, max?: number | null, selected: boolean}) => (
    <div style={{display: selected ? "block" : "none"}} >
        <label>{labelName}:</label>
        <Field name={name} component="input" type="number" step={step}  min={1} max={max} validate={value => selected ? !value : false} />
    </div>
)
