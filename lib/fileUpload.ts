//  firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// storage
import { storage } from "../firebaseConfig";

export class ImageUpload {
    file:File;
    baseUrl:string
    progressCallback:Function 
    downloadCallback:Function 

    constructor(uploadFile:File,baseUrl:  string,progressCallback:Function,downloadCallback:Function) {
        this.file = uploadFile
        this.baseUrl = baseUrl
        this.progressCallback = progressCallback
        this.downloadCallback = downloadCallback
    }
    
    upload = (uploadPath:string) => {
        const storageRef = ref(storage, `${this.baseUrl}/${uploadPath}`);
        const uploadTask = uploadBytesResumable(storageRef, this.file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
  
            this.progressCallback(progress) // to show progress upload
  
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              this.downloadCallback(url)
            });
          }
        );
    }
    




}