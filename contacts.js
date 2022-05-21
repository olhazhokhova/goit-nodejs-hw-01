const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => Number(contact.id) === contactId);
  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => Number(contact.id) === contactId
  );
  const newContacts = contacts.filter((_, index) => index !== contactIndex);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  contacts.push({ id: String(contacts.length + 1), name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
