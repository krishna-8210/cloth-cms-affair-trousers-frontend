import ImageKit from "imagekit-javascript";
import { responseHandler } from "./api_handle";
import { upload_image_service } from "@/services/mixServices";


const ik = new ImageKit({
    publicKey: "public_gTn/NWe81p5b+12NzafM1HCY93s=",
    urlEndpoint: "https://ik.imagekit.io/krishnaa/"
});
export const upload_image_util=async(file:any,error_handler:Function,success_handler:Function,progress_handler:Function)=>{
     const resp = await responseHandler(upload_image_service,'');
                const { token, signature, expire } = resp.data;
                ik.upload(
                    {
                        file: file,
                        fileName: file.name,
                        token,
                        signature,
                        expire,
                    },
    
                    (err, result) => {
    
                        if (err) {
                           error_handler(err)
                        } else {
                           success_handler(result)
                        }
                    },
                    (progressEvent) => {
                       progress_ehandler(progressEvent)
                    }
                );

}