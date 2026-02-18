import WorklistLoaderApi from '@/ApiComponents/WorklistLoaderApi'
import WorkActionsForm from '@/components/forms/WorkForm'
import WorkActions from '@/components/forms/WorkForm'
import WorkDetailsCpm from '@/components/work/WorkDetailsCpm'
import { responseHandler } from '@/libs/api_handle'
import { select_work_handler_reducer } from '@/redux/DatalistSlice'
import { work_api_service } from '@/services/mixServices'
import { datalist_type } from '@/types'
import { Button, Card, CardBody, CardFooter, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from '@heroui/react'
import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ItemRender = ({ work_data, n }: any) => {
    const [seltected_status, set_seletced_status] = useState<String>('initiated')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const action_handler = (e: any) => {
        const value: string = e.target.value;
        set_seletced_status(value);
        console.log(seltected_status);
        onOpen()
    }
    console.log(work_data)
    const data = work_data.details;
    const status = work_data.status;

    const view_handler = () => {
        navigate(work_data._id);
        dispatch(select_work_handler_reducer(work_data))

    }
  return <div className='relative w-96'>
    <WorkDetailsCpm work_data={work_data} n={n}/>
<Button className='absolute top-5 right-5' onPress={view_handler}>View</Button>
  </div>
}


function WorksDefaultPage() {

    const worklist_slice = useSelector((e: any) => e.datalist_slice.work);
    console.log(worklist_slice);
    return (<>
        <WorklistLoaderApi />
        <div className='flex flex-wrap gap-2 '>
            {Array.isArray(worklist_slice.list) && worklist_slice.list.map((work_e: any, n: number) => {
                return <ItemRender index={n} work_data={work_e} />
            })}
        </div>
    </>

    )
}

export default WorksDefaultPage