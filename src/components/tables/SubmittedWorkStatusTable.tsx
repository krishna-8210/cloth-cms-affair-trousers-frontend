import { responseHandler } from '@/libs/api_handle';
import { Button, getKeyValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from '@heroui/react';
import React, { useState } from 'react'
import FormUi from '../ui/FormUi';
import { work_status_record_api_service } from '@/services/mixServices';
import { dataDetails_type } from '@/types';
import { dateFormat } from '@/libs/mix';
import { useNavigate } from 'react-router-dom';


const Update_form = ({ data }: any) => {
    const price_details = data?.work_worker_transaction_id_ref;
    const [payment_list, set_payment_list] = useState({
        price_per_piece: Number(price_details.price_per_piece),
        additional_amount: Number(price_details.additional_amount),
        additional_cut_amount: Number(price_details.additional_cut_amount)
    });
    const submitted_quantity = data?.final_quantity;

    const submit_handler = async (form_data: any) => {
        try {
            console.log(form_data)
            const resp = await responseHandler(work_status_record_api_service.update_work_worker_unit_rate, { id: data._id, data: form_data, query: 's' }, { toast_display: true });
            console.log(resp);

        } catch (error) {
            console.log(error);
        }
    }
    return <FormUi submit_handler={submit_handler}>
        <div>
            <span>Submitted Quantity: {submitted_quantity}</span>
        </div>
        <Input type='number' onValueChange={(e) => { set_payment_list(pre => ({ ...pre, price_per_piece: Number(e) })) }} defaultValue={price_details.price_per_piece} label='Price per price' name='price_per_piece' />
        <Input type='number' onValueChange={(e) => { set_payment_list(pre => ({ ...pre, additional_amount: Number(e) })) }} defaultValue={price_details.additional_amount} label='Additional Amount' name='additional_amount' />
        <Input type='number' onValueChange={(e) => { set_payment_list(pre => ({ ...pre, additional_cut_amount: Number(e) })) }} defaultValue={price_details.additional_cut_amount} label='Additional Amount Cut' name='additional_amount_cut' />
        <Textarea name='notes' label='notes' />
        <Input label='Total Payable amount' isReadOnly value={`${(payment_list.price_per_piece * submitted_quantity) + payment_list.additional_amount - payment_list.additional_cut_amount}`} />

    </FormUi>
}


const UpdatePricePopup = ({ data }: any) => {
    console.log(data)
    const [details, set_details] = useState<dataDetails_type>({
        data: null,
        status: "loading",
        loading: true
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const loader = async () => {
        try {
            const resp = await responseHandler(work_status_record_api_service.details, { id: data?._id, data: '', query: '' });
            console.log(resp);
            if (resp.status) {
                set_details({ data: resp.data, loading: false, status: 'loaded' })
            }
            // set_data(resp.data);
        } catch (error) {
            console.log(error);
        }
    }
    const open_handler = () => {
        onOpen();
        loader()
    }


    return (
        <>
            <Button size='sm' onPress={open_handler}>{'Update unit Price'}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Transaction Details</ModalHeader>
                            <ModalBody>
                                {details.loading ? <Spinner /> : <Update_form data={details.data} />}
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
        </>
    )
}




// table_for='worker' ,work, etc
function SubmittedWorkStatusTable({ list, table_for = 'work' }: any) {
    const navigate=useNavigate()
    const submited_list = list.filter((e: any) => e.current_status == 'submitted');

    const columns_for_work = [
        {
            key: "_id",
            label: "Status Id",
        },
        {
            key: "worker_name",
            label: "Worker name",
        },
        {
            key: "custom_date",
            label: "Date",
        },
        {
            key: "pre_quantity",
            label: "Pre Quantity",
        },
        {
            key: "rejected_quantity",
            label: "Rejected Quantity",
        },
        {
            key: "final_quantity",
            label: "Current Quantity",
        },
        {
            key: "price_per_piece",
            label: "Price per Piece",
        },

        {
            key: "credit_amount",
            label: "Credit Amount",
        },
        {
            key: "action",
            label: "Action",
        },
    ];
    const columns_for_worker = [
        {
            key: "_id",
            label: "Status Id",
        },
        {
            key: "work_lot_number",
            label: "Work Lot No.",
        },
        {
            key: "custom_date",
            label: "Date",
        },
        {
            key: "pre_quantity",
            label: "Pre Quantity",
        },
        {
            key: "rejected_quantity",
            label: "Rejected Quantity",
        },
        {
            key: "final_quantity",
            label: "Current Quantity",
        },
        {
            key: "price_per_piece",
            label: "Price per Piece",
        },

        {
            key: "credit_amount",
            label: "Credit Amount",
        },
        {
            key: "action",
            label: "Action",
        },
    ];
    let columns = columns_for_work;
    if (table_for == 'worker') {
        columns = columns_for_worker
    }
    return <>
        <div className='border  mt-2 rounded-xl border-default '>
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={submited_list}>
                    {(item: any) => (
                        <TableRow key={item._id}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>


                                    {column.key === "_id" && (
                                        <div>{item?._id}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}

                                    {column.key === "worker_name" && (
                                        <div onClick={()=>navigate(`/workers/${item?.assigned_worker_id_ref?._id}`)} className='capitalize cursor-pointer'>{item?.assigned_worker_id_ref?.name}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}
                                      {column.key === "work_lot_number" && (
                                        <div onClick={()=>navigate(`/works/${item?.work_id_ref?._id}`)} className='capitalize cursor-pointer'>{item?.work_id_ref?.lot_number}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}

                                    {column.key === "custom_date" && (
                                       dateFormat(item?.date || item?.createdAt)?.date
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}
                                    {column.key === "worker_lot_number" && (
                                        <div>{item?.work_id_ref?.lot_number}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}

                                    {column.key === "price_per_piece" && (
                                        <div>{item?.work_worker_transaction_id_ref?.price_per_piece}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}
                                    {column.key === "credit_amount" && (
                                        <div>{item?.work_worker_transaction_id_ref?.final_amount}</div>
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}
                                    {column.key === "action" && (
                                        <UpdatePricePopup data={item} size='sm' className='' />
                                        //  <Transaction_details_popup transaction_id={item._id} />
                                    )}

                                    {column.key !== "index" && column.key !== "_id" &&
                                        getKeyValue(item, column.key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* {submited_list.map((e:any)=>{
    return <div>
        
    </div>
})} */}

        </div>


    </>

}

export default SubmittedWorkStatusTable