export interface IFormData {

    // MAIN
    name: string,
    preparation_time: string,
    type: string,

    // OPTIONAL
    no_of_slices?: number,
    diameter?: number,
    spiciness_scale?: number,
    slices_of_bread?: number,
}


export type DishTypeType = "pizza" | "soup" | "sandwich" | ""