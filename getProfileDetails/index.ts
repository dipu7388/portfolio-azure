import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import mongoose from "mongoose";
import { AboutController } from "./controllers/about.controller";
import { ContactController } from "./controllers/contact.controller";
import { ResumeController } from "./controllers/resume.controller";
import { About } from "./models/about";
import { Contact } from "./models/contact.model";
import { Resume } from "./models/resume.model";
import { setReply } from "./util/helper";
let dbConnected: boolean = false;
const dbConnecttion = () => {
  return new Promise(async (resolve, reject) => {
    if (!dbConnected) {
      const url = process.env["MONGODB_URI"]; //"https://" + "dheerendra" + ".vault.azure.net";
      await mongoose.connect(url);
      dbConnected = true;
      resolve(true);
    } else resolve(true);
  });
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    console.log("httptrigger started");
    await dbConnecttion();
    console.log("connection successful");
    if (req.method === "GET") {
      switch (req.query.controller) {
        case "about":
          {
            const abountRes = await AboutController(About).get(req);
            context.res = setReply(abountRes);
          }
          break;
        case "contact":
          {
            const contactRes = await ContactController(Contact).get(req);
            context.res = setReply(contactRes);
          }
          break;
        case "resume":
          {
            const resumeRes = await ResumeController(Resume).get(req);
            context.res = setReply(resumeRes);
          }
          break;
        default:
          context.res = setReply(null);
          break;
      }
    } else if (req.method === "POST") {
      switch (req.query.controller) {
        case "about":
          {
            const abountRes = await AboutController(About).post(req);
            context.res = setReply(abountRes);
          }
          break;
        case "contact":
          {
            const contactRes = await ContactController(Contact).post(req);
            context.res = setReply(contactRes);
          }
          break;
        case "resume":
          {
            const resumeRes = await ResumeController(Resume).post(req);
            context.res = setReply(resumeRes);
          }
          break;
        default:
          context.res = setReply(null);
          break;
      }
    }
  } catch (err) {
    console.log("error", err);

    context.res = {
      status: 500,
      error: true,
      // status: 200, /* Defaults to 200 */
      body: err,
    };
  }
};

export default httpTrigger;
