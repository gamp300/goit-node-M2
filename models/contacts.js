const Contact = require('./contacts');

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw new Error('Error al listar los contactos');
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error('Error al obtener el contacto por ID');
  }
};

const addContact = async (newContact) => {
  try {
    return await Contact.create(newContact);
  } catch (error) {
    throw new Error('Error al añadir un nuevo contacto');
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    throw new Error('Error al eliminar el contacto');
  }
};

const updateContact = async (contactId, updatedFields) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, updatedFields, {
      new: true,
    });
  } catch (error) {
    throw new Error('Error al actualizar el contacto');
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
