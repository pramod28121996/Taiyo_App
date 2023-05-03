import { EDIT_CONTACTS, REMOVE_CONTACTS } from "../types/actionTypes";
import { ADD_CONTACTS } from "../types/actionTypes";

export function addContact(contact: IContact) {
  const action: ContactAction = {
    type: ADD_CONTACTS,
    contact,
  };
  return simulateHttpRequest(action);
}

export function updateContact(contact: IContact) {
  const action: ContactAction = {
    type: EDIT_CONTACTS,
    contact,
  };
  return simulateHttpRequest(action);
}

export function removeContact(contact: IContact) {
  const action: ContactAction = {
    type: REMOVE_CONTACTS,
    contact,
  };
  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ContactAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
