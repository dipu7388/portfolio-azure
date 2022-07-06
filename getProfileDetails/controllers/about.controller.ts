import { HttpRequest } from "@azure/functions";
import { interpolateString } from "../util/helper";

export function AboutController(About) {
  async function post(req: HttpRequest) {
    const about = new About(req.body);
    return about.save();
  }
  async function get(req: HttpRequest) {
    const query = Object.create({});
    if (req.query.email) {
      query.email = req.query.email;
    }
    return About.findOne(query).then((aboutDoc: typeof About) => {
      if (aboutDoc.workStarted) {
        const workStartDate: number = new Date(aboutDoc.workStarted).getTime();
        const today: number = new Date().getTime();
        let timeDiff = today - workStartDate;
        const year = timeDiff / (365 * 24 * 3600 * 1000);
        aboutDoc.desc = interpolateString(aboutDoc.desc, {
          yearOfExp: Math.floor(year),
        });
      }
      return aboutDoc;
    });
  }
  return { post, get };
}
