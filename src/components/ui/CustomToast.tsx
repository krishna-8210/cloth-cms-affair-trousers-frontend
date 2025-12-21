import { addToast, ToastProvider } from "@heroui/react";
import { useState } from "react";


export function CustomToast({toast_center}:any) {
    const [placement, setPlacement] = useState(toast_center ? "top-center" : "bottom-right");

    return (
        <>
            <ToastProvider  toastOffset={placement.includes("top") ? 60 : 0} />

            {/* <div className="flex flex-wrap gap-2">

                <Button
                    variant={"flat"}
                    onPress={() => {
                        addToast({
                            title,
                            description,
                            timeout: 3000,
                            shouldShowTimeoutProgress: true,
                        });
                    }}
                >
                </Button>

            </div> */}
        </>
    );
}

export const custom_add_toast = ({ title, description, timeout = 3000, shouldShowTimeoutProgress = true, color }:any) => {
    addToast({
        title,
        description,
        timeout,
        shouldShowTimeoutProgress,
        color
    });
}

