import CustomerDetails_max from '@/components/render_components/CustomerDetails_max';
import { customer_api_service,} from '@/services/mixServices';
import DetailsPageTemplate from '@/templates/DetailsPageTemplate';



import { useParams } from 'react-router-dom'





function CustomerDetailsPage() {
 const {customer_id}=useParams();
 

    return (

        <>
            <DetailsPageTemplate  details_api={customer_api_service.details} id={customer_id} Render_component={CustomerDetails_max}>
              
            </DetailsPageTemplate>
        </>
    )
}



// return (
//     <>

//         <WorkerDetails_max_render data={seleted_worker_slice} />

//     </>
// )


export default CustomerDetailsPage