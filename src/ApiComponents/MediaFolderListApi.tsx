import { responseHandler } from '@/libs/api_handle'
import { media_links_update_reducer, metal_rate_update_reducer } from '@/redux/DatalistSlice';
import { media_folder_list_service, metal_rate_get_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function MediaFolderListApi({ force = true }) {
const dispatch=useDispatch();
const media_folder_slice=useSelector(e=>e.datalistSlice.media_folder);
console.log(media_folder_slice)
    useEffect(() => {
        (async () => {
            try {
               if(media_folder_slice.load_status){
                return;
               }
                const api_resp = await responseHandler(media_folder_list_service);
                console.log(api_resp);
                if (api_resp.status) {
                    if(Array.isArray(api_resp.data)){
                 dispatch(media_links_update_reducer(api_resp.data))
                }    
                }
            } catch (error) {
              
                console.log(error);
            }

        })()
    }, [])
    return (
        <></>
    )
}

