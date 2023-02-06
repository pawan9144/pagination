import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Fullname is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  aboutUs: Yup.string()
    .required("About Us is required")
    .min(6, "About Us must be at least 6 characters")
    .max(100, "About Us must not exceed 20 characters"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});
