
import AgentListLoaderApi from '@/ApiComponents/AgentListLoaderApi'
import AgentDetails_mini from '@/components/render_components/AgentDetails_mini'
import { useSelector } from 'react-redux'





function AgentDefaultPage() {


    const agent_list_slice = useSelector((e: any) => e.datalist_slice.agent)
    console.log(agent_list_slice)
    return (
        <>
            <AgentListLoaderApi />
            <div className='flex flex-wrap gap-2'>
                {Array.isArray(agent_list_slice?.list) && agent_list_slice.list.map((worker: any) => {
                    return <div className='w-[450px]'>
                        <AgentDetails_mini data={worker} />
                    </div>
                })}

            </div>
        </>
    )
}



export default AgentDefaultPage