import Link from "next/link";
import React, { useContext, useState } from "react";
import { Context } from "../../components/context";
import { ITodo, TodoContextType } from "../../types/form.type";
import { Loader } from "../../components/loader";
interface IProps {}
const Home: React.FC<IProps> = (): JSX.Element => {
  const { val, setVal } = useContext(Context) as TodoContextType;
  const [toggle, setToggle] = useState<string>("");
  const [toggleval, setToggleval] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  console.log("🚀 ~ file: index.tsx:12 ~ search", search);
  const [currentpage, setcurrentpage] = useState<number>(1);
  const [postperpage] = useState<number>(2);
  const indexoflastpost = currentpage * postperpage;
  const indexoffirstpost = indexoflastpost - postperpage;
  // const currentposts = product.slice(indexoffirstpost, indexoflastpost)
  const totalpost = val.length;
  const toggleDropdown = (id: string) => {
    if (id) {
      setToggle(id);
      setToggleval(!toggleval);
    }
  };

  const handleRemoveUser = (id: string) => {
    const Updateditem = val.filter((element: ITodo) => {
      return id != element._id;
    });
    setVal(Updateditem);
  };
  let sortedCompany = val.sort((a, b) => (a.fullName < b.fullName ? -1 : 1));
  console.log("🚀 ~ file: index.tsx:32 ~ sortedCompany", sortedCompany);

  const pagenumber = [];
  for (let i = 1; i <= Math.ceil(totalpost / postperpage); i++) {
    pagenumber.push({ i });
  }

  const onchangebutton = (type: string) => {
    if (type === "next") {
      if (Math.ceil(totalpost / postperpage) === currentpage) {
        setcurrentpage(currentpage);
      } else {
        setcurrentpage(currentpage + 1);
      }
    } else if (type === "prev") {
      if (currentpage === 1) {
        setcurrentpage(1);
      } else {
        setcurrentpage(currentpage - 1);
      }
    }
  };

  return (
    <div className="p-10 border rounded-lg bg-gray-200 h-[570px]">
      <div className="">
        <div className="mb-2 flex">
          <div className="ml-2">
            <h4 className="text-xl font-bold mb-2">Users</h4>
            <p>
              A list of all the user in your account including their
              name,email,aboutUs,status
            </p>
          </div>
          <div>
            <input
              className="searchbar"
              type="text"
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="table-auto min-w-full text-center border">
        <thead className="border-b  bg-gray-100">
          <tr>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">ID</th>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">
              Name
            </th>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">
              Email
            </th>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">
              About Us
            </th>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">
              Status
            </th>
            <th className="text-lg font-medium text-gray-900 px-6 py-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="border-b">
          {sortedCompany
            .filter((product: ITodo) =>
              product.email.toLowerCase().includes(search)
            )
            .slice(indexoffirstpost, indexoflastpost)
            .map((todo: ITodo, index: number) => {
              return (
                <tr key={todo.id} className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {todo.fullName}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {todo.email}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {todo.aboutUs}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        true === true
                          ? "text-sm font-normal rounded-full bg-[#0080006e] text-gray-900 px-2"
                          : "text-sm font-normal rounded-full bg-[#8000156e] text-gray-900 px-2"
                      }
                    >
                      {todo.acceptTerms === true ? "Active" : "In-Active"}
                    </span>
                  </td>
                  <td className="text-sm px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleDropdown(todo._id)}
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-blue-600 font-bold "
                    >
                      Update List
                    </button>
                    {toggle === todo._id && toggleval ? (
                      <ul
                        className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-right py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none right-44"
                        aria-labelledby="dropdownMenuMediumButton"
                      >
                        <Link href={`signup/${todo._id}`}>
                          <li
                            className=" dropdown-item text-sm py-2 px-4
                          font-normal block w-full whitespace-nowrap
                          bg-transparent text-gray-700 hover:bg-gray-100"
                          >
                            EDIT
                          </li>
                        </Link>
                        <li onClick={() => handleRemoveUser(todo._id)}>
                          <a className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                            Delete
                          </a>
                        </li>
                      </ul>
                    ) : null}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button onClick={() => onchangebutton("prev")}>prev</button>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {pagenumber.map((elem, index: number) => (
            <li
              key={index}
              className={
                currentpage === elem?.i
                  ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white border border-black p-1"
                  : ""
              }
              onClick={() => setcurrentpage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <button onClick={() => onchangebutton("next")}>next</button>
      </div>
    </div>
  );
};
export default Home;
