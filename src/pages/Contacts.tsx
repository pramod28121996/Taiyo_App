import React from "react";
import SideBar from "../components/Sidebar";

export type Props = {};

const Contacts: React.FC<Props> = ({}) => {
  return (
    <>
      <SideBar />
      <div className="w-full p-10">
        <section>
          <div className="px-3">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                World Wide
              </span>{" "}
              Covid Cases
            </h1>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contacts;
