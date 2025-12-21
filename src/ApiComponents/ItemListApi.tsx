import { responseHandler } from '@/libs/api_handle';
import { item_list_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function ItemListApi() {

    const dispatch=useDispatch()
    useEffect(() => {
        (async() => {
            try {
                const resp = await responseHandler(item_list_service);
                console.log(resp.data);
                if(resp.status){
                    
                }
                // dispatch(metal_rate_update_reducer(resp.data))
            } catch (error) {
                console.log(error)
            }
      
         

        })()
    },[])
  return (
    <div>ItemListApi</div>
  )
}

export default ItemListApi