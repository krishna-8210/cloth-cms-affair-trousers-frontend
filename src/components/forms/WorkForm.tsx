import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Chip, Input, Select, SelectItem, Switch, Textarea } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { work_status_record_api_service, worker_api_service } from '@/services/mixServices'
import { datalist_type } from '@/types'


const AssignFormComponent = ({ item_data }: any) => {
    const item_status = item_data?.status


    const [workerlist, setWorkerlist] = useState<datalist_type>({ list: [], status: 'loaded', loading: false })
    const [additional_quantity, set_additional_quantity] = useState<number>(0);
    const submit_handler = async (formdata: any) => {
        try {
            console.log(item_data)
            console.log(formdata)

            const resp = await responseHandler(work_status_record_api_service.create, {
                data: {
                    formdata,
                    action: 'assigned',
                    status_record_id_ref: item_status?._id
                }, id: '', query: ''
            }, { toast_display: true })
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {

            const resp = await responseHandler(worker_api_service.list, { data: '', id: '', query: '' })
            if (resp.status) {
                setWorkerlist({ list: resp.data, status: 'loaded', loading: false })
            }
        })()
    }, [])
    return <>

        <FormUi submit_handler={submit_handler} >
            <Select name='selected_worker' label='Select worker'>
                {workerlist.list.map((e: any) => {
                    return <SelectItem key={e._id} className=''>
                        {e.name}
                    </SelectItem>
                })}
            </Select>

            <Input type='number' onValueChange={(data) => {

                set_additional_quantity(Number(data))
            }} label='Additional quantity' name='additional_quatity' placeholder='Additional Quantity' />
            <Input label='per unit price' name='price_per_piece' />
            <Input label='Notes' name='notes' />
            <div>
                <div>
                    <span>Pre Quantity : </span>
                    <span>{Number(item_data?.status?.final_quantity)}</span>
                </div>
                <div>
                    <span>Total Quantity : </span>
                    <span>{Number(item_data?.status?.final_quantity) + additional_quantity}</span>
                </div>

            </div>
        </FormUi>



    </>
}

const SubmissionFormComponent = ({ item_data }: any) => {
    const item_status = item_data?.status;
    console.log(item_status)
    const temp_price_per_piece = item_status?.temp_price_per_piece;


    const previous_quantity = item_data?.status?.final_quantity
    const [is_update_price_per_piece_enabled, set_is_update_price_per_piece_enabled] = useState<boolean>(false)
    // const [workerlist, setWorkerlist] = useState<datalist_type>({ list: [], status: 'loaded',loading:true })
    const [rejected_quantity, set_rejected_quantity] = useState<number>(0);

    interface paymentlist_type {
        calculated_payment: Number;
        additional_payment: Number;
        additional_cut: Number;
        final_payment: Number
    }
    const [paymentlist, set_paymentlist] = useState<paymentlist_type>({ calculated_payment: 0, additional_payment: 0, additional_cut: 0, final_payment: 0 })

    const submit_handler = async (formdata: any) => {
        try {
            console.log(formdata);


            const resp = await responseHandler(work_status_record_api_service.create, {
                data: {
                    ...formdata,
                    payemnt_data: paymentlist,
                    action: 'submitted',
                    status_record_id_ref: item_status?._id
                }, id: '', query: ''
            }, { toast_display: true })
            console.log(resp);

        } catch (error) {
            console.log(error)
        }
    }

    const handler_rejected_quantity = (data: any) => {
        set_rejected_quantity(Number(data));

    }

    //
    const final_quantity = item_data?.status?.final_quantity


    useEffect(() => {
        set_paymentlist(e => ({ ...e, calculated_payment: temp_price_per_piece * (Number(item_data?.status?.final_quantity) - rejected_quantity) }))

    }, [rejected_quantity])


    return <>

        <FormUi submit_handler={submit_handler}>
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

            <Input defaultValue='0' label='Rejected Quantity' type='number' onValueChange={handler_rejected_quantity} name='rejected_quantity' placeholder='Rejected Quantity' />
            <div>
                <span>Final Total Quantity : </span>
                <span>{Number(final_quantity) - rejected_quantity}</span>
            </div>
            {/* price per piece */}
            {/* <div className='border border-default p-2 w-full rounded-xl flex flex-col gap-1'>
                
                <Switch onValueChange={(e)=>{set_is_update_price_per_piece_enabled(e)}}  name='is_update_price_per_piece'>Update Price per Piece</Switch>
                {is_update_price_per_piece_enabled?<Input  isReadOnly={!is_update_price_per_piece_enabled}  labelPlacement='outside' placeholder='Price per Piece'/>
                :
                <Input isReadOnly={!is_update_price_per_piece_enabled} labelPlacement='outside' placeholder='Price per Piece ss'/>
                }
            </div> */}
            <div className='flex flex-col gap-2 items-end '>
                <div className=' flex items-center'><span>{'('}{(Number(final_quantity) - rejected_quantity)}x{temp_price_per_piece}{')'}</span>
                    <span><Input value={`${paymentlist.calculated_payment}`} label='Calculated Payment' labelPlacement='outside-left' /></span>


                </div>
                <div className='flex  '>
                    <Input type='number' defaultValue='0' onValueChange={(amount: any) => {
                        set_paymentlist(e => ({ ...e, additional_payment: amount }))
                    }} label='Additinal Payment' labelPlacement='outside-left' />
                </div>
                <div>
                    <Input type='number' defaultValue='0' onValueChange={(amount: any) => {
                        set_paymentlist(e => ({ ...e, additional_cut: amount }))
                    }} label='Payment Cut' labelPlacement='outside-left' />
                </div>
                <div>
                    <Input isReadOnly value={`${(Number(paymentlist.calculated_payment) + Number(paymentlist.additional_payment) - Number(paymentlist.additional_cut))}`} label='Final Payment' labelPlacement='outside-left' />

                </div>

            </div>
            <Textarea label='Notes' name='notes' />


        </FormUi>



    </>
}
const CompleteStatusFormComponent = ({ item_data }: any) => {
    const item_status = item_data?.status;



    const submit_handler = async (formdata: any) => {
        try {
            console.log(formdata);
            const resp = await responseHandler(work_status_record_api_service.create, {
                data: {
                    formdata,
                    action: 'completed',
                    status_record_id_ref: item_status?._id
                }, id: '', query: ''
            }, { toast_display: true })
            console.log(resp);

        } catch (error) {
            console.log(error)
        }
    }

    const handler_rejected_quantity = (data: any) => {


    }

    return <>

        <FormUi submit_handler={submit_handler}>
            <Chip>Completed: Work to Inventry</Chip>
            <div>Note: This Action will complete the work and add the inventry which then ready to sell</div>
            <Textarea label='Notes' name='notes' />

        </FormUi>



    </>
}

function WorkActionsForm({ status, item_data }: any) {

    console.log(item_data)
    return (
        <>
            { }

            <>
                {status == 'assigned' && <AssignFormComponent item_data={item_data} />}
                {status == 'submission' && <SubmissionFormComponent item_data={item_data} />}
                {status == 'completed' && <CompleteStatusFormComponent item_data={item_data} />}
            </>

        </>

    )
}

export default WorkActionsForm