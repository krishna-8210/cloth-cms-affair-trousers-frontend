import { responseHandler } from '@/libs/api_handle';
import { customer_list_update_reducer } from '@/redux/DatalistSlice';
import { customer_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function CustomerListLoaderApi({ }: any) {
    const dispatch = useDispatch();
    const loader = async () => {
        try {
            const resp = await responseHandler(customer_api_service.list);
            console.log(resp.data);
            dispatch(customer_list_update_reducer(resp.data));
            // if (setState) {
            //     setState(resp.data);
            // }
        } catch (error) {
            console.log(error);
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

export default CustomerListLoaderApi