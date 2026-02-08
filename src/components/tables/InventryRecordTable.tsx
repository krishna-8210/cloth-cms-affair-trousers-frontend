import { responseHandler } from '@/libs/api_handle';
import { inventry_api_service, invoice_api_service, transaction_api_service } from '@/services/mixServices';
import { datalist_type } from '@/types';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Transaction_details_popup from '../details_popup/Transaction_details_popup';
import CreditDebitChip from '../CreditDebitChip';
import { div, span } from 'framer-motion/client';
import InOutChip from '../InOutChip';


interface table_type {
    id: string,
    show_pagination: boolean,
    limit:number
}

function InventryRecordTable({ id, show_pagination,limit=5 }: table_type) {

    const navigate = useNavigate();
    const [page, set_page] = useState(1);
    const [pagination, set_pagination] = useState<any>({ page: 1 });
    const [list, set_list] = useState<datalist_type>({ list: [], loading: true, status: 'loading' })
    const columns = [
        {
            key: "_id",
            label: "Id",
        },
        {
            key: "color",
            label: "Color",
        },
       
        {
            key: "quantity",
            label: "Quantity",
        },
         {
            key: "pre_quantity",
            label: "Pre Quantity",
        },
        {
            key: "in_out",
            label: "Type",
        },

        {
            key: "entry_type",
            label: "Releted To",
        },
        {
            key: "date",
            label: "Date",
        },
        {
            key: "customer_id_ref",
            label: "Customer Name",
        },
    ];




    const listLoader = async () => {
        console.log(page)
        try {
            const resp_list = await responseHandler(inventry_api_service.inventry_record_list, { id: id, data: '', query: `page=${page}&limit=${limit}` })
            if (resp_list.status) {
                if (Array.isArray(resp_list.data.list)) {
                    console.log(resp_list.data.list);
                    set_list((e: any) => ({ ...e, list: resp_list.data.list }));
                    set_pagination(resp_list.data?.pagination);
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

        <Table aria-label="Example table with dynamic content"
            bottomContent={
                <div className="flex w-full justify-center">
                    {show_pagination && <Pagination
                        className='p-2'
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={pagination?.page}
                        total={pagination?.totalPages}
                        onChange={(page: any) => set_page(page)}
                    />}
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
                                {column.key === "_id" && (
                                    <Transaction_details_popup transaction_id={item._id} />
                                )}
                                {/* {column.key === "updated_balance"&& item.previous_balance && (
                                    item.transaction_type=='credit'?Math.round(Number(item.previous_balance)+Number(item.amount)):
                                    Math.round(Number(item.previous_balance)-Number(item.amount))
                                )} */}
                                {column.key === "in_out" && (
                                    <InOutChip type={item.in_out} />
                                )}

                                {column.key === 'invoice_date' && (item?.invoice_date?.split('T')[0])}
{column.key === 'color' && (item?.color_id_ref?.name&&<div className='capitalize'>{item.color_id_ref.name+'('+item.color_id_ref.key+')'}</div>)}
                                {column.key === 'entry_type' && <span className='capitalize'>{item.entry_type}</span>}

                                {column.key === 'customer_id_ref' && <div className='cursor-pointer' onClick={() => {
                                    navigate(`/customers/${item?.customer_id_ref?._id}`)
                                }}>
                                    {(item?.customer_id_ref?.name)}
                                </div>}

                                {column.key !== "_id" &&
                                    column.key !== "invoice_date" &&
                                    column.key !== "customer_id_ref" &&
                                    column.key !== "entry_type" &&
                                    column.key !== "in_out" &&
                                    getKeyValue(item, column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>



    )
}


export default InventryRecordTable
