const { Contact } = require('./schemas/contact');

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return Contact.deleteOne({ _id: contactId });
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
