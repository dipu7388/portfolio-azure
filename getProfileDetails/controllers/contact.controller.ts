import { HttpRequest } from "@azure/functions";
import { Error } from "mongoose";
import { interpolateString } from "../util/helper";

export function ContactController(Contact) {
  async function post(req: HttpRequest) {
    const contact = new Contact(req.body);
    return contact.save();
  }
  function get(req: HttpRequest) {
    const query = Object.create({});
    if (req.query.email) {
      query.email = req.query.email;
    }
    return Contact.findOne(query).then((contactDoc: typeof Contact) => {
      contactDoc.copyright = interpolateString(contactDoc.copyright, {
        year: new Date().getFullYear(),
      });
      return contactDoc;
    });
  }
  return { post, get };
}
