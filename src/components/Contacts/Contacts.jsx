import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { ContactList } from 'components/ContactList/ContactList';
import { FilterContacts } from 'components/Filter/Filter';

export function Contacts() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const addContact = e => {
    e.preventDefault();

    const newContact = { id: nanoid(), name, number };

    // Перевірка на унікальність доданого контакту
    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (existingContact) {
      Notify.failure('This contact is already exist');
      setName('');
      setNumber('');
      return;
    }
    // якщо унікальний за своїми даними, додаємо його до масиву контактів.
    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onSearchContact = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <>
      <form onSubmit={addContact}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleNameChange}
          value={name}
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleNumberChange}
          value={number}
          required
        />
        <button type="submit">Add contact</button>
      </form>
      <ContactList
        contacts={contacts}
        removeContact={removeContact}
        filter={filter}
      />
      <FilterContacts filter={filter} onSearchContact={onSearchContact} />
    </>
  );
}
