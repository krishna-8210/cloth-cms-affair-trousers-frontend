import AgentDetails_mini from '@/components/render_components/AgentDetails_mini';
import WorkerDetails_max_render from '@/components/render_components/worker/WorkerDetails_max_render';
import AgentIncentiveTable from '@/components/tables/AgentIncentiveTable';
import SubmittedWorkStatusTable from '@/components/tables/SubmittedWorkStatusTable';
import { responseHandler } from '@/libs/api_handle';
import { agent_api_service, work_status_record_api_service, worker_api_service } from '@/services/mixServices';
import DetailsPageTemplate from '@/templates/DetailsPageTemplate';
import { dataDetails_type, datalist_type } from '@/types';
import { Button, Card, CardBody, CardHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'





function AgentDetailsPage() {
    const params = useParams();
    const agent_id: any = params.agent_id;


    const navigate = useNavigate()

    return (

        <>
            <DetailsPageTemplate details_api={agent_api_service.details} is_max_view={true} id={agent_id} Render_component={AgentDetails_mini}>
                <div className='mt-2'>
                    <Card>
                        <CardHeader className='flex justify-between'>
                            <div>
                                Recent Incentive
                            </div>
                            <Button onPress={() => navigate('incentives')} size='sm'>View All</Button>
                        </CardHeader>
                        <CardBody>
                            <AgentIncentiveTable pagination_option={false} agent_id={agent_id} limit={5} />
                        </CardBody>
                    </Card>

                </div>

            </DetailsPageTemplate>
        </>
    )
}


export default AgentDetailsPage