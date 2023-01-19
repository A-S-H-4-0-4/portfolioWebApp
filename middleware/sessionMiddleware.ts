import { IncomingForm } from "formidable";

const form = new IncomingForm();

export default function includeSession(req, res, next) {


  form.parse(req, async (err, fields, files) => {
    if (!err) {
    
    }
    next(); // continues to the next middleware or to the route
  });
}
