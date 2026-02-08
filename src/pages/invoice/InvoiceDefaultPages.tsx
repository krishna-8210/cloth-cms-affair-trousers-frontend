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
                    <Tab key="photos" title="All Invoice">
                        <InvoiceTable />
                    </Tab>
                    <Tab key="music" title="Sales Invoice">
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="videos" title="Return Invoice">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>

                {/* <TestTables/> */}
            </div>
        </>
    )
}



export default InvoiceDefaultPages