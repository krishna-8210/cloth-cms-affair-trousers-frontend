import { Card, Chip } from "@heroui/react";
import { div } from "framer-motion/client";

const steps = [
    {
        key: "initiated",
        label: "Initiated",
        description: "Transaction record generated",
    },
    {
        key: "assigned",
        label: "Assigned",
        description: "Worker balance adjusted",
    },
    {
        key: "submitted",
        label: "Submitted",
        description: "Worker balance adjusted",
    },
    {
        key: "completed",
        label: "Completed",
        description: "Transaction finalized",
    },
];

const WorkStausTimelineCpm = ({ list }: any) => {
    if (!list) return null;

    return (
        <div className="border p-4 rounded-xl mt-2 border-default ">
            {list.map((list_item: any, index: number) => (
                <div key={list_item._id} className="min-h-24  flex gap-3">
                    <div className="w-2 relative min-h-full bg-default border-default">

                        <div className="w-6  h-6 rounded-xl absolute flex items-center justify-center top-[-2px]  left-[-8px] border border-black  bg-black">
                            <div className="w-4  h-4 rounded-xl  left-[-4px] border border-black  bg-primary">

                            </div>
                        </div>

                    </div>
                    <div className=" border-default p-2  w-full ">
                        <div className="min-h-28 bg-default-50 p-2 rounded-xl flex flex-col gap-1 text-sm">
                            <div><Chip>{list_item.current_status}</Chip></div>



                            <div className="text-sm mt-2">
                                <span className="text-sm text-default-500">Created At: </span>
                                <span>
                                    {new Date(list_item.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex">
                                <div className="flex gap-2">

                                    <div className=" border w-96 p-2 flex flex-col gap-2 rounded-xl border-default">
                                        <Chip size="sm">Assigned Worker</Chip>

                                        {list_item?.assigned_worker_id_ref ?
                                            <div>
                                                <div>Worker Name: {list_item?.assigned_worker_id_ref?.name}</div>
                                                <div>Worker Mobile: {list_item?.assigned_worker_id_ref?.mobile}</div>
                                            </div>

                                            : 'Not Avaliable'}

                                        {/* amount details */}
                                        {
                                            list_item?.work_worker_transaction_id_ref &&
                                            <div className="p-2 bg-default  rounded-xl">
                                                <div>
                                                    Price per piece: {list_item?.work_worker_transaction_id_ref?.price_per_piece}

                                                </div>
                                                <div>
                                                    Earned Amount  : ₹{list_item?.work_worker_transaction_id_ref?.final_amount}
                                                </div>

                                            </div>
                                        }
                                    </div>


                                    <div className=" border w-96 p-2 flex flex-col gap-2 rounded-xl border-default">
                                        <Chip size="sm">Quantity Details</Chip>

                                        {/*  submitted*/}
                                        {list_item?.current_status == 'submitted' &&
                                            <div>
                                                <div>Rejected Quatity: {list_item?.rejected_quantity}</div>
                                                <div>Total Quantity: {list_item?.final_quantity}</div>
                                            </div>}
                                        {list_item?.current_status == 'assigned' &&
                                            <div>
                                                <div>Additional Quatity: {list_item?.additional_quantity}</div>
                                                <div>Total Quantity: {list_item?.final_quantity}</div>
                                            </div>}
                                        {list_item?.current_status == 'initiated' &&
                                            <div>
                                                <div>Initial Quantity: {list_item?.final_quantity}</div>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>








                    {/* Timeline Indicator */}

                    {/* <div className="flex flex-col items-center ">
                            <div className="w-4 h-4 rounded-full bg-primary" />
                            {(
                                <div className="w-[2px] h-full bg-default-200 mt-1 mb-1" />
                            )}




                        </div> */}

                    {/* Content */}
                    {false && <div>
                        <Card className="flex-1 p-3 border">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    <Chip className="capitalize">
                                        {list_item.current_status}
                                    </Chip>


                                </span>

                            </div>

                            <p className="text-sm text-default-500">
                                {'description'}
                            </p>

                            {/* {list.createdAt && index === 0 && (
                            <p className="text-xs text-default-400 mt-1">
                                {new Date(list.createdAt).toLocaleString()}
                            </p>
                        )} */}

                            {/* {list.updatedAt && index === steps.length - 1 && (
                            <p className="text-xs text-default-400 mt-1">
                                {new Date(list.updatedAt).toLocaleString()}
                            </p>
                        )} */}
                        </Card>
                    </div>}







                </div>
            ))}
        </div>
    );
};

export default WorkStausTimelineCpm;
