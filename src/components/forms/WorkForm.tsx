import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Chip, Input, Select, SelectItem } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { worker_api_service } from '@/services/mixServices'
import { datalist_type } from '@/types'


const AssignFormComponent = ({ item_data }: any) => {
    const [workerlist, setWorkerlist] = useState<datalist_type>({ list: [], status: 'loaded' })
    const [additional_quantity, set_additional_quantity] = useState<number>(0)
    useEffect(() => {
        (async () => {

            const resp = await responseHandler(worker_api_service.list, { data: '', id: '', query: '' })
            if (resp.status) {
                setWorkerlist({ list: resp.data, status: 'loaded' })
            }
        })()
    }, [])
    return <>

        <FormUi submit_handler={() => {

        }}>
            <Select label='Select worker'>
                {workerlist.list.map((e: any) => {
                    return <SelectItem key={e._id} className=''>
                        {e.name}
                    </SelectItem>
                })}
            </Select>

            <Input type='number' onValueChange={(data) => {

                set_additional_quantity(Number(data))
            }} label='Additional quantity' name='Additional Quatity' placeholder='Additional Quantity' />
            <Input label='per unit price' name='' />
            <Input label='note' />
            <div>
                <span>Total Quantity : </span>
                <span>{Number(item_data.quantity) + additional_quantity}</span>
            </div>
        </FormUi>



    </>
}

const SubmissionFormComponent = ({ item_data }: any) => {
    const [workerlist, setWorkerlist] = useState<datalist_type>({ list: [], status: 'loaded' })
    const [additional_quantity, set_additional_quantity] = useState<number>(0);
    interface paymentlist_type {
        calculated_payment: Number;
        additional_payment: Number;
        additional_cut: Number;
        final_payment: Number
    }
    const [paymentlist, set_paymentlist] = useState<paymentlist_type>({ calculated_payment: 0, additional_payment: 0, additional_cut: 0, final_payment: 0 })

    useEffect(() => {
        set_paymentlist(e => ({ ...e, calculated_payment: 200 * (Number(item_data.quantity) - additional_quantity) }))

    }, [additional_quantity])
    return <>

        <FormUi submit_handler={() => {

        }}>
            <Chip>Submission Form</Chip>
            <div className='border-2 border-default w-full p-2 rounded-xl'>
                <div>
                    Worker Details
                </div>
                <div>
                    <div><span>Name:</span> <span>Ram</span></div>
                    <div><span>Mobile:</span> <span>9807890909</span></div>
                </div>

            </div>

            <Input type='number' onValueChange={(data) => {

                set_additional_quantity(Number(data))
            }} label='Rejected quantity' name='Additional Quatity' placeholder='Additional Quantity' />
            <div>
                <span>Final Total Quantity : </span>
                <span>{Number(item_data.quantity) - additional_quantity}</span>
            </div>
            <div className='flex flex-col gap-2 items-end '>
                <div className=' flex items-center'><span>{'('}{(Number(item_data.quantity) - additional_quantity)}x{200}{')'}</span>
                    <span><Input value={paymentlist.calculated_payment} label='Calculated Payment' labelPlacement='outside-left' /></span>


                </div>
                <div className='flex  '>
                    <Input onValueChange={(amount: any) => {
                        set_paymentlist(e => ({ ...e, additional_payment: amount }))
                    }} label='Additinal Payment' labelPlacement='outside-left' />
                </div>
                <div>
                    <Input onValueChange={(amount: any) => {
                        set_paymentlist(e => ({ ...e, additional_cut: amount }))
                    }} label='Payment Cut' labelPlacement='outside-left' />
                </div>
                <div>
                    <Input value={(Number(paymentlist.calculated_payment) + Number(paymentlist.additional_payment) - Number(paymentlist.additional_cut))} label='Final Payment' labelPlacement='outside-left' />

                </div>
                
            </div>
            <Input label='Note' />


        </FormUi>



    </>
}

function WorkActionsForm({ status, item_data }: any) {


    return (
        <>
            { }

            <>
                {status == 'assigned' && <AssignFormComponent item_data={item_data} />}
                {status == 'submission' && <SubmissionFormComponent item_data={item_data} />}
            </>

        </>

    )
}

export default WorkActionsForm