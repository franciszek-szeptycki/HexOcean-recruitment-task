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
            {dishType === 'pizza' && (
                <>
                    <DetailInputField name="no_of_slices" labelName="Number of Slices"/>
                    <DetailInputField name="diameter" labelName="Diameter" step={0.01} />
                </>
            )}
            {dishType === 'soup' && (
                    <DetailInputField labelName="Spiciness Scale" name="spiciness_scale" max={10} />
            )}

            {dishType === 'sandwich' && (
                <DetailInputField labelName="Slices of Bread" name="slices_of_bread" max={10} />
            )}
        </div>
    )
}

const DetailInputField = ({labelName, name, step = null, max = null}: {labelName: string, name: string, step?: number | null, max?: number | null }) => (
    <div>
        <label>{labelName}:</label>
        <Field name={name} component="input" type="number" step={step}  min={1} max={max} validate={value => !value} />
    </div>
)
