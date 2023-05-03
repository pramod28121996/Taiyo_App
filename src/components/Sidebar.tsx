import React from "react";
import { Link } from "react-router-dom";

export type Props = {};

const SideBar: React.FC<Props> = ({}) => {
  return (
    <div className="w-1/5 bg-slate-200 h-full p-4 hidden md:flex flex-col text-center">
      <div className="px-4">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/4333/4333609.png"}
          className="h-auto max-w-full rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
          alt="Dev Foo"
        />
      </div>
      <div className="justify-stretch py-5 grid grid-cols-1 gap-3">
        <Link to={"/"}>
          <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
            Dashboard
          </div>
        </Link>
        <Link to={"/contacts"}>
          <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
            Contacts
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
