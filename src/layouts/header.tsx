import { NextRouter, useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Context } from "../components/context";
import { URLS } from "../constants/url.constant";
import { ITodo } from "../types/form.type";

interface IProps {}

export const Header: React.FC<IProps> = (): JSX.Element => {
  const [filterdata, setFilteredData] = useState<any>([]);
  const { val } = useContext(Context);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value.toLowerCase();
    if (value) {
      const result = val.filter((data: ITodo) => {
        return data.email.search(value) != -1;
      });
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  };
  const router: NextRouter = useRouter();
  return (
    <div className="flex items-stretch h-[80px] border border-red">
      <div
        className="grow h-14 self-center font-extrabold text-5xl ml-5 cursor-pointer"
        onClick={() => router.push(URLS.HOME)}
      >
        TS
      </div>
      <div className="grow h-14 self-center">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            onChange={(event) => handleSearch(event)}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
        </label>
        {filterdata.length > 0 ? (
          <ul
            className="dropdown-menu min-w-max absolute bg-white text-base z-50 py-2 list-none rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border border-red-300 w-[585px] text-center"
            aria-labelledby="dropdownMenuMediumButton"
          >
            {filterdata.map((data: ITodo) => (
              <li key={data?.id}>
                <a
                  className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  href="#"
                >
                  {data?.email}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="grow h-14 self-center text-end">
        <button
          onClick={() => router.push(URLS.SIGNUP)}
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-blue-600 text-white font-bold min-h-fit m-auto mr-10"
        >
          ADD USER
        </button>
      </div>
    </div>
  );
};
