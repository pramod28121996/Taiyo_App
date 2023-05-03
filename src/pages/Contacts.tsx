import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import AddContactModalPopup from "../components/Modals/AddContactModalPopup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  addContact,
  removeContact,
  updateContact,
} from "../redux/actions/actionCreators";
import DeleteContactModalPopup from "../components/Modals/DeleteContactModalPopup";

export type Props = {};

const Contacts: React.FC<Props> = ({}) => {
  //States Declaration
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [isEditRecord, setIsEditRecord] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<IContact | any>();
  const [showDeleteContactModal, setShowDeleteContactModal] =
    useState<boolean>(false);

  //Selectors  
  const contacts: readonly IContact[] = useSelector(
    (state: ContactsState) => state.contacts,
    shallowEqual
  );

  //Dispatchers
  const dispatch: Dispatch<any> = useDispatch();

  //Functions callings
  const saveContact = React.useCallback(
    (contact: IContact) => dispatch(addContact(contact)),
    [dispatch]
  );
  const editContact = React.useCallback(
    (contact: IContact) => dispatch(updateContact(contact)),
    [dispatch]
  );
  const deleteContact = React.useCallback(
    (selectedContact: IContact) => dispatch(removeContact(selectedContact)),
    [dispatch, removeContact]
  );
  const handleDeleteContact = (contact: IContact) => {
    setShowDeleteContactModal(true);
    setSelectedContact(contact);
  };
  const handleEditContact = (contact: IContact) => {
    setShowContactModal(true);
    setSelectedContact(contact);
    setIsEditRecord(true);
  };

  return (
    <>
      <SideBar />
      <div className="w-full p-10">
        <section className="flex justify-between">
          <div className="px-3">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                Contacts
              </span>{" "}
              List
            </h1>
          </div>
          <div>
            <button
              onClick={() => setShowContactModal(true)}
              className="right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Add Contact
            </button>
          </div>
        </section>
        <section className="pt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact: IContact) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-bold">{contact?.id}</td>
                      <td className="px-6 py-4 font-bold">
                        {contact?.firstName}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {contact?.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full uppercase last:mr-0 mr-1 ${
                            contact?.status === "active"
                              ? "text-green-600 bg-green-200"
                              : "text-gray-600 bg-gray-200"
                          }`}
                        >
                          {contact?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact)}
                          className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    <th
                      scope="row"
                      colSpan={4}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Empty Contacts Records
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <AddContactModalPopup
          show={showContactModal}
          handleModal={setShowContactModal}
          saveContact={saveContact}
          editedContact={selectedContact}
          isEditRecord={isEditRecord}
          setIsEditRecord={setIsEditRecord}
          editContact={editContact}
        />
        
        <DeleteContactModalPopup
          show={showDeleteContactModal}
          handleModal={setShowDeleteContactModal}
          deleteContact={deleteContact}
          deletedContact={selectedContact}
        />
      </div>
    </>
  );
};

export default Contacts;
