import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Divider,
    Autocomplete,
    AutocompleteItem,
    Spinner
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import BarcodeScannerInput from "../BarcodeScannerInput";
import { div } from "framer-motion/client";
import CustomerListLoaderApi from "@/ApiComponents/CustomerListLoaderApi";
import { useSelector } from "react-redux";
import { responseHandler } from "@/libs/api_handle";
import { inventry_api_service, invoice_api_service } from "@/services/mixServices";

const emptyItem = {
    cloth_id: "",
    quantity: 0,
    additional_quantity: 0,
    box_quantity: 0,
    box_size: 0,
    unit_price: 0
};
interface item_type {
    barcode_data: String,
    range: String,
    lot_id: String,
    quantity: Number,
    quantity_via_box: Number,
    additional_quantity: Number,
    box_quantity: Number,
    box_size: Number,
    unit_price: Number,
    loading: Boolean,color:String
}

interface is_already_exist_type {
    index: Number,
    status: Boolean
}

const barcode_handler = (parmas: string) => {
    // "30010-2-4-25"
    const spileted_item = parmas.split('-');
    return {
        barcode: parmas,
        range_number: spileted_item[0],
        color: spileted_item[1],
    }
}
export default function ReturnInvoiceForm() {
const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
    const [selected_customer, set_selected_customer] = useState<any>(null);
    const [items, setItems] = useState<any>([]);
    const [item_details, set_item_details] = useState({
        total_items: 0,
        total_box_quantity: 0,
        total_additional_quantity: 0,
        total_quantity: 0,
        total_amount: 0,
    })
    const [billing, setBilling] = useState({
        deposit: 0,
        gst: 0,
        discount: 0,
        discount_per_pcs: 0,
        additional: 0,
        round_off: 0,
        notes: "",
        frieght_charges: 0
    });

    const fetch_product_details = async (range: string) => {
        const resp = await responseHandler(inventry_api_service.details_via_range,
            { id: range, data: '', query: '' })
        if (resp.status) {
            return resp.data
        }
        else {
            return null
        }

        // console.log(data);
    }

    const updateItem = (index: number, key: string, value: any) => {
        const copy = [...items];
        copy[index] = { ...copy[index], [key]: Number(value) || value };
        setItems(copy);
    };
    const updateAddtionalQuantity = (index: number, value: any) => {
        const copy = [...items];
        copy[index] = { ...copy[index], additional_quantity: Number(value) || value };
        setItems(copy);
    };


    // const addItem = () => setItems([...items, emptyItem]);
    const removeItem = (index: number) =>
        setItems(items.filter((_:any, i: number) => i !== index));

    const itemTotal = (item: any) => {
        // const effectiveQty =
        //     Number(item.quantity) +
        //     Number(item.box_quantity) * Number(item.box_size);
        const effectiveQty =
            Number(item.additional_quantity) +
            (Number(item.box_quantity) * Number(item.box_size));
        return effectiveQty * Number(item.unit_price);
    };

    const subTotal = items ? items.reduce((sum: any, i: number) => sum + itemTotal(i), 0) : 0;
    const discount = Number(billing.discount);
    const additional = Number(billing.additional);
    const discount_per_pcs = Number(billing.discount_per_pcs) * Number(item_details.total_quantity)
    const frieght_charges = Number(billing.frieght_charges);
    const total_without_tax = subTotal - discount - discount_per_pcs + additional + frieght_charges
    const gstAmount = (Number(total_without_tax) * billing.gst) / 100;
    const total_amount_calc = gstAmount + total_without_tax
    const grandTotal = total_amount_calc + (billing.round_off);



    const customer_list_slice = useSelector((e: any) => e.datalist_slice.customer.list);


    const is_already_exist_item_check = (list: any, barcode_data: String) => {

        const is_already_exist: is_already_exist_type = {
            status: false,
            index: 0//its only temm value
        };

        const temp_items_list = [...list];
        temp_items_list.map((ele: item_type, index: Number) => {
            if (ele.barcode_data == barcode_data) {
                is_already_exist.status = true;
                is_already_exist.index = index;
            }
        })
        return is_already_exist;
    }

    const ScanScan_handler = async (e: any) => {
        try {


            // console.log(e)
            const spileted_item = e.split('-');
            console.log(spileted_item);
            const range_number = spileted_item[0];
            const color=spileted_item[1]

            const is_already_exist: is_already_exist_type = is_already_exist_item_check(items, e)
            const temp_items_list = [...items];



            //if item alredy in ibvoice then increase
            if (is_already_exist.status) {
                const the_item: item_type = items[`${is_already_exist?.index}`];
                temp_items_list[Number(is_already_exist.index)].box_quantity = Number(the_item.box_quantity) + 1;
                setItems(temp_items_list);
            } else {
                console.log('else')
                const temp = {
                    barcode_data: e,
                    additional_quantity: 0,
                    range: spileted_item[0],
                    quantity: 1,
                    box_quantity: 1,
                    box_size: spileted_item[2],
                    unit_price: 0,
                    loading: true,
                    color:Number(color)
                };
                let current_index = 0
                setItems((item: any) => {
                    current_index = item.length
                    return [...item, temp]
                });
                console.log(current_index)
                const inventry_product_details = await fetch_product_details(range_number);
                console.log(inventry_product_details)
                if (inventry_product_details) {
                    const selling_price = inventry_product_details.selling_price;
                    const inventry_id = inventry_product_details._id;
                    setItems((item: any) => {
                        const temp_list = [...item];
                        let current_obj = { ...temp_list[current_index] }
                        current_obj.unit_price = selling_price;
                        current_obj.inventry_id = inventry_id;
                        current_obj.loading = false;
                        temp_list[current_index] = current_obj;
                        return temp_list
                    });

                }

            }



            const inventry_product_details = await fetch_product_details(range_number);

            if (!inventry_product_details) {

            }


            // setItems((item: any) => {
            //     const is_already_exist: is_already_exist_type = {
            //         status: false,
            //         index: 0//its only temm value
            //     };
            //     const temp_items_list = [...items];
            //     temp_items_list.map((ele: item_type, index: Number) => {
            //         if (ele.range == range_number) {
            //             is_already_exist.status = true;
            //             is_already_exist.index = index;
            //         }
            //     })

            //     if (is_already_exist.status) {
            //         const the_item: item_type = item[is_already_exist?.index];
            //         item[is_already_exist?.index]?.box_quantity = the_item?.boxh_quantity + 1;
            //         return [...item]
            //     }
            //     else {

            //         return [...item,
            //         {
            //             barcode_data: e,
            //             additional_quantity: 0,
            //             range: spileted_item[0],
            //             // lot_id: spileted_item[1],
            //             quantity: 1,
            //             box_quantity: 1,
            //             box_size: spileted_item[1],
            //             unit_price: 90
            //         }
            //         ]
            //     }

            // })
        } catch (error) {
            console.log(error)
        }
    }
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
        'action'
    ]
    const details_list = [
        {
            title: 'Discount', element: <Input
                size="sm"
                placeholder="Discount"
                type="number"
                onChange={e =>
                    setBilling({ ...billing, discount: Number(e.target.value) })
                }
            />, value: discount.toFixed(2)
        },
        {
            title: `Discount (per pcs (${item_details.total_quantity} * ${billing.discount_per_pcs}))`, element: <Input type='number' onChange={e =>
                setBilling({ ...billing, discount_per_pcs: Number(e.target.value) })
            } size="sm" placeholder="Discount per pcs" />, value: discount_per_pcs
        },
        {
            title: 'Frieght Charges', element: <Input
                size="sm"
                placeholder="Frieght Charges"
                type="number"
                onChange={e =>
                    setBilling({ ...billing, frieght_charges: Number(e.target.value) })
                }
            />, value: frieght_charges
        },
        { title: 'Subtotal', className: 'font-semibold', element: null, value: total_without_tax.toFixed(2) },
        {
            title: 'GST', element: <Input type="number" onChange={e =>
                setBilling({ ...billing, gst: Number(e.target.value) })
            } placeholder="GST(%)" size="sm" />, value: gstAmount.toFixed(2)
        },
        { title: 'Total', className: 'font-semibold', element: null, value: total_amount_calc.toFixed(2) },
        {
            title: 'Round off', className: '', element: <Input type="number" size="sm" onChange={e =>
                setBilling({ ...billing, round_off: Number(e.target.value) })
            } placeholder="Round off" />, value: billing.round_off.toFixed(2)
        },
        { title: 'Grand Total', className: 'text-lg font-semibold', element: null, value: grandTotal.toFixed(2) }
    ]

    const save_invoice_handler = async () => {




        try {
            if (!selected_customer) {
                alert('select the customer');
                return;
            }
            const server_obj = {
                invoice_items_list: items,
                date,
                billing_details: {
                    ...billing,
                    grand_total: grandTotal,
                    gst_amount: gstAmount,
                    discount_per_pcs_total_amount: discount_per_pcs,
                    additional_frieght_charges: frieght_charges,
                    other_additional_charges: additional,
                },
                quantity_details: item_details,
                customer_id: selected_customer?._id
            }
            const resp = await responseHandler(invoice_api_service.create_return_invoice, { id: '', data: server_obj, query: '' }, { toast_display: true });
            console.log(resp)
            if (resp.status) {
                console.log(resp)
            }
            else {
                alert(resp.message)
            }
        } catch (error) {
            //  alert(error.message)
            console.log(error)
        }
    }



    useEffect(() => {
        const obj = {
            total_items: 0,
            total_box_quantity: 0,
            total_additional_quantity: 0,
            total_quantity: 0,
            total_amount: 0,
        }

        items.map((e: any) => {
            obj.total_items += 1;
            obj.total_box_quantity += e.box_quantity;
            obj.total_additional_quantity += e.additional_quantity
            obj.total_quantity += ((e.box_size * e.box_quantity) + e.additional_quantity)
            obj.total_amount += itemTotal(e);
        })
        set_item_details(obj);
    }, [items])
    return (
        <>

            <CustomerListLoaderApi />

            <Card className="w-full mx-auto">
                <div

                    className="grid grid-cols-10 items-end  p-1 rounded-xl"
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
                <div>
                    {items && items.map((item: item_type, index: number) => (
                        <div
                            key={index}
                            className="grid grid-cols-10 w-full gap-2  items-end   p-1 rounded-xl"
                        >
                            <div className=" flex relative">
                                <div className="w-8 flex text-xl items-center justify-start">
                                    {index + 1}.
                                </div>

                                <Input
                                isReadOnly
                                    // label="Range"
                                    value={`${item.range}`}
                                    onChange={e => updateItem(index, "cloth_id", e.target.value)}
                                />
                                {item.loading && <Spinner className="absolute right-2 top-2" size="sm" />}
                            </div>
                              <Input
                                // label="Lot number"
                                isReadOnly
                                value={`${item?.color}`}
                                
                            />
                            {/**lot number */}
                            {/* <Input
                                // label="Lot number"
                                value={item.lot_id}
                                onChange={e => updateItem(index, "cloth_id", e.target.value)}
                            /> */}


                            <Input
                                // label="Box Qty"
                                type="number"
                                min={0}
                                max={10000}
                                value={`${item.box_quantity}`}
                                onChange={e => updateItem(index, "box_quantity", e.target.value)}
                            />

                            <Input
                                // label="Box Size"
                                isReadOnly
                                type="number"
                                value={`${item.box_size}`}
                                onChange={e => updateItem(index, "box_size", e.target.value)}
                            />

                            <Input
                                isReadOnly

                                // label="Quantity (via box)"
                                type="number"
                                value={`${Number(item.box_quantity) * Number(item.box_size)}`}

                            />
                            <Input
                                // label="Additional Quantity"
                                type="number"
                                min={0}
                                max={10000}
                                value={`${item.additional_quantity}`}
                                onChange={e => updateAddtionalQuantity(index, e.target.value)}
                            />
                            <Input
                                // label="Total quantity"
                                isReadOnly
                                type="number"
                                value={`${(Number(item.box_quantity) * Number(item.box_size)) + Number(item.additional_quantity)}`}

                            />
                            {item.loading ?
                                <Button isLoading ></Button>
                                : <Input
                                    // label="Unit Price"
                                    isReadOnly
                                    type="number"
                                    value={`${item.unit_price}`}
                                // onChange={e => updateItem(index, "unit_price", e.target.value)}
                                />
                            }
                            <div className="flex justify-center items-center  h-full">
                                <span className="font-medium">
                                    ₹ {itemTotal(item).toFixed(2)}
                                </span>

                            </div>

                            {!item.loading && <div className="flex justify-center items-center  h-full">
                                <Button
                                    isIconOnly
                                    color="danger"
                                    variant="light"
                                    onPress={() => removeItem(index)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>}
                        </div>
                    ))}
                </div>
                <CardBody className="space-y-4">
                    {/* ITEMS */}

                    <div className="flex w-full  gap-2 justify-end">
                        <BarcodeScannerInput onScan={ScanScan_handler} placeholder="Barcode scan" />
                        {/* <Button
          startContent={<Plus size={16} />}
          variant="flat"
          color="primary"
          onPress={addItem}
        >
          Add Cloth Item
        </Button> */}
                    </div>




                    {/* BILLING */}
                    <Divider />
                    <div className="flex gap-2 flex justify-end">
                        <div className="flex  border border-default rounded-xl p-1 gap-2"><div className="flex items-center">Total Items:</div> <div className="bg-default p-1 px-2  rounded-xl">{item_details.total_items}</div></div>
                        <div className="flex  border border-default rounded-xl p-1 gap-2"><div className="flex items-center">Total Boxes:</div> <div className="bg-default p-1 px-2  rounded-xl">{item_details.total_box_quantity}</div></div>
                        <div className="flex  border border-default rounded-xl p-1 gap-2"><div className="flex items-center">Total Additinal Quantity:</div> <div className="bg-default p-1 px-2  rounded-xl">{item_details.total_additional_quantity}</div></div>
                        <div className="flex  border border-default rounded-xl p-1 gap-2"><div className="flex items-center">Total Quantity:</div> <div className="bg-default p-1 px-2  rounded-xl">{item_details.total_quantity}</div></div>
                        <div className="flex  border border-default rounded-xl p-1 gap-2"><div className="flex items-center">Total Amount:</div> <div className="bg-default p-1 px-2  rounded-xl">{item_details.total_amount}</div></div>
                    </div>

                    <Divider />

                    {/* select Customer */}
                    <div className="flex justify-between w-full ">
                        <div>
                            <div>Select Customer {'('}{customer_list_slice && customer_list_slice.length}{')'}</div>
                            <div>
                                {console.log(customer_list_slice)}
                                {customer_list_slice && <Autocomplete onSelectionChange={(e: any) => {
                                    let obj = {}
                                    customer_list_slice.map((cus: any) => {
                                        if (cus._id == e) {
                                            obj = cus
                                        }
                                    })
                                    console.log(obj)
                                    set_selected_customer(obj);
                                }}>
                                    {customer_list_slice.map((e: any) => {
                                        return <AutocompleteItem key={e._id} >
                                            {`${e.name} (${e.mobile})`}
                                        </AutocompleteItem>
                                    })}
                                </Autocomplete>}
                            </div>
                            {selected_customer &&
                                <div className=" flex flex-col">
                                    <div>customer Id:{selected_customer.customer_id}</div>
                                    <div>name:{selected_customer.name}</div>
                                    <div>mobile:{selected_customer.mobile}</div>
                                    <div>Current balance:{selected_customer?.balance_id_ref?.amount}</div>
                                    <div>address:{selected_customer.address}</div>



                                </div>
                            }

                        </div>
                        <div className="min-w-96  flex flex-col gap-2">
                            {details_list.map((ele, index) => {
                                return (
                                    <div className="grid grid-cols-2 gap-2 h-7">
                                        <div>{ele.element}</div>
                                        <div className=" flex w-68 justify-end items-center gap-2">
                                            <div className={`${ele.className}`}>
                                                {ele.title}:
                                            </div>
                                            <div >
                                                ₹ {ele.value}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                            }

                        </div>

                    </div>

                 <div className="w-32">
  <Input
  type="date"
  name="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
</div>   
                    {/* SUMMARY */}
                    {/* <div className="space-y-2 text-right">
                    <div>Subtotal: ₹ {subTotal.toFixed(2)}</div>
                    <div className="flex justify-end gap-2">

                        <div>
                            <Input
                                size="sm"
                                className="rounded-0"
                                placeholder="GST (%)"
                                type="number"
                                onChange={e =>
                                    setBilling({ ...billing, gst: Number(e.target.value) })
                                }
                            />

                        </div> <div>GST: ₹ {gstAmount.toFixed(2)}</div></div>
                    <div className="text-lg font-semibold">
                        Grand Total: ₹ {grandTotal.toFixed(2)}
                    </div>
                    <div className="text-danger font-medium">
                        Balance Due: ₹ {balance.toFixed(2)}
                    </div>
                </div> */}

                    <div className="flex w-full justify-center">
                        <Button onPress={save_invoice_handler} color="success" className="w-48">
                            Save Return Invoice
                        </Button>
                    </div>

                </CardBody>

            </Card>
            <div className="flex gap-2">
                
                <div>30010-01-4-25</div>
                <div>45634-01-4-25</div>
                <div>34502-02-4-25</div>
            </div>
        </>
    );
}
