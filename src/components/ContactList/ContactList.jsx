import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export function ContactList({ contacts, removeContact, filter }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul className={css.contactsList}>
        {filteredContacts.map(contact => {
          return (
            <li key={contact.id}>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
              <button type="button" onClick={() => removeContact(contact.id)}>
                Remove contact
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),

  removeContact: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
