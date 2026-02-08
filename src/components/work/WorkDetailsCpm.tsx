import { select_work_handler_reducer } from '@/redux/DatalistSlice';
import { Button, Card, CardBody, CardFooter, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@heroui/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WorkActionsForm from '../forms/WorkForm';

function WorkDetailsCpm({ work_data, n }: any) {
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
    const action_option_list: any = action_options(status.current_status);

    return <Card aria-labelledby={'sdcs' + n} className={`border border-default w-full min-h-48 h-72 `}>
        <CardBody >
            <div>
                <span>Work Name :</span>
                <span>{work_data?.details?.name}</span>
            </div>
            <div>
                <span>Lot Number :</span>
                <span>{work_data.lot_number}</span>
            </div>
            <div>
                <span>Quantity :</span>
                <span>{status?.final_quantity}</span>
            </div>
            {work_data.is_completed ?
                <div>
                    <span>Current status : </span>
                    <Chip color='success' className='capitalize'>{'Completed'}</Chip>
                </div>
                :
                <div>
                    <span>Current status : </span>
                    <Chip className='capitalize'>{status?.current_status}</Chip>
                </div>

            }

            <div>
                <span>Range :</span>
                <span>{data?.details?.range}</span>
            </div>
            <div>
                <span>Selling Price :</span>
                <span>{data?.details?.selling_price}</span>
            </div>
            <div>
                <span>Series :</span>
                <span>{data?.details?.series}</span>
            </div>

        </CardBody>

        <CardFooter className='flex justify-end items-end gap-2'>

            {!work_data.is_completed && <div>
                <span>Action</span>
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

        </CardFooter>
    </Card>
}

export default WorkDetailsCpm