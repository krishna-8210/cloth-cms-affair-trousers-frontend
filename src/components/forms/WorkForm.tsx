import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Autocomplete, AutocompleteItem, Button, Chip, Input, Select, SelectItem, Spinner, Switch, Textarea, useDisclosure, useSelect } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { color_api_service, work_api_service, work_status_record_api_service, worker_api_service } from '@/services/mixServices'
import { api_arg_type, dataDetails_type, datalist_type, type_ApiState } from '@/types'
import { color } from 'framer-motion'
import { libs_distributed_json_hander } from '@/libs/mix'
import { div } from 'framer-motion/client'
import { prepareAutoBatched } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { work_list_update_reducer } from '@/redux/DatalistSlice'

const update_list_handler = (list: any[], updated_data: any) =>
    list.map((item: any) =>
        item._id === updated_data._id
            ? { ...item, ...updated_data }
            : item
    );

const AssignFormComponent = ({ item_data, update_item }: any) => {
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

            if (resp.status) {
                update_item(resp.data)
            }
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
            <Select isRequired name='selected_worker' label='Select worker'>
                {workerlist.list.map((e: any) => {
                    return <SelectItem key={e._id} className=''>
                        {e.name}
                    </SelectItem>
                })}
            </Select>

            <Input isRequired type='number' onValueChange={(data) => {

                set_additional_quantity(Number(data))
            }} label='Additional quantity' name='additional_quatity' />
            <Input isRequired label='Per unit price' type='number' name='price_per_piece' />
            <Input label='Notes' name='notes' />
            <Input label='Date' type='date' name='custom_date' />
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

const WorkerDetails = ({ details }: any) => {
    return <div className='flex flex-col'>
        <span>ID: {details._id} </span>
        <span>Name: {details.name} </span>
        <span>Mobile: {details.mobile}</span>

    </div>
}

const SubmissionFormComponent = ({ item_data, update_item }: any) => {

    const [assigned_worker_details, set_assigned_worker_details] = useState<dataDetails_type>({ loading: true, status: 'loading', data: null })
    const dispatch = useDispatch()
    const item_status = item_data?.status;
    console.log(item_status)
    const temp_price_per_piece = item_status?.temp_price_per_piece;
    const assigned_worker_id_ref = item_status.assigned_worker_id_ref

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
                    status_record_id_ref: item_status?._id,
                }, id: '', query: ''
            }, { toast_display: true })
            if (resp.status) {
                update_item(resp.data)
            }

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

    const worker_details_loader = async () => {
        try {
            const resp = await responseHandler(worker_api_service.details, { id: assigned_worker_id_ref, data: {}, query: '' });
            console.log(resp);
            if (resp.status) {
                set_assigned_worker_details({ data: resp.data, status: 'loaded', loading: false })
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        worker_details_loader()
        //load worker details
    }, [])


    return <>

        <FormUi submit_handler={submit_handler}>
            <Chip>Submission Form</Chip>
            <div className='border-2 border-default w-full p-2 rounded-xl'>
                <div>
                    Worker Details
                </div>
                {assigned_worker_details.data ? <WorkerDetails details={assigned_worker_details.data} /> : <Spinner />}

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


type selected_color_type = {

}
const CompleteStatusFormComponent = ({ item_data, update_item }: any) => {
    const item_status = item_data?.status;
    const range_number = item_data.details.range;
    const [pre_quantity, set_pre_quantity] = useState<number>(0)
    const avaliable_quantity = item_status.final_quantity
    const [color_list, set_color_list] = useState({ list: [], status: 'loading' })
    const [selected_color, set_selected_color] = useState<any>([])
    const [range_match_status, set_range_match_status] = useState<type_ApiState>({ data: null, loading: false })
    const submit_handler = async (formdata: any) => {

        try {
            console.log(formdata);

            // check the correct distribution, so 

            let seleted_total_distribution = 0
            selected_color.map((e: any) => {
                seleted_total_distribution += e.quantity;
            })
            console.log(selected_color)
            console.log(seleted_total_distribution);
            const total_quantity = avaliable_quantity + pre_quantity
            if (total_quantity != seleted_total_distribution) {
                alert(`Quntity is not distributed correctly, please fix to proceed further,(total quantity is ${total_quantity},but total distributed quantity is ${seleted_total_distribution}) `)
                return;
            }

            const resp = await responseHandler(work_status_record_api_service.create, {
                data: {
                    formdata,
                    action: 'completed',
                    status_record_id_ref: item_status?._id,
                    matched_inventry_id: range_match_status?.data?.matched_inventry_id,
                    quantity_distribution: selected_color
                }, id: '', query: '',

            }, { toast_display: true })
            if (resp.status) {
                update_item(resp.data)
            }

        } catch (error) {
            console.log(error)
        }
    }



    const fetch_color_list = async () => {
        try {
            const resp = await responseHandler(color_api_service.list);
            if (resp.status) {
                set_color_list({ list: resp.data, status: 'loaded' })
            }
        } catch (error) {

        }
    }

    const fetch_range_handler = async () => {
        set_range_match_status({ data: null, loading: true })
        try {
            const resp = await responseHandler(work_status_record_api_service.range_match, { id: range_number, data: '', query: '' });
            if (resp.status) {
                const match_data = resp?.data?.matched_data;
                set_range_match_status({ data: { ...resp.data, matched_inventry_id: match_data?._id }, loading: false });

                if (match_data) {
                    const distributed_quantity_json = match_data.distributed_quantity_json;
                    const formated_data: any = libs_distributed_json_hander(distributed_quantity_json);
                    console.log(formated_data);
                    set_selected_color(formated_data.list);
                    set_pre_quantity(formated_data.total_quantity);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetch_color_list();
        fetch_range_handler();
    }, []);


    return <>

        <FormUi submit_handler={submit_handler}>
            <Button onPress={() => console.log(range_match_status)}>test</Button>
            <Chip>Completed: Work to Inventry</Chip>
            <div>Note: This Action will complete the work and add the inventry which then ready to sell</div>
            <div>

                <div>
                    Inventry Match Status  {range_match_status.loading ? <Spinner size='sm' /> : <Chip>{range_match_status?.data?.match_status}</Chip>}
                </div>
                <div>
                    Current Quantity : <Chip size='sm'>{item_data?.status?.final_quantity}</Chip>
                </div>
                {range_match_status?.data?.match_status == 'matched' &&
                    <div className='flex flex-col gap-1 mt-1'>
                        <div>Previous Quantity :  <Chip size='sm'>{pre_quantity}</Chip> { }</div>
                        <div>Total Quantity :  <Chip size='sm'>{pre_quantity + item_data?.status?.final_quantity}</Chip> { }</div>
                    </div>

                }


                {/* {console.log(item_data)} */}
            </div>

            <div>
                {
                    selected_color.map((item: any, n: number) => {
                        return <div className='grid grid-cols-3 m-1 '>
                            <div>Key: {item?.key}</div>
                            <div>Name: {item?.name}</div>
                            <div><Input type='number' defaultValue={item.quantity || 0} min={0}
                                onChange={(e) => {
                                    const qn = e.target.value;
                                    console.log(qn)
                                    set_selected_color((c: any) => {
                                        const list = [...c];
                                        list[n].quantity = Number(qn);
                                        return list;
                                    })
                                }} placeholder='quantity' size='sm' /></div>
                        </div>
                    })
                }
            </div>
            <Autocomplete size='sm' label='Select Color' onSelectionChange={(e) => { console.log(e) }}>
                <>
                    {Array.isArray(color_list.list) && color_list.list.map((e: any, n) => {
                        let is_already_added = false;
                        selected_color.map((color: any) => {
                            if (e.key == color.key) {
                                is_already_added = true;
                            }

                        })
                        // console.log(e);
                        if (!is_already_added) {
                            return <AutocompleteItem onPress={() => { set_selected_color((x: any) => [...x, e]) }} aria-label='itt' key={e.key}>
                                {e.name}
                            </AutocompleteItem>
                        }
                    })}
                </>
            </Autocomplete>
            <Input label='Notes' name='notes' />
        </FormUi>
        <div>

        </div>


    </>
}

function WorkActionsForm({ status, item_data }: any) {

    const dispatch = useDispatch();
    const worklist_slice = useSelector((e: any) => e.datalist_slice.work.list);
    const update_item = (updated_data: any) => {
        const updated_list: any = update_list_handler(worklist_slice, updated_data);
        dispatch(work_list_update_reducer(updated_list))
    }
    return (
        <>
            { }

            <>
                {status == 'assign' && <AssignFormComponent update_item={update_item} item_data={item_data} />}
                {status == 'submission' && <SubmissionFormComponent update_item={update_item} item_data={item_data} />}
                {status == 'completed' && <CompleteStatusFormComponent update_item={update_item} item_data={item_data} />}
            </>

        </>

    )
}

export default WorkActionsForm