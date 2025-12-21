

import WorkerlistLoaderApi from '@/ApiComponents/WorkerlistLoaderApi'
import WorkerRolesListLoaderApi from '@/ApiComponents/WorkerRolesListLoaderApi'
import WorkerDetails_render from '@/components/render_components/worker/WorkerDetails_mini_render'
import { responseHandler } from '@/libs/api_handle'
import { select_worker_handler_reducer } from '@/redux/DatalistSlice'
import { work_api_service, worker_api_service } from '@/services/mixServices'
import { datalist_type } from '@/types'
import { Button, Card, CardBody } from '@heroui/react'
import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ItemRender = ({ data }: any) => {
        const navigate=useNavigate();
      const dispatch=useDispatch()
    
    
        const view_handler=()=>{
            dispatch(select_worker_handler_reducer(data))
            navigate(data?._id);
        }
    return <div className='relative w-96'>
    
    <WorkerDetails_render data={data} />
    <Button onClick={view_handler} className='absolute top-2 right-2'>View</Button>
    </div>
}


function WorkerDefaultPage() {

    const [works, setWorks] = useState<datalist_type>({ list: [], status: 'loading',loading:true })
    
    const worker_list_slice=useSelector((e:any)=>e.datalist_slice.worker)
    console.log(worker_list_slice)
    useEffect(() => {

        // (async () => {
        //     setWorks(e => ({ ...e, status: 'loading' }))

        //     const resp: any = await responseHandler(worker_api_service.list, { data: '', id: '', query: '' });
        //     if (resp.status) {
        //         setWorks({ list: resp.data, status: 'loaded',loading:false })
        //     }
        //     console.log(resp);
        // })()


    }, [])
    return (
        <>
   <WorkerlistLoaderApi />
        <div className='flex flex-wrap gap-2'>
            {Array.isArray(worker_list_slice?.list) && worker_list_slice.list.map((worker: any) => {
                return <ItemRender data={worker} />
            })}

        </div>
             </>
    )
}



export default WorkerDefaultPage