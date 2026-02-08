import InventryListLoaderApi from '@/ApiComponents/InventryListLoaderApi'
import { useSelector } from 'react-redux';


import InventryDetails_mini_render from '@/components/render_components/inventry/InventryDetails_mini_render';


function InventryDefaultPage() {

    const inventry_list_slice = useSelector((e: any) => e.datalist_slice.inventry.list);

    console.log(inventry_list_slice);
    return (
        <>
            <InventryListLoaderApi />
            <div className='flex flex-wrap gap-2'>
                {Array.isArray(inventry_list_slice) && inventry_list_slice.map((e: any) => {
                    return <InventryDetails_mini_render data={e} />
                })}
            </div>
            { }
            {/* {worklist_slice} */}
            {/* <div>InventryDefaultPage</div> */}
        </>

    )
}

export default InventryDefaultPage