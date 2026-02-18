import { select_work_handler_reducer, work_list_update_reducer } from '@/redux/DatalistSlice';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WorkActionsForm from '../forms/WorkForm';
import { EllipsisVertical } from 'lucide-react';
import { responseHandler } from '@/libs/api_handle';
import { work_api_service } from '@/services/mixServices';
import { CustomToast } from '../ui/CustomToast';

function WorkDetailsCpm({ work_data, n }: any) {
    const [seltected_status, set_seletced_status] = useState<String>('initiated')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const worklist_slice = useSelector((e: any) => e.datalist_slice.work.list);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const action_handler = (e: any) => {
        const value: string = e.target.value;
        set_seletced_status(value);
        console.log(seltected_status);
        onOpen()
    }
    console.log(work_data)
    const data = work_data;
    const status = work_data.status;
    const action_options = (work_status: string) => {
        if (work_status == 'initiated') {
            return ['assign']
        }
        if (work_status == 'assigned') {
            return ['submission']
        }
        if (work_status == 'submitted') {
            return ['assign', 'completed']
        }
    }
    const action_option_list: any = action_options(status?.current_status);


    const delete_handler = async () => {
        try {
            console.log(worklist_slice);


            const resp = await responseHandler(work_api_service.delete, { id: data._id, data: '', query: '' }, { toast_display: true });
            if (resp.status) {
                console.log(resp);
                const updated_list = worklist_slice.filter((e: any) => e._id !== data._id);
                console.log(updated_list)
                dispatch(work_list_update_reducer(updated_list));
            }

        } catch (error) {

        }
    }
    const view_handler = () => {
        navigate(work_data._id);
        dispatch(select_work_handler_reducer(work_data))
    }

    return <Card aria-labelledby={'sdcs' + n} className={`border border-default w-full  `}>
        <CustomToast toast_center={true} />
        <CardHeader className='flex flex-col items-start'>

            <div className='flex justify-between w-full'>
                <div>  Lot Number </div>
                <div>{work_data?.lot_number}</div>
            </div>
            <div className='flex justify-between w-full'>
                <span>Range :</span>
                <span>{data?.details?.range}</span>
            </div>
        </CardHeader>
        <Divider />
        <CardBody >
            {/* Quantities */}
            {/* <div className="flex justify-between">
                <span className="text-sm text-default-500">Lot Number</span>
                <span className="font-medium">{work_data.lot_number}</span>
            </div> */}

            <div className="flex justify-between my-2">
                <span className="text-sm text-default-500">Quantity</span>
                <span className="font-semibold">
                    {status?.final_quantity}
                </span>
            </div>

            <Divider />
            <div className="flex justify-between my-2">
                <span className="text-sm text-default-500">Selling Price</span>
                <span className="font-semibold">
                    {data?.details?.selling_price}
                </span>
            </div>

            <div className="flex justify-between mb-2">
                <span className="text-sm text-default-500">Series</span>
                <span className="font-semibold">
                    {data?.details?.series}
                </span>
            </div>
            <Divider />





            <div className='my-2'>
                <div>
                    {work_data.is_completed ?
                        <div>
                            <span>Current status : </span>
                            <Chip color='success' size='sm' className='capitalize'>{'Completed'}</Chip>
                        </div>
                        :
                        <div>
                            <span>Current status : </span>
                            <Chip size='sm' className='capitalize'>{status?.current_status}</Chip>
                        </div>
                    }
                </div>
            </div>

        </CardBody>

        <CardFooter className='flex justify-between items-center gap-2'>

            <div >
                {!work_data.is_completed && <div className='flex items-center gap-2'>
                    <span>Action :</span>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader>Status Update</ModalHeader>
                                    <ModalBody className=''>
                                        <WorkActionsForm item_data={data} status={seltected_status} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>

                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <span>

                        <Select aria-label='scs' onChange={action_handler} size='sm' className='w-32'>

                            {/* <SelectItem  key='initiated' > Initiated</SelectItem> */}
                            {/* <SelectItem key='assign' >Assign</SelectItem>
                        <SelectItem key={'submission'}>Submission</SelectItem>
                        <SelectItem key={'completed'}>Completed</SelectItem> */}
                            {action_option_list.map((e: any) => {
                                return <SelectItem key={e} >{e}</SelectItem>
                            })}
                        </Select>
                    </span>

                </div>}
            </div>
            <div className='flex justify-end items-center'>

      
            <div>
                {work_data?.recently_added ? <><Chip color='primary'>New</Chip></> : ''}
            </div>
            <div>

                <Button className='' size='sm' onPress={view_handler}>View</Button>
            </div>
            <div>

                <Dropdown>
                    <DropdownTrigger>
                        <EllipsisVertical
                            className='text-default-300 hover:text-default-700  outline-none cursor-pointer' />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        {/* <DropdownItem key="new">Update</DropdownItem> */}
                        <DropdownItem onClick={() => {
                            delete_handler()
                        }} key="delete" className="text-danger" color="danger">
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
                  </div>
        </CardFooter>
    </Card>
}

export default WorkDetailsCpm