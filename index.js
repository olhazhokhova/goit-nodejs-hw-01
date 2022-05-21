const argv = require("yargs").argv;
const operations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await operations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await operations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      await operations.addContact(name, email, phone);
      break;

    case "remove":
      await operations.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
