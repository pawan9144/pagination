import styles from "./form.module.scss";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/input";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../../components/context";
import { useRouter } from "next/router";
import { ITodo } from "../../types/form.type";
import { TbEyeglassOff, TbEyeglass2 } from "react-icons/tb";
import Router from "next/router";
import * as Yup from "yup";
interface IProps {}

const Form: React.FC<IProps> = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<ITodo>();

  const { val, setVal } = useContext(Context);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required")
      .test(
        "Unique Email",
        "Email already in use", // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            const result = val.find((todo: ITodo) => todo.email === value);
            if (result) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        }
      ),
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

  useEffect(() => {
    const result = val.find((element: ITodo) => element._id === id);
    setData(result);
  }, [id]);
  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const addUser = (AllinputData: ITodo) => {
    setVal([...val, AllinputData]);
    Router.push("/");
  };

  const updateUser = (updatedUser: ITodo) => {
    setVal(val.map((user: ITodo) => (user._id === id ? updatedUser : user)));
    Router.push("/");
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
  } = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      fullName: data?.fullName || "",
      email: data?.email || "",
      password: data?.password || "",
      aboutUs: data?.aboutUs || "",
      acceptTerms: data?.acceptTerms || false,
    },
    validationSchema,
    onSubmit: (formValues) => {
      const AllinputData = {
        id: new Date().getTime().toString(),
        _id: uuidv4(),
        fullName: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
        aboutUs: formValues.aboutUs,
        acceptTerms: formValues.acceptTerms,
      };
      data ? updateUser(AllinputData) : addUser(AllinputData);
    },
  });

  // const handleEmailChange = async (e: any) => {
  //   setFieldValue("email", e.target.value, false);
  //   const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   if (emailRegex.test(e.target.value)) {
  //     const result = val.find((todo: ITodo) => todo.email === e.target.value);
  //     console.log({ result });
  //     if (result) {
  //       setErrors({ email: "Email is already taken" });
  //     }
  //   }
  //   console.log("touched", touched.email);
  // };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-[575px]">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="font-extrabold text-5xl h-12 text-blue-600 text-center">
              TS
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 text-blue-600 ">
              SingUp in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address">Full Name</label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="First Name"
                  Autocomplete="off"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  value={values.fullName}
                />
              </div>
              <div className="invalid-feedback">
                {errors.fullName && touched.fullName && (
                  <span className={styles.error}>{errors.fullName}</span>
                )}
              </div>
              <div>
                <label htmlFor="email-address">Email address</label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  Autocomplete="off"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <div className="invalid-feedback">
                {errors.email && touched.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password">Password</label>

                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  Autocomplete="off"
                  className="w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  value={values.password}
                />
                {showPassword ? (
                  <span>
                    <TbEyeglass2
                      className="cursor-pointer w-6 h-6 absolute top-1/2 left-[93%]"
                      onClick={ShowPassword}
                    />
                  </span>
                ) : (
                  <span>
                    <TbEyeglassOff
                      className="cursor-pointer w-6 h-6 absolute top-1/2 left-[93%]"
                      onClick={ShowPassword}
                    />
                  </span>
                )}
              </div>
              <div className="invalid-feedback">
                {errors.password && touched.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>
              <div>
                <label htmlFor="password">About Us</label>
                <Input
                  type="text"
                  id="aboutUs"
                  name="aboutUs"
                  Autocomplete="off"
                  placeholder="Write something here..."
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                  value={values.aboutUs}
                />
              </div>
              <div className="invalid-feedback">
                {errors.aboutUs && touched.aboutUs && (
                  <span className={styles.error}>{errors.aboutUs}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  Autocomplete="off"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={handleChange}
                  value={values.acceptTerms}
                  checked={values.acceptTerms}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="invalid-feedback">
                {errors.acceptTerms && touched.acceptTerms && (
                  <span className={styles.error}>{errors.acceptTerms}</span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Form;
