export function ContactList({ contacts, removeContact, filter }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul>
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
