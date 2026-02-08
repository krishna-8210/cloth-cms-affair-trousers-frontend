import InventryRecordTable from '@/components/tables/InventryRecordTable'
import React from 'react'
import { useParams } from 'react-router-dom';

function InventryListPage() {
     const params = useParams(); 
  return (
    <>
    <InventryRecordTable show_pagination={true} limit={10} id={params.inventry_id||'not found'}/>
    </>
  )
}

export default InventryListPage