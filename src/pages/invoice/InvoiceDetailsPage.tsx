import { invoice_api_service } from "@/services/mixServices";
import DetailsPageTemplate from "@/templates/DetailsPageTemplate";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


const Billing_details_Item = ({ title, details, value, isGrandTotal }: any) => {
    return <div className="flex">
        <div className={`w-48 ${isGrandTotal ? 'font-bold' : ''}`} >{title} : </div>
        <div className="w-32">{details}</div>
        <div className={`w-20 ${isGrandTotal ? 'font-bold' : ''}`}> {value}</div>
    </div>
}
const Hello = () => {
    return ''
}
import React from "react";
import { div } from "framer-motion/client";
import { Button, Card, CardBody, CardHeader, Input, Spinner, useNavbar } from "@heroui/react";
import InvoiceDownloadBtn from "@/components/invoice/InvoiceDownloadBtn";
import CreateInvoiceFormPopup from "@/components/forms/CreateInvoiceFormPopup";

function InvoiceView({ invoice }: any) {
    if (!invoice) return null;
    const navigate=useNavigate()
    const {
        invoice_id,
        invoice_date,
        customer_id_ref,
        invoice_items,
        billing_details,
        shipping_details,
        transport_details,
        total_billed_amount,
        billing_type,
        invoice_type,
    } = invoice;
    const column_titles: string[] = [

        'range',
        'type',
        // 'lot number',
        'box Quantity',
        'box size',
        'quantity',
        'additional Q',
        'total quanity',
        'unit sale price',
        'amount',
    ]




    return (
        <div>
            <Card className=" ">
                <div className="flex w-full justify-between">
                    <div className=" w-full">
                        <CardHeader>Invoice Details </CardHeader>
                        <CardBody>
                            <div>Invoice Id : {invoice_id}</div>
                            <div>Invoice Type: {invoice_type}</div>
                            {billing_type && <div>Billing Type: {billing_type}</div>}
                            <div>Invoice Date : {invoice_date.split('T')[0]}</div>


                        </CardBody>
                    </div>
                    <div className=" flex  items-start py-2  px-2 gap-2">
                        <InvoiceDownloadBtn invoice_id_props={invoice._id} />
                        {/* <div> <CreateInvoiceFormPopup pre_invoice_details={invoice} is_update_invoice={true} /></div> */}

                    </div>
                </div>
                <CardBody>
                    <div className=" flex gap-3 w-full flex items-center border border-default-200 p-2 rounded-xl">
                        <div>Customer Details: </div>
                        <div className="bg-default-200 px-2 py-1 rounded-xl">Customer Id : <span className="uppercase"> {customer_id_ref.customer_id}</span></div>
                        <div className="bg-default-200 px-2 py-1 rounded-xl">Customer Name : {customer_id_ref.name}</div>
                        <div className="bg-default-200 px-2 py-1 rounded-xl">Customer Mobile : <span className="uppercase"> {customer_id_ref.mobile}</span></div>
                        <Button onPress={()=>{
                            navigate('/customers/'+customer_id_ref._id)
                        }} size="sm">View</Button>
                    </div>
                </CardBody>

            </Card>
            <Card className="mt-2">
                <CardHeader>Invoice Items</CardHeader>
                <CardBody>
                    <div

                        className="grid grid-cols-9 items-end  p-1 rounded-xl"
                    >

                        {column_titles && column_titles.map((item: string, index: number) => (
                            <div className=" flex justify-center capitalize">
                                {index == 0 ?
                                    <div className="flex w-full">
                                        <div className="w-8 flex  items-center justify-start">
                                            No.
                                        </div>
                                        <div className=" w-full flex justify-center">
                                            {item}
                                        </div>
                                    </div> :
                                    item
                                }


                            </div>
                        ))}


                    </div>
                    <div >
                        {invoice_items && invoice_items.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="grid grid-cols-9 w-full gap-2  items-end   p-1 rounded-xl"
                            >
                                <div className=" flex  justify-between">
                                    <div className="w-8 flex text-xl items-center justify-start">
                                        {index + 1}.
                                    </div>
                                    <div>
                                        {item.inventry_id_ref.details_id_ref.range}
                                    </div>
                                    <div></div>

                                </div>
                                <div className=" text-center">
                                    {item.color_id_ref.key}
                                </div>
                                {/**lot number */}
                                {/* <Input
                                // label="Lot number"
                                value={item.lot_id}
                                onChange={e => updateItem(index, "cloth_id", e.target.value)}
                            /> */}



                                <div className=" text-center">
                                    {item.invoice_quantity_details.box_quantity}
                                </div>
                                <div className=" text-center">
                                    {item.invoice_quantity_details.box_size}
                                </div>

                                <div className=" text-center">
                                    {item.invoice_quantity_details.box_size * item.invoice_quantity_details.box_quantity}
                                </div>
                                <div className=" text-center">
                                    {item.invoice_quantity_details.additional_quantity}
                                </div>
                                <div className=" text-center">
                                    {(item.invoice_quantity_details.box_size * item.invoice_quantity_details.box_quantity) + Number(item.invoice_quantity_details.additional_quantity)}

                                </div>
                                <div className=" text-center">
                                    {item.unit_selling_price}
                                </div>
                                <div className=" text-center">
                                    {((item.invoice_quantity_details.box_size * item.invoice_quantity_details.box_quantity) + Number(item.invoice_quantity_details.additional_quantity)) * item.unit_selling_price}
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-end border-t border-default-200">
                        {/* Billing details */}

                        <Billing_details_Item title='(-) Discount Flat' value={billing_details.flat_discount_amount} />
                        <Billing_details_Item title='(-) Discount per piece' details={`@ ${billing_details.discount_per_piece}/pcs.`} value={billing_details.discount_per_piece_amount} />
                        <Billing_details_Item title='(+) Friegnt. Charges' value={billing_details.frieght_charges_amount} />
                        <Billing_details_Item title='(+) GST' details={`@ ${billing_details.gst_percentage}%`} value={billing_details.gst_amount} />
                        <Billing_details_Item title='Round off' value={billing_details.round_of_amount} />
                        <Billing_details_Item isGrandTotal={true} title='Grand Total' value={billing_details.total_billed_amount} />

                    </div>
                </CardBody>
            </Card>
            <div className="grid grid-cols-3 gap-2 my-2">
                <Card>
                    <CardHeader>Billing Details</CardHeader>

                    <CardBody>
                        <div>
                            <div>Contact Mobile : {customer_id_ref.mobile}</div>
                            <div>Address 1: {customer_id_ref.address1}</div>
                            <div>Address 2: {customer_id_ref.address2}</div>
                            <div>Address 3: {customer_id_ref.address3}</div>
                            <div>Pincode: {customer_id_ref.pincode}</div>
                             <div>GST number: {customer_id_ref.gst_number}</div>
                        </div>


                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>Shipping Details</CardHeader>
                    <CardBody>


                        {shipping_details ?
                            <div>
                                <div>Contact Name : {shipping_details.contact_name}</div>
                                <div>Contact Mobile : {shipping_details.contact_mobile}</div>
                                <div>Address 1: {shipping_details.address1}</div>
                                <div>Address 2: {shipping_details.address2}</div>
                                <div>Address 3: {shipping_details.address3}</div>
                                <div>Pincode: {shipping_details.pincode}</div>
                                 <div>GST number: {customer_id_ref.gst_number}</div>
                                <div>Notes: {shipping_details.notes} </div>
                            </div>

                            : 'Not avaliable'}
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>Transport Details</CardHeader>
                    {

                    }
                    <CardBody>

                        {transport_details ?
                            <div>
                                <div>Name : {transport_details.name}</div>
                                <div>Charged Amount: {transport_details.charged_amount}</div>
                                <div>Notes: {transport_details.notes} </div>

                            </div>



                            : 'Not avaliable'}

                    </CardBody>
                </Card>
            </div>


        </div>
    );
}


function InvoiceDetailsPage() {
    const { invoice_id } = useParams();
    const [details, set_details] = useState(null)
    return (

        <>
            <DetailsPageTemplate setData={set_details} details_api={invoice_api_service.details} id={invoice_id} Render_component={Hello}>
                <>{details && <InvoiceView invoice={details} />} </>
            </DetailsPageTemplate>
        </>
    )
}


export default InvoiceDetailsPage