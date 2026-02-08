import WorkerDetails_max_render from '@/components/render_components/worker/WorkerDetails_max_render';
import SubmittedWorkStatusTable from '@/components/tables/SubmittedWorkStatusTable';
import { responseHandler } from '@/libs/api_handle';
import { work_status_record_api_service, worker_api_service } from '@/services/mixServices';
import { dataDetails_type, datalist_type } from '@/types';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'





function WorkerDetailsPage() {
    const params = useParams();
    const [worker_data, set_work_data] = useState<dataDetails_type>({ data: {}, loading: true, status: 'loading' });
    const [status_list, set_status_list] = useState<datalist_type>({ list: null, loading: true, status: 'loading' })
    const worker_id: any = params.worker_id;
    console.log(params)
    const work_details_loader = async () => {
        try {
            console.log(worker_id)
            const resp = await responseHandler(worker_api_service.details, { id: worker_id, data: '', query: '' });
            console.log(resp)
            if (resp.status) {
                set_work_data({ data: resp.data, loading: false, status: 'loaded' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const status_list_loader = async () => {
        try {
            // console.log(work_id)
            const resp = await responseHandler(work_status_record_api_service.worker_work_list, { id: worker_id, data: '', query: '' });
            console.log(resp)
            if (resp.status) {
                set_status_list({ list: resp.data, loading: false, status: 'loaded' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        work_details_loader();
        status_list_loader();

    }, [])



    return (

        <>
            <div className='w-full p-2  h-full overflow-scroll'>
                {worker_data.loading && <Spinner />}
                {!worker_data.loading && <WorkerDetails_max_render data={worker_data.data} n={0} />}
                {status_list.loading ? <Spinner /> : <SubmittedWorkStatusTable table_for='worker' list={status_list.list} />}
                {/* {status_list.loading ? <Spinner /> : <WorkStausTimelineCpm list={status_list.list} />} */}
            </div>
        </>
    )
}



// return (
//     <>

//         <WorkerDetails_max_render data={seleted_worker_slice} />

//     </>
// )


export default WorkerDetailsPage