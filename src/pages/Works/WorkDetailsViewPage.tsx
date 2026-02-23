import SubmittedWorkStatusTable from '@/components/tables/SubmittedWorkStatusTable';
import WorkDetailsCpm from '@/components/work/WorkDetailsCpm';
import WorkStausTimelineCpm from '@/components/work/WorkStausTimelineCpm';
import { responseHandler } from '@/libs/api_handle';
import { work_api_service, work_status_record_api_service } from '@/services/mixServices';
import { dataDetails_type, datalist_type } from '@/types';
import { getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { details, div } from 'framer-motion/client';
import { CloudHail } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

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


function WorkDetailsViewPage() {
    const params = useParams();
    const [work_data, set_work_data] = useState<dataDetails_type>({ data: {}, loading: true, status: 'loading' });
    const [status_list, set_status_list] = useState<datalist_type>({ list: null, loading: true, status: 'loading' })
    const selected_work_slice = useSelector((e: any) => e.datalist_slice?.selected_work?.data);
    const work_id: any = params.work_id
    const work_details_loader = async () => {
        try {
            console.log(work_id)
            const resp = await responseHandler(work_api_service.details, { id: work_id, data: '', query: '' });
            console.log(resp)
            if (resp.status) {
                set_work_data({ data: resp.data, loading: false, status: 'loaded' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const status_list_loader = async () => {
        try {
            console.log(work_id)
            const resp = await responseHandler(work_status_record_api_service.work_status_list, { id: work_id, data: '', query: '' });
            console.log(resp)
            if (resp.status) {
                set_status_list({ list: resp.data, loading: false, status: 'loaded' })
            }
        } catch (error) {
            console.log(error)
        }
    }


const updateData=(data:any)=>{
    set_work_data(e=>({...e,data:data}))
}

    useEffect(() => {
        work_details_loader();
        status_list_loader();

    }, [])



    return (

        <>
            <div className='w-full p-2  h-full overflow-scroll'>
                {work_data.loading && <Spinner />}
                {!work_data.loading && <WorkDetailsCpm is_max_view={true}  updateData={updateData}  work_data={work_data.data} n={0} />}
                {status_list.loading ? <Spinner /> : <SubmittedWorkStatusTable list={status_list.list} />}
                {status_list.loading ? <Spinner /> : <WorkStausTimelineCpm list={status_list.list} />}
            </div>
        </>
    )
}

export default WorkDetailsViewPage