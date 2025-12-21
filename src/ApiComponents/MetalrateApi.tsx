import { responseHandler } from '@/libs/api_handle'
import { metal_rate_update_reducer } from '@/redux/DatalistSlice';
import { metal_rate_get_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function MetalrateApi({ force = true }) {
const dispatch=useDispatch()
    useEffect(() => {
        (async() => {
            try {
                const resp = await responseHandler(metal_rate_get_service);
                console.log(resp.data);
                dispatch(metal_rate_update_reducer(resp.data))
            } catch (error) {
                console.log(error)
            }
      
         

        })()
    },[])
    return (
        <></>
    )
}

export default MetalrateApi