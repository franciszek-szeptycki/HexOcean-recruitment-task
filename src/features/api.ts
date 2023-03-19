import {toast} from "react-toastify";


// SERVER RESPONSE - SUCCESS
export const resSuccess = () => {

    // SETTING UP SUCCESS MESSAGE
    toast("Data processed successfully!", {type: "success", autoClose: 3000})
}


// SERVER RESPONSE - NETWORK ERROR
export const resNetworkError = (() => {

    // SETTING UP NETWORK ERROR MESSAGE
    toast("Network error, try again later...", {type: "error", autoClose: 2000})
})


// SERVER RESPONSE - FAILED
export const resFailed = (err: any) => {

    // GENERATING ERROR MESSAGE FOR EVERY INVALID FIELD
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

        // SETTING UP ERROR MESSAGE
        toast(`${propToName[prop]} ${err.response.data[prop][0]}`, {type: "error", autoClose: 2000})
    }
}