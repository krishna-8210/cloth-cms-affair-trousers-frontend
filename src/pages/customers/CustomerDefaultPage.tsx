

import CustomerListLoaderApi from '@/ApiComponents/CustomerListLoaderApi'
import WorkerlistLoaderApi from '@/ApiComponents/WorkerlistLoaderApi'
import WorkerRolesListLoaderApi from '@/ApiComponents/WorkerRolesListLoaderApi'
import CustomerDetails_mini from '@/components/render_components/CustomerDetails_mini'
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





function CustomerDefaultPage() {



    const customer_list_slice = useSelector((e: any) => e.datalist_slice.customer)
    console.log(customer_list_slice)

    return (
        <>
            <CustomerListLoaderApi />
            <div className='flex flex-wrap gap-2'>
                {Array.isArray(customer_list_slice?.list) && customer_list_slice.list.map((data: any) => {
                    return <div className='w-96'>
                        <CustomerDetails_mini data={data} />
                    </div>
                })}

            </div>
        </>
    )
}



export default CustomerDefaultPage