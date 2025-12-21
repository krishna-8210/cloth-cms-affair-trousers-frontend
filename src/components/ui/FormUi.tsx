import React, { useState } from 'react'
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { CustomToast } from './CustomToast';
function FormUi({ children, submit_handler }:any) {
    const [loading, setLoading] = useState(false)
    const [action, setAction] =useState<string|null>(null);
    const submit_handler_func = async (e:any) => {
        try {
            setLoading(true);
            e.preventDefault();
            const formData = new FormData(e.target);
            const entered_data = Object.fromEntries(formData);
            await submit_handler(entered_data);
            setLoading(false);
        } catch (error) {

        }
    }
    return <>
       <CustomToast toast_center={true} />
        <Form
            className="w-full  flex flex-col gap-4"
            onReset={() => setAction("reset")}
            onSubmit={submit_handler_func}
        >
            {children}

            <div className="flex gap-2 w-full  justify-center">
                <Button isLoading={loading} color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>

        </Form>



        

    </>
}

export default FormUi