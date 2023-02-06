import React from "react";

type IType = "text" | "number" | "email" | "file" | "checkbox" | "password";
interface IProps {
  id: string;
  name: string;
  type: IType;
  Autocomplete?: string;
  value: any;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: <T>(event: React.ChangeEvent<T>) => void;
  onClick?: <T>(event: React.MouseEvent<T>) => void;
  onBlur?: <T>(event: React.ChangeEvent<T>) => void;
  checked?: boolean;
}

export const Input: React.FC<IProps> = ({
  id,
  name,
  type = "text",
  onChange,
  onClick,
  onBlur,
  value = "",
  placeholder = "",
  checked,
  className,
  Autocomplete,
  ...rest
}) => {
  return (
    <>
      <input
        autoComplete={Autocomplete}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        value={value}
        checked={checked}
        {...rest}
      />
    </>
  );
};
