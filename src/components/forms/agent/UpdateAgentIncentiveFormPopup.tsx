import ModalFormPupup from '@/components/themes/ModalFormPupup'
import ModalPopup from '@/components/themes/ModalPopup'
import { Input } from '@heroui/input'
import React, { useState } from 'react'


function UpdateAgentIncentiveFormPopup({ incentive_details }: any) {

    const [incentive_percentage, set_incentive_percentage] = useState(incentive_details?.incentive_percentage || 0)
    console.log(incentive_details)

    return <ModalFormPupup button_color='default' button_title='Update' modal_title='Update Agent Incentive'>
        <>
            <div>Invoice Billed Amount: {incentive_details?.total_billed_amount}</div>
            <div>Invoice {`(`}in Amount{`)`}: {Math.round(Number(incentive_details?.total_billed_amount) * (Number(incentive_percentage / 100)))}</div>
            <Input endContent='%' onChange={(e: any) => { set_incentive_percentage(e?.target?.value) }} type='number' defaultValue={incentive_details?.incentive_percentage} name='incentive_percentage' />
            { }
        </>

    </ModalFormPupup>
}

export default UpdateAgentIncentiveFormPopup


