import { responseHandler } from '@/libs/api_handle';
import { work_list_update_reducer } from '@/redux/DatalistSlice';
import { work_api_service } from '@/services/mixServices';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function WorklistLoaderApi() {
    const dispatch = useDispatch();
    const loader = async () => {
        try {
            const resp = await responseHandler(work_api_service.list);
            console.log(resp.data);
            if (resp.status) {
                dispatch(work_list_update_reducer(resp.data));
            }

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

export default WorklistLoaderApi