import { IncomingForm } from "formidable";

const form = new IncomingForm()

const bodyParser = (req) => {
console.log("inside body parser");

    form.parse(req, (err, fields, files) => {
        if (!err) {
    
          req.body = fields; // sets the body field in the request object
          req.files = files;
          // sets the files field in the request object
          console.log("sets the files field in the request object");
          
        }
        console.log(err);
        
        // continues to the next middleware or to the route
      });

}

export default bodyParser