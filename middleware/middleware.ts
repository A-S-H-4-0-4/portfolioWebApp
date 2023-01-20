import  nextConnect  from  'connect';
import  multipartFormParser  from  './multipart-form-parser';
import  includeSession  from  './sessionMiddleware';

const  middleware = nextConnect();

middleware.use(multipartFormParser)
middleware.use(includeSession)
export  default  middleware;