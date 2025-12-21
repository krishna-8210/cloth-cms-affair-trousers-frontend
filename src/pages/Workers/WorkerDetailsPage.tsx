import WorkerDetails_max_render from '@/components/render_components/worker/WorkerDetails_max_render';

import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function WorkerDetailsPage() {
 const params=useParams();
 const seleted_worker_slice=useSelector((e:any)=>e.datalist_slice.worker.selected_worker);
console.log(params)
  return (
  <>

  <WorkerDetails_max_render  data={seleted_worker_slice}/>
  
  </>
  )
}

export default WorkerDetailsPage