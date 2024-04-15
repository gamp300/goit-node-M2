const fs = require("fs").promises;
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error al listar los contactos");
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    throw new Error("Error al obtener el contacto por ID");
  }
};

const addContact = async (newContact) => {
  try {
    const contacts = await listContacts();
    const id = generateUniqueId(contacts);
    const contactWithId = { id, ...newContact };
    contacts.push(contactWithId);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contactWithId;
  } catch (error) {
    throw new Error("Error al añadir un nuevo contacto");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      return false;
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    throw new Error("Error al eliminar el contacto");
  }
};

const updateContact = async (contactId, updatedFields) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...updatedFields };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw new Error("Error al actualizar el contacto");
  }
};

const generateUniqueId = (contacts) => {
  const ids = contacts.map((c) => c.id);
  let newId;
  do {
    newId = Math.random().toString(36).substring(2, 10);
  } while (ids.includes(newId));
  return newId;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
