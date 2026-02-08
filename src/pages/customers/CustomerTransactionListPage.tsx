import TransactionTable from '@/components/tables/TransactionTable';
import React from 'react'
import { useParams } from 'react-router-dom'

function CustomerTransactionListPage() {
    const {customer_id}=useParams();

  return (
<>
<TransactionTable id={customer_id} />


</>
  )
}

export default CustomerTransactionListPage