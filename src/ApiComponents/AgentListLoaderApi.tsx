import { responseHandler } from '@/libs/api_handle';
import { agent_list_update_reducer, customer_list_update_reducer } from '@/redux/DatalistSlice';
import { agent_api_service, customer_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function AgentListLoaderApi() {
    const dispatch = useDispatch();
    const loader = async () => {
        try {
            const resp = await responseHandler(agent_api_service.list);
            console.log(resp.data);
            dispatch(agent_list_update_reducer(resp.data));
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

export default AgentListLoaderApi