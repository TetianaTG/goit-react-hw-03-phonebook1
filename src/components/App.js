import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import TabletShape from './TabletShape/TabletShape';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  hasContact = name => {
    const { contacts } = this.state;
    return contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
  };

  addToContacts = ({ name, number }) => {
    const isAlreadyinContacts = this.hasContact(name);

    if (isAlreadyinContacts) {
      // eslint-disable-next-line no-alert
      alert(`Already in contacts ${name}`);
    } else {
      const contact = {
        name,
        number,
        id: uuidv4(),
      };
      this.setState(state => {
        return { contacts: [...state.contacts, contact] };
      });
    }
  };

  removeContact = id => {
    this.setState(state => {
      const contacts = state.contacts.filter(contact => contact.id !== id);
      const filter = contacts.length > 1 ? state.filter : '';
      return { contacts, filter };
    });
  };

  hanleFilterChange = e => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  applyFilter() {
    const { contacts, filter } = this.state;

    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  render() {
    const { contacts } = this.state;

    const filteredContacts = this.applyFilter();

    return (
      <TabletShape>
        <ContactForm title="Phonebook" onAddContact={this.addToContacts} />
        {contacts.length > 1 && (
          <Filter hanleFilterChange={this.hanleFilterChange} />
        )}
        <ContactList
          contacts={filteredContacts}
          onRemoveContact={this.removeContact}
        />
      </TabletShape>
    );
  }
}
