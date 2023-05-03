import {
  ADD_CONTACTS,
  EDIT_CONTACTS,
  REMOVE_CONTACTS,
} from "../types/actionTypes";

const initialState: ContactsState = {
  contacts: [
    {
      id: Math.floor(Math.random() * 100000000000), // not really unique
      firstName: "Dev",
      lastName: "Foo",
      status: "active",
    },
    {
      id: Math.floor(Math.random() * 100000000000), // not really unique
      firstName: "Dev",
      lastName: "Foo",
      status: "inactive",
    },
  ],
};
const reducer = (
  state: ContactsState = initialState,
  action: ContactAction
): ContactsState => {
  switch (action.type) {
    case ADD_CONTACTS:
      const newContact: IContact = {
        id: Math.floor(Math.random() * 100000000000), // not really unique
        firstName: action.contact.firstName,
        lastName: action.contact.lastName,
        status: action.contact.status,
      };
      return {
        ...state,
        contacts: state.contacts.concat(newContact),
      };
    case EDIT_CONTACTS:
      const updatedContacts: IContact[] = state.contacts.map((contact) => {
        if (contact.id === action.contact.id) return action.contact;
        return contact;
      });
      return {
        ...state,
        contacts: updatedContacts,
      };
    case REMOVE_CONTACTS:
      const removeContacts: IContact[] = state.contacts.filter(
        (contact) => contact.id !== action.contact.id
      );
      return {
        ...state,
        contacts: removeContacts,
      };
  }
  return state;
};

export default reducer;
