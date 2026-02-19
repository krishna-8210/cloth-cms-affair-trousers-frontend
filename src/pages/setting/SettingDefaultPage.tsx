import CompnayCreateUpdateFormPopup from '@/components/CompnayCreateUpdateFormPopup'
import { responseHandler } from '@/libs/api_handle'
import { logout } from '@/redux/AuthSlice'
import { compnay_api_service } from '@/services/mixServices'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function SettingDefaultPage() {
    const [info, setInfo] = useState<any>({});
    const dispatch=useDispatch();
    const fetch_handler = async () => {
        try {
            const resp = await responseHandler(compnay_api_service.list, { id: '', data: '', query: '' })
            console.log(resp)
            setInfo(resp.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch_handler()
    }, [])
    return (
        <>
            <Card>
                <CardHeader className='flex justify-between'>
                    <div>  Company info</div>
                  <div><CompnayCreateUpdateFormPopup pre_data={info} is_update={info.compnay_print_name?true:false}/></div>


                </CardHeader>
                <CardBody>
                    <div className='flex gap-2'><div>Company Name :</div> <div>{info?.compnay_print_name}</div></div>
                    <div className='flex gap-2'><div>Mobile 1 :</div> <div>{info?.mobile1}</div></div>
                    <div className='flex gap-2'><div>Mobile 2 :</div> <div>{info?.mobile2}</div></div>
                         <div className='flex gap-2'><div>Email  :</div> <div>{info?.email}</div></div>
                    <br />
                    <div className='flex gap-2'><div>Address 1 :</div> <div>{info?.address1}</div></div>
                    <div className='flex gap-2'><div>Address 2 :</div> <div>{info?.address2}</div></div>
                    <div className='flex gap-2'><div>Address 3 :</div> <div>{info?.address3}</div></div>


                   
                </CardBody>
                 <CardFooter className='flex flex-col items-start border border-default'>
                    <div className='flex gap-2'><div>Bank name :</div> <div>{info?.bank_details?.name}</div></div>
                    <div className='flex gap-2'><div>Account number :</div> <div>{info?.bank_details?.account_number}</div></div>
                    <div className='flex gap-2'><div>Ifsc code :</div> <div>{info?.bank_details?.ifsc_code}</div></div>

                </CardFooter>
            </Card>
<div className='flex justify-center mt-4'>
<Button onPress={()=>{
    try {
        dispatch(logout(''))
        console.log('logout')
    } catch (error) {
        console.log(error)
    }
}} color='danger' className=''>Logout</Button>
</div>

        </>
    )
}

export default SettingDefaultPage