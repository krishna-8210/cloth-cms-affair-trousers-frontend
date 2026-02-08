import { responseHandler } from '@/libs/api_handle';
import { inventry_list_update_reducer, work_list_update_reducer } from '@/redux/DatalistSlice';
import { inventry_api_service, work_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function InventryListLoaderApi (){


const dispatch = useDispatch();
    const loader = async () => {
        try {
            const resp = await responseHandler(inventry_api_service.list);
            console.log(resp);
            dispatch(inventry_list_update_reducer(resp.data));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loader();
    }, [])
    return (
        <>
        </>
    )
}
export default InventryListLoaderApi