const fs = require('fs/promises')
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  const contact = data.find(contact => contact.id === contactId)
  return contact || null
}

const removeContact = async (contactId) => {
  const data = await listContacts()
  const index = data.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    return null
  }
    const [result] = data.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return result
}

const addContact = async (body) => {
  const data = await listContacts()
    data.push(body)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return body
}

const updateContact = async (contactId, body) => {
  const data = await listContacts()
  const index = data.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    return null
  }
  data[index]= {contactId, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
  return data[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
