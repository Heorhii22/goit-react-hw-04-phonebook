export function FilterContacts({ filter, onSearchContact }) {
  return (
    <>
      <input
        type="text"
        name="search"
        value={filter}
        onChange={onSearchContact}
      />
    </>
  );
}
