import WorkDetailsCpm from '@/components/work/WorkDetailsCpm';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function WorkDetailsViewPage() {
    const params = useParams();
    const selected_work_slice = useSelector((e: any) => e.datalist_slice?.selected_work?.data);
    console.log(selected_work_slice)
    console.log([params.work_id]);

    return (

        <>
            {selected_work_slice && <WorkDetailsCpm work_data={selected_work_slice} n={0} />}
        </>
    )
}

export default WorkDetailsViewPage