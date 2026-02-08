import CreditDebitChip from '@/components/CreditDebitChip';
import Transaction_details_popup from '@/components/details_popup/Transaction_details_popup';
import TransactionTable from '@/components/tables/TransactionTable';
import { responseHandler } from '@/libs/api_handle';
import { worker_transction_api_service } from '@/services/mixServices';
import { datalist_type } from '@/types';
import { Button, Chip, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
// import { Table } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function WorkerTransactionPage() {
    const params: any = useParams();


    return (
        // <Table aria-label="Example table with dynamic content">
        //     <TableHeader columns={columns}>
        //         {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        //     </TableHeader>
        //     <TableBody items={list.list}>
        //         {(item:any) => (
        //             <TableRow key={item._id}>
        //                 {columns.map((column) => (
        //                     <TableCell key={column.key}>
        //                         {column.key === "_id" && (
        //                             <Transaction_details_popup transaction_id={item._id} />
        //                         )}

        //                         {column.key === "transaction_type" && (
        //                             <CreditDebitChip transaction_type={item.transaction_type} />
        //                         )}

        //                         {column.key !== "_id" &&
        //                             column.key !== "transaction_type" &&
        //                             getKeyValue(item, column.key)}
        //                     </TableCell>
        //                 ))}
        //             </TableRow>
        //         )}
        //     </TableBody>
        // </Table>
        <>
            <TransactionTable id={params.worker_id} />
        </>


    )
}

export default WorkerTransactionPage