import {toast} from "react-toastify";
import {Dispatch, SetStateAction} from "react";

export const resSuccess = (setUpdatedTime: Dispatch<SetStateAction<Date>>) => {
    toast("Data processed successfully!", {toastId: "success", type: "success"})
    setUpdatedTime(new Date())
}

export const resServerError = () => {
    toast("Server error, try again later...", {toastId: "server-error", type: "error"})
}

export const resFailed = (err: any) => {
    toast.dismiss("processing")

    for (const prop in err.response.data) {
        const propToName: any = {
            "name": "Name",
            "preparation_time": "Preparation time",
            "type": "Type",
            "no_of_slices": "Number of slices",
            "diameter": "Diameter",
            "spiciness_scale": "Spiciness scale",
            "slices_of_bread": "Slices of bread"
        }
        toast(`${propToName[prop]} ${err.response.data[prop][0]}`, {toastId: prop, type: "error"})
    }
}