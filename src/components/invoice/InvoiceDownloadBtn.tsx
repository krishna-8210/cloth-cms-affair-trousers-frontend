import { responseHandler } from '@/libs/api_handle';
import { invoice_api_service } from '@/services/mixServices';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { ArrowDown } from 'lucide-react';
import React, { useState } from 'react'

function InvoiceDownloadBtn({ invoice_id_props }: any) {
    const [is_loading_view_pdf, set_is_loading_view_pdf] = useState<string | null>(null);
    const pdf_view_handler = async (invoice_id: string) => {
        try {
            console.log(invoice_id)
            // set_is_loading_view_pdf(invoice_id);
            const resp: any = await responseHandler(invoice_api_service.pdf_download, { id: invoice_id, data: '', query: '' }, { toast_display: true })

            // set_is_loading_view_pdf(null);
            // resp.resp.data MUST be a Blob
            const blob = new Blob([resp.resp.data], {
                type: "application/pdf",
            });
            console.log(is_loading_view_pdf)
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } catch (error) {
            console.log(error)
        }
    }
    const pdf_download_handler = async (invoice_id: string) => {
        try {
            console.log(invoice_id);
            // set_is_loading_download_pdf(invoice_id);
            const resp: any = await responseHandler(invoice_api_service.pdf_download, { id: invoice_id, data: '', query: '' }, { toast_display: true })
            // set_is_loading_download_pdf(null);
            // resp.resp.data MUST be a Blob
            const blob = new Blob([resp.resp.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);
            // window.open(url);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice-${invoice_id}.pdf`; // file name
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex items-center justify-between gap-2 bg-default-100 rounded-full border border-default-300 w-28'>
            <Button onPress={() => pdf_view_handler(invoice_id_props)} size='sm' className='rounded-full'>   <Tooltip content='View invoice'> Pdf</Tooltip></Button>
            <div className='bg-default-200 rounded-full h-8 w-8 flex items-center justify-center' onClick={() => pdf_download_handler(invoice_id_props)}><Tooltip content='Download invoice'><ArrowDown className='outline-none' /></Tooltip></div>
            {/* {is_loading_view_pdf == item._id ? <Spinner size='sm' /> : 'ok'}
                                    {is_loading_view_pdf?is_loading_view_pdf:'null'} */}
        </div>
    )
}

export default InvoiceDownloadBtn