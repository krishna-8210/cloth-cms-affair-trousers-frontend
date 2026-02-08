import { responseHandler } from '@/libs/api_handle';
import { agent_list_update_reducer, customer_list_update_reducer, inventry_list_update_reducer, invoice_list_update_reducer } from '@/redux/DatalistSlice';
import { agent_api_service, customer_api_service, invoice_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function InvoiceListLoaderApi() {
    const dispatch = useDispatch();
    const loader = async () => {
        try {
            const resp = await responseHandler(invoice_api_service.list);
            console.log(resp.data);
            dispatch(invoice_list_update_reducer(resp.data));
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

export default InvoiceListLoaderApi 