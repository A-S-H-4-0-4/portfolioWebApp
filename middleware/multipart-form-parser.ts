import { IncomingForm } from "formidable";

const form = new IncomingForm()

export default function parseMultipartForm(req, res, next) {
  // const  contentType = req.headers['content-type']
console.log("running middleware"); 

  form.parse(req, (err, fields, files) => {
    if (!err) {

      req.body = fields; // sets the body field in the request object
      req.files = files; // sets the files field in the request object
    }
    console.log(err);
    
    // continues to the next middleware or to the route
  });
  next(); 
}
