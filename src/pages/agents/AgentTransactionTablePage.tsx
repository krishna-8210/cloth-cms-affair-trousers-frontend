import TransactionTable from '@/components/tables/TransactionTable';
import React from 'react'
import { useParams } from 'react-router-dom';

function AgentTransactionTablePage() {
  const { agent_id } = useParams();
  console.log(agent_id)
  return (
<>
<TransactionTable id={agent_id}/>

</>
  )
}

export default AgentTransactionTablePage