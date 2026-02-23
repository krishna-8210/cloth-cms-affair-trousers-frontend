import { responseHandler } from '@/libs/api_handle';
import { agent_api_service, invoice_api_service, transaction_api_service } from '@/services/mixServices';
import { datalist_type } from '@/types';
import { Button, Card, getKeyValue, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@heroui/react';

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Transaction_details_popup from '../details_popup/Transaction_details_popup';
import CreditDebitChip from '../CreditDebitChip';
import { div } from 'framer-motion/client';
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDownNarrowWide } from 'lucide-react';
import InvoiceDownloadBtn from '../invoice/InvoiceDownloadBtn';
import { dateFormat } from '@/libs/mix';
import UpdateAgentIncentiveFormPopup from '../forms/agent/UpdateAgentIncentiveFormPopup';

function AgentIncentiveTable({ agent_id,limit=11 ,pagination_option=false}: any) {
    // const [is_loading_download_pdf, set_is_loading_download_pdf] = useState<string | null>(null);
    const [is_loading_view_pdf, set_is_loading_view_pdf] = useState<string | null>(null);
    const navigate = useNavigate();
    const [page, set_page] = useState(1);
    const [pagination, set_pagination] = useState<any>({ page: 1 });
    const [list, set_list] = useState<datalist_type>({ list: [], loading: true, status: 'loading' })
    const columns = [
        {
            key: "invoice_id",
            label: "Invoice Id",
        },

        {
            key: "incentive_amount_",
            label: "Amount",
        },

        {
            key: "invoice_date",
            label: "Date",
        },
      
       
        {
            key: "action",
            label: "Action",
        },
      
    ];


    const listLoader = async () => {
        console.log(page)
        try {
            const resp_list = await responseHandler(agent_api_service.incentive_list, { id: agent_id, data: '', query: `page=${page}&limit=${limit||11}` })

            if (resp_list.status) {
                if (Array.isArray(resp_list.data.list)) {
                    console.log(resp_list.data.list);
                    set_list((e: any) => ({ ...e, list: resp_list.data.list }));
                    set_pagination(resp_list.data?.pagination)
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        listLoader()
    }, [page])



    return (

        <Table title='sa' aria-label="agent incentive list"
           
            bottomContent={
                <div className="flex w-full justify-center">
                    {pagination_option&&
                    <Pagination
                        className='p-2'
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={pagination?.page}
                        total={pagination?.totalPages}
                        onChange={(page: any) => set_page(page)}
                    />
            }
                </div>
            }
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={list.list}>
                {(item: any) => (
                    <TableRow key={item._id}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                                {column.key === "invoice_id" && (
                                    <Button size='sm' onPress={()=>{
                                        navigate(`/Invoices/${item?.invoice_id_ref?._id}`)
                                    }}>{   item?.invoice_id_ref?.invoice_id}</Button>
                                
                                )}
                                {/* {column.key === "updated_balance"&& item.previous_balance && (
                                    item.transaction_type=='credit'?Math.round(Number(item.previous_balance)+Number(item.amount)):
                                    Math.round(Number(item.previous_balance)-Number(item.amount))
                                )} */}
                                {column.key === 'action' && <UpdateAgentIncentiveFormPopup incentive_details={item}/>}
                                {column.key === 'incentive_amount_' && (item?.incentive_amount)}
                                {column.key === 'pdf' && <InvoiceDownloadBtn invoice_id_props={item._id} />}
                                {column.key === 'invoice_date' && dateFormat(item?.invoice_id_ref?.invoice_date).date}
                                {column.key === 'customer_id_ref' && <div className='cursor-pointer' onClick={() => {
                                    navigate(`/customers/${item?.customer_id_ref?._id}`)
                                }}>
                                    {(item?.customer_id_ref?.name)}
                                </div>}
                                {column.key !== "_id" &&
                                    column.key !== "invoice_date" && column.key !== "customer_id_ref" &&
                                    getKeyValue(item, column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>



    )
}


export default AgentIncentiveTable