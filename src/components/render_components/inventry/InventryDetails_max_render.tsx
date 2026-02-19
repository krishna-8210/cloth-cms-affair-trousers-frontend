import BarcodeGeneratorModalPopup from "@/components/BarcodeGeneratorModalPopup";
import BarcodeGenerator from "@/components/BarcodeGeneratorModalPopup";
import { dateFormat, libs_distributed_json_hander } from "@/libs/mix";
import { Button, Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { AnyAaaaRecord } from "dns";
import { useNavigate } from "react-router-dom";

type WorkQuantityCardProps = {
    data: {
        _id: string;
        initial_quantity: number;
        avaliable_quantity: number;
        createdAt: string;
        updatedAt: string;
        details_id_ref: string;
        work_id_ref: string;
    };
};

function InventryDetails_max_render({ data }: any) {
      if(!data)return ''
  const distributed_quantity_json=data.distributed_quantity_json;
     const distributed_list:any=libs_distributed_json_hander(distributed_quantity_json);
console.log(distributed_list)
    // const isLowStock = data.avaliable_quantity < data.initial_quantity * 0.2;
      const isLowStock = distributed_list.total_quantity < 10;
    const details = data.details_id_ref;
     const work_details = data.work_id_ref;


  
 
    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-center">
                <div >
                    <div className='flex items-center gap-2'>
                        <p className="">Range:</p>
                        <p className="">{details.range}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Lot number:</p>
                        <p className="">{work_details?.lot_number}</p>
                    </div>
                </div>

                <Chip
                    size="sm"
                    color={isLowStock ? "danger" : "success"}
                    variant="flat"
                >
                    {isLowStock ? "Low Stock" : "In Stock"}
                </Chip>
            </CardHeader>

            <Divider />

            <CardBody className="space-y-3">
                {/* Quantities */}
               

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Available Quantity</span>
                    <span className="font-semibold">
                        {distributed_list.total_quantity}
                    </span>
                </div>

                <Divider />

                {/* References */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Selling Price</span>
                    <span className="font-semibold">
                        {details.selling_price}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Series</span>
                     <span className="font-semibold">
                        {details.series}
                    </span>
                </div>

                <Divider />

                {/* Dates */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Created At</span>
                    <span className="text-sm">
                        {/* {new Date(data.createdAt).toLocaleString()} */}
                        {dateFormat(data.createdAt).date}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Updated At</span>
                    <span className="text-sm">
                        {/* {new Date(data.updatedAt).toLocaleString()} */}
                        {dateFormat(data.updatedAt).date}
                    </span>
                </div>
             <Divider />  
             <div className='flex justify-end gap-2'>
                <BarcodeGeneratorModalPopup distributed_list={distributed_list} range={details.range}  barcode_string='200-2-4-25'/>
                {/* <Button onPress={view_handler}>View</Button> */}
            </div> 
            </CardBody>
            
        </Card>
    );
}
export default InventryDetails_max_render