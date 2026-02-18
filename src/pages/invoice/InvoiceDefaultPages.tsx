import InvoiceTable from '@/components/tables/InvoiceTable'
import TestTables from '@/components/tables/TestTables'
import { Card, CardBody, Tab, Tabs } from '@heroui/react'

function InvoiceDefaultPages() {
    return (
        <>

            <div className=''>
                {/* {Array.isArray(worker_list_slice?.list) && worker_list_slice.list.map((worker: any) => {
                return <div>
                    ok
                </div>
            })} */}
                <Tabs aria-label="Options">
                    <Tab key="all" title="All Invoice">
                        <InvoiceTable />
                    </Tab>
                    <Tab key="sales" title="Sales Invoice">
                        <InvoiceTable invoice_type='sales' />
                    </Tab>
                    <Tab key="return" title="Return Invoice">
                        <InvoiceTable invoice_type='return' />
                    </Tab>
                </Tabs>

                {/* <TestTables/> */}
            </div>
        </>
    )
}



export default InvoiceDefaultPages