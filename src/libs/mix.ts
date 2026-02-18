export const dateFormat = (data: string) => {
    const daasas = new Date(data).toLocaleString().split(',');
    console.log(daasas)
    return {
        date: daasas[0],
        time: daasas[1]
    }
}
export const libs_distributed_json_hander = (distributed_json: string) => {
    const parsed_data = JSON.parse(distributed_json);
    const distrbuted_quantity_arr = parsed_data ? Object.values(parsed_data) : [];
    console.log(distrbuted_quantity_arr);
    const totalQuantity = distrbuted_quantity_arr.reduce((acc: any, item: any) => {
        return acc + Number(item.quantity || 0);
    }, 0);

    
    return { list: distrbuted_quantity_arr, total_quantity: totalQuantity }
}


