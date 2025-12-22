import Transaction_details_popup from '@/components/details_popup/Transaction_details_popup';
import { responseHandler } from '@/libs/api_handle';
import { worker_transction_api_service } from '@/services/mixServices';
import { datalist_type } from '@/types';
import { Button, Chip, getKeyValue,Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
// import { Table } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function WorkerTransactionPage() {
    const [list, set_list] = useState<datalist_type>({ list: [], loading: true, status: 'loading' })
    const params: any = useParams();
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
            label: "Transaction Type",
        },
                {
            key: "notes",
            label: "Notes",
        },
    ];


const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

    const listLoader = async () => {
        try {
            const resp_list = await responseHandler(worker_transction_api_service.list, { id: params.worker_id, data: '', query: '' })
            console.log(resp_list);
            if(resp_list.status){
            set_list(e=>({...e,list:resp_list.data}))
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
        {(item) => (
         <TableRow key={item._id}>
        {columns.map((column) => (
          <TableCell key={column.key}>
           

            {column.key === "_id" && (
             <Transaction_details_popup transaction_id={item._id} />
            )}

            {column.key !== "index" && column.key !== "_id" &&
              getKeyValue(item, column.key)}
          </TableCell>
        ))}
      </TableRow>
        )}
      </TableBody>
    </Table>
         

       
    )
}

export default WorkerTransactionPage