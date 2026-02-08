import { Button, Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
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

function InventryDetails_max_render({ data }: WorkQuantityCardProps) {
    const isLowStock = data.avaliable_quantity < data.initial_quantity * 0.2;
    const details = data.details_id_ref;
     const work_details = data.work_id_ref;
     const navigate=useNavigate()
    console.log(details);
    const view_handler=()=>{
        navigate(data._id)
    }
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
                    <span className="text-sm text-default-500">Initial Quantity</span>
                    <span className="font-medium">{data.initial_quantity}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Available Quantity</span>
                    <span className="font-semibold">
                        {data.avaliable_quantity}
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
                        {new Date(data.createdAt).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Updated At</span>
                    <span className="text-sm">
                        {new Date(data.updatedAt).toLocaleString()}
                    </span>
                </div>
             <Divider />  
             <div className='flex justify-end'>
                <Button onPress={view_handler}>View</Button>
            </div> 
            </CardBody>
            
        </Card>
    );
}
export default InventryDetails_max_render