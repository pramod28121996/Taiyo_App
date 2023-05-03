import React, { useEffect, useState } from "react";

export type Props = {
  show: boolean;
  handleModal: (show: boolean) => void;
  saveContact: (Contact: IContact | any) => void;
  editContact: (Contact: IContact | any) => void;
  editedContact: IContact;
  isEditRecord: boolean;
  setIsEditRecord: (state: boolean) => void;
};

const AddContactModalPopup: React.FC<Props> = ({
  show,
  handleModal,
  saveContact,
  editedContact,
  isEditRecord,
  setIsEditRecord,
  editContact,
}) => {

  //State Declaration 
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);
  const [formData, setFormData] = useState<IContact | any>({
    firstName: "",
    lastName: "",
    status: "",
  });

  //Functions to handle events
  const handleSubmitForm = () => {
    if (
      formData?.firstName === "" ||
      formData?.lastName === "" ||
      formData?.status === "" ||
      formData === undefined
    )
      setIsFormSubmit(true);
    else {
      saveContact(formData);
      handleModal(false);
      setIsFormSubmit(false);
    }
  };
  const handleEditSubmitForm = () => {
    if (
      formData?.firstName === "" ||
      formData?.lastName === "" ||
      formData?.status === "" ||
      formData === undefined
    )
      setIsFormSubmit(true);
    else {
      editContact(formData);
      handleModal(false);
      setIsFormSubmit(false);
      setFormData({
        firstName: "",
        lastName: "",
        status: "",
      });
      setIsEditRecord(false);
    }
  };
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {    
    const { name, value, id } = e.currentTarget;
    if (name === "status") setFormData({ ...formData, [name]: id });
    else setFormData({ ...formData, [name]: value });
  };

  //Effects Declaration
  useEffect(() => {
    if (isEditRecord) setFormData(editedContact);
  }, [isEditRecord]);

  return (
    <div
      className={show ? "relative z-10" : "relative z-10 hidden"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="w-full">
              <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    First Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                      formData?.firstName === "" && isFormSubmit
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formData?.firstName}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {/* {formData?.firstName === "" && isFormSubmit && ( */}
                  {isFormSubmit && formData?.firstName === "" && (
                    <p className="text-red-500 text-xs italic">
                      Please Enter First Name
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                      formData?.lastName === "" && isFormSubmit
                        ? "border-red-500"
                        : ""
                    }`}
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData?.lastName}
                    placeholder="Last Name"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {/* {formData?.lastName === "" && isFormSubmit && ( */}
                  {isFormSubmit && formData?.lastName === "" && (
                    <p className="text-red-500 text-xs italic">
                      Please Enter Last Name
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Status
                  </label>
                  <div className="flex gap-10">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="active"
                        data-ripple-dark="true"
                      >
                        <input
                          id="active"
                          name="status"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                          onChange={(e) => handleOnChange(e)}
                          checked={formData?.status === "active" ? true : false}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none font-light text-gray-700"
                        htmlFor="active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="inactive"
                        data-ripple-dark="true"
                      >
                        <input
                          id="inactive"
                          name="status"
                          type="radio"
                          checked={
                            formData?.status === "inactive" ? true : false
                          }
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                          onChange={(e) => handleOnChange(e)}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px cursor-pointer select-none font-light text-gray-700"
                        htmlFor="inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                  {/* {formData?.status === "" && isFormSubmit && ( */}
                  {isFormSubmit && formData?.status === "" && (
                    <p className="text-red-500 text-xs italic">
                      Please Select Status
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  {!isEditRecord ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSubmitForm}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleEditSubmitForm}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    type="button"
                    onClick={() => {
                      setIsFormSubmit(false);
                      handleModal(false);
                      setIsEditRecord(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        status: "",
                      });
                      setIsEditRecord(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModalPopup;
