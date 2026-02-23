import AgentIncentiveTable from '@/components/tables/AgentIncentiveTable';
import InvoiceTable from '@/components/tables/InvoiceTable';
import { Card, CardBody, CardHeader } from '@heroui/react';
import React from 'react'
import { useParams } from 'react-router-dom'

function AgentIncentiveTablePage() {


  const { agent_id } = useParams();
  console.log(agent_id)
  return (
    <>
      <Card>
        <CardHeader>Incentive List</CardHeader>
        <CardBody>
          <AgentIncentiveTable pagination_option={true} agent_id={agent_id} />
        </CardBody>
      </Card>

    </>
  )
}

export default AgentIncentiveTablePage