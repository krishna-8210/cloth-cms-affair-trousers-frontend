import { responseHandler } from '@/libs/api_handle';
import { dataDetails_type } from '@/types';
import { Spinner } from '@heroui/react';

import { useEffect, useState } from 'react'



function DetailsPageTemplate({ details_api,setData, id, Render_component, children }: any) {
    const [details_data, set_details_data] = useState<dataDetails_type>({ data: {}, loading: true, status: 'loading' });
    const [main_data,setMainData]=useState({});
    const details_loader = async () => {
        try {
            const resp = await responseHandler(details_api, { id: id, data: '', query: '' });
            console.log(resp)
            if (resp.status) {
                set_details_data({ data: resp.data, loading: false, status: 'loaded' });
                setMainData(resp.data)
                setData(resp.data);
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        details_loader();


    }, [])



    return (

        <>
            <div className='w-full  h-full overflow-scroll'>
                {details_data.loading && <Spinner />}
                {!details_data.loading && <Render_component setData={set_details_data} data={details_data.data} />}
                {children}
            </div>
        </>
    )
}


export default DetailsPageTemplate