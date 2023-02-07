import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = name => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contact list`);
      return;
    }
  };

  const addContact = ({ name, number }) => {
    isDuplicate(name);

    setContacts(prevContacts => {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      return [contact, ...prevContacts];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </>
  );
};

export default App;
/*
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  formSubmitHandler = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contact list`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </>
    );
  }
}

export default App;
*/
