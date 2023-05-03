interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

type ContactsState = {
  contacts: IContact[];
};

type ContactAction = {
  type: string;
  contact: IContact;
};

type DispatchType = (args: ContactAction) => ContactAction;
