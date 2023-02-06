import { Children } from "react";

export interface ITodo {
  id: string;
  _id: string;
  fullName: string;
  email: string;
  password: string;
  aboutUs: string;
  acceptTerms: boolean;
}
export type TodoContextType = {
  val: ITodo[];
  setVal: any;
  //   saveTodo: (todo: ITodo) => void;
  //   handleRemoveUser: (id: string) => void;
};

export type IProps = {
  children: React.ReactNode;
};
