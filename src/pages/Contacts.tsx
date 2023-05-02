import React from "react";
import SideBar from "../components/Sidebar";

export type Props = {};

const Contacts: React.FC<Props> = ({}) => {
  return (
    <>
      <SideBar />
      <div className="grid grid-cols-1 gap-3 w-1/2 mx-auto h-1/2">
        <div className="text-4xl pt-10">This is contacts page</div>
      </div>
    </>
  );
};

export default Contacts;
