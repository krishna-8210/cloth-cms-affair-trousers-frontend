import { responseHandler } from '@/libs/api_handle';
import { worker_role_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function WorkerRolesListLoaderApi({update_list_handler}:any) {
   
    const loader = async () => {
        try {
            const resp = await responseHandler(worker_role_api_service.list);
            console.log(resp.data);
            if(update_list_handler){update_list_handler(resp.data)}
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loader();
    }, [])
  return (
    <></>
  )
}

export default WorkerRolesListLoaderApi