import * as Yup from "yup";
import checkout from "./form";


const {
  formField: {
   dishName,
   ingredients,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [dishName.name]: Yup.string().required(dishName.errorMsg),
    [ingredients.name]: Yup.string().required(ingredients.errorMsg),
  }),
 
];

export default validations;
