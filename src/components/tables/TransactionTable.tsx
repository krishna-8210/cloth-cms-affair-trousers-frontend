import { responseHandler } from '@/libs/api_handle';
import { transaction_api_service } from '@/services/mixServices';
import { datalist_type } from '@/types';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Transaction_details_popup from '../details_popup/Transaction_details_popup';
import CreditDebitChip from '../CreditDebitChip';
import { dateFormat } from '@/libs/mix';

function TransactionTable({ id }: any) {
    const [list, set_list] = useState<datalist_type>({ list: [], loading: true, status: 'loading' })
    const columns = [
        {
            key: "_id",
            label: "Id",
        },
        
        {
            key: "amount",
            label: "Amount",
        },
      
        {
            key: "transaction_type",
            label: "Type",
        },
        {
            key: "date",
            label: "Date",
        },
      
        {
            key: "notes",
            label: "Notes",
        },
         {
            key: "system_comment",
            label: "Comment",
        },
    ];




    const listLoader = async () => {
        try {
            const resp_list = await responseHandler(transaction_api_service.transaction_list_via_id, { id, data: '', query: '' })
            console.log(resp_list);
            if (resp_list.status) {
                if (Array.isArray(resp_list.data)) {
                    set_list((e: any) => ({ ...e, list: resp_list.data }))
                }
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        listLoader()
    }, [])
    return (
        <Table aria-label="Example table with dynamic content">
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
                                {column.key === "updated_balance" && item.previous_balance && (
                                    item.transaction_type == 'credit' ? Math.round(Number(item.previous_balance) + Number(item.amount)) :
                                        Math.round(Number(item.previous_balance) - Number(item.amount))
                                )}
                                {column.key === "transaction_type" && (
                                    <CreditDebitChip transaction_type={item.transaction_type} />
                                )}
                                 {column.key === "date" && (
                                   dateFormat(item.transaction_date).date
                                )}

                                {column.key !== "_id" &&
                                    column.key !== "transaction_type" &&
                                
                                    getKeyValue(item, column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>



    )
}


export default TransactionTable