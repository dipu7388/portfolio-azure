import { HttpRequest } from "@azure/functions";

export function ResumeController(Resume) {
  async function post(req: HttpRequest) {
    const resume = new Resume(req.body);
    return resume.save();
  }
  function get(req: HttpRequest) {
    const query = Object.create({});
    if (req.query.email) {
      query.email = req.query.email;
    }
    return Resume.findOne(query);
  }
  return { post, get };
}
