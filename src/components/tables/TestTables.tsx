import React from 'react'
import TableUi from '../themes/TableUi'
import { getKeyValue, TableCell, TableRow } from '@heroui/react'
import Transaction_details_popup from '../details_popup/Transaction_details_popup'
import { useNavigate } from 'react-router-dom'
import { invoice_api_service } from '@/services/mixServices'


const ListCmp=({columns,item}:any)=>{
    const navigate=useNavigate()
    return <>
         <TableRow key={item._id}>
                        {columns.map((column:any) => (
                            <TableCell key={column.key}>
                                {column.key === "_id" && (
                                    <Transaction_details_popup transaction_id={item._id} />
                                )}
                                {/* {column.key === "updated_balance"&& item.previous_balance && (
                                    item.transaction_type=='credit'?Math.round(Number(item.previous_balance)+Number(item.amount)):
                                    Math.round(Number(item.previous_balance)-Number(item.amount))
                                )} */}

                                {column.key === 'invoice_date' && (item?.invoice_date?.split('T')[0])}
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
    </>
}



function TestTables() {

 const columns = [
        {
            key: "_id",
            label: "Id",
        },

        {
            key: "total_billed_amount",
            label: "Amount",
        },

        {
            key: "transaction_type",
            label: "Type",
        },
        {
            key: "invoice_date",
            label: "Date",
        },
        {
            key: "customer_id_ref",
            label: "Customer Name",
        },
    ];


  return (
    <TableUi list_api={invoice_api_service.list}  columns={columns} ListCmp={ListCmp} />
  )
}

export default TestTables