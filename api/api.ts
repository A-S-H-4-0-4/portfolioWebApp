import axios, { AxiosResponse } from "axios";

// import App from "next/app";
const BaseUrl: string = "http://localhost:3000/api/";

export enum methods {
  GET,
  POST,
  PUT,
  DELETE,
}

const instance = axios.create({
  baseURL: BaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const callAPI = async (
  API: string,
  params: object | null = null,
  method: methods = methods.GET
) => {
  let body: {} = {};
  try {
    let apiMethod: methods = methods.GET;

    // simple logic
    if (params) {
      switch (method) {
        case methods.DELETE:
          apiMethod = methods.DELETE;
          break;
        case methods.PUT:
          apiMethod = methods.PUT;
          break;
        default:
          apiMethod = methods.POST;
      }

      body = params;
    } else {
    }
    // console.log(informationObject);

    let response: any;
    let data: any;
    switch (apiMethod) {
      case methods.GET:
        if (localStorage.getItem("sessionKey") !== null) {
          response = await instance.get(API, {
            headers: {
              session: localStorage.getItem("sessionKey") as string,
            },
          });
          data = responseBody(response);
        //   console.log(data);
          return data;
        } else {
          break;
        }

      case methods.POST:
        console.log("in posting");
        
        response = await instance.post(API, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("postine");
        
        try {
            data = responseBody(response);
        } catch (error) {
            console.log(error);
            
        }
        console.log(data);
        return data;
      case methods.PUT:
        response = await instance.put(API, body);
        data = responseBody(response);
        console.log(data);
        return data;
      case methods.DELETE:
        response = await instance.delete(API);
        data = responseBody(response);
        console.log(data);
        return data;
      default:
        return {
          message: "contactFailed",
          error: [{ errorMessage: "Api Failed Alert" }],
        };
    }
  } catch (error) {
    return error;
  }
};
