import InventryDetails_max_render from '@/components/render_components/inventry/InventryDetails_max_render';

import InventryRecordTable from '@/components/tables/InventryRecordTable';

import { inventry_api_service, work_api_service, work_status_record_api_service } from '@/services/mixServices';
import DetailsPageTemplate from '@/templates/DetailsPageTemplate';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';

import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

// const SubmittedList = ({ list }: any) => {

//     const submited_list = list.filter((e: any ) => e.current_status == 'submitted');

//     const columns = [
//         {
//             key: "_id",
//             label: "Id",
//         },
//          {
//             key: "createdAt",
//             label: "Date",
//         },
//         {
//             key: "pre_quantity",
//             label: "Pre Quantity",
//         },
//         {
//             key: "rejected_quantity",
//             label: "Rejected Quantity",
//         },
//         {
//             key: "final_quantity",
//             label: "Current Quantity",
//         },
//          {
//             key: "price_per_piece",
//             label: "Price per Piece",
//         },

//          {
//             key: "credit_amount",
//             label: "Credit Amount",
//         },
//     ];
//     return <>
//         <div className='border p-2 mt-2 rounded-xl border-default '>
//             <Table aria-label="Example table with dynamic content">
//                 <TableHeader columns={columns}>
//                     {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
//                 </TableHeader>
//                 <TableBody items={submited_list}>
//                     {(item) => (
//                         <TableRow key={item._id}>
//                             {columns.map((column) => (
//                                 <TableCell key={column.key}>


//                                     {column.key === "_id" && (
//                                         <div>{item?.assigned_worker_id_ref?.name}</div>
//                                         //  <Transaction_details_popup transaction_id={item._id} />
//                                     )}

//                                      {column.key === "price_per_piece" && (
//                                         <div>{item?.work_worker_transaction_id_ref?.price_per_piece}</div>
//                                         //  <Transaction_details_popup transaction_id={item._id} />
//                                     )}
//                                     {column.key === "credit_amount" && (
//                                         <div>{item?.work_worker_transaction_id_ref?.final_amount}</div>
//                                         //  <Transaction_details_popup transaction_id={item._id} />
//                                     )}

//                                     {column.key !== "index" && column.key !== "_id" &&
//                                         getKeyValue(item, column.key)}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//             {/* {submited_list.map((e:any)=>{
//     return <div>

//     </div>
// })} */}

//         </div>


//     </>

// }


function InventryDetailsViewPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [details, set_details] = useState<any>(null)
    const id: any = params.inventry_id
    const distrbuted_quantity = (details && details?.distributed_quantity_json) ? JSON.parse(details.distributed_quantity_json) : null
    console.log(distrbuted_quantity)
    const distrbuted_quantity_arr = distrbuted_quantity ? Object.values(distrbuted_quantity) : []
    console.log(distrbuted_quantity_arr)
    useEffect(() => {

        // status_list_loader();

    }, [])



    return (

        <>

            <DetailsPageTemplate setData={set_details} details_api={inventry_api_service.details} id={id} Render_component={InventryDetails_max_render}>
                <>
                    <div className='mt-3 flex gap-2'>
                        {Array.isArray(distrbuted_quantity_arr) && distrbuted_quantity_arr.map((e: any) => {
                            return <Card className='w-96'>
                                <CardHeader>Name: {e.name}</CardHeader>
                                <CardBody>
                                    <div>Key: {e.key}</div>
                                    <div>Initial Quantity: 0</div>
                                    <div>Avaliable Quantity: {e.quantity}</div>
                                </CardBody>
                            </Card>
                        })}

                    </div>
                    <Card className='mt-3'>
                        <CardHeader className='flex justify-between '>
                            <div className=' font-bold'> Recent Inventry Records</div>
                            <div><Button onPress={() => { navigate(`inventry-record-list`) }} size='sm'>View All</Button></div>
                        </CardHeader>
                        <CardBody>
                            <InventryRecordTable limit={5} show_pagination={false} id={id} />
                        </CardBody>

                    </Card>
                </>
            </DetailsPageTemplate>

        </>
    )
}

export default InventryDetailsViewPage