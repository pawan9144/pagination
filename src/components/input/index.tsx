import React from "react";

type IType = "text" | "number" | "email" | "file" | "checkbox" | "password";
interface IProps {
  id: string;
  name: string;
  type: IType;
  value: any;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: <T>(event: React.ChangeEvent<T>) => void;
  onClick?: <T>(event: React.MouseEvent<T>) => void;
}

export const Input: React.FC<IProps> = ({
  id,
  name,
  type = "text",
  onChange,
  onClick,
  value = "",
  placeholder = "",
  className,
  ...rest
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        onClick={onClick}
        value={value}
        {...rest}
      />
    </>
  );
};
