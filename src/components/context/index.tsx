import React, { createContext, useState } from "react";
import { IProps, ITodo, TodoContextType } from "../../types/form.type";

export const Context = createContext<any | null>(null);

export const ContextProvider: React.FC<IProps> = ({ children }) => {
  const [val, setVal] = useState<ITodo[]>([
    {
      aboutUs: "asdhasdasdahskdhasdkjshjkadas",
      acceptTerms: true,
      email: "asim@gmail.com",
      fullName: "asim",
      id: "1675680059015",
      password: "1234567",
      _id: "729df833-52bb-4281-94d9-131238e60844",
    },
    {
      aboutUs: "werewrewrwrewrewr",
      acceptTerms: true,
      email: "azman@gmail.com",
      fullName: "azman",
      id: "1675680126321",
      password: "1214564",
      _id: "46450af6-0f83-4ba8-a97a-38b9bbfd6e13",
    },
    {
      aboutUs: "asdsadasdsdadasdhkjhkjhhkjhkjuyu",
      acceptTerms: true,
      email: "pawan@gmail.com",
      fullName: "pawan",
      id: "1675680099127",
      password: "132456",
      _id: "9c30e6ad-de16-422c-ae63-366b329e3d8b",
    },
  ]);

  return (
    <Context.Provider value={{ val, setVal }}>{children}</Context.Provider>
  );
};
