const local_db = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key))
    },
    set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
        return true
    }
}


const local_storage = {
    videoNotes: () => {
        const key = 'videoNotes'
        return {
            create: (id, data, save_status, save_id) => {
                const is_data = local_db.get(key);
                if (is_data) {
                    const obj_data = is_data
                    obj_data[id] = {
                        data: data,
                        save_status,
                        save_id,
                        id
                    }
                    console.log(obj_data)
                    local_db.set(key, obj_data)
                }
                else {
                    const obj_data = {}
                    obj_data[id] = {
                        data: data,
                        save_status,
                        save_id,
                        id
                    }
                    local_db.set(key, obj_data)
                }
            },
            read: (id) => {
                const data = local_db.get(key);
                if(data==null){
                    return null
                }
                else{
                    return data[id]||'';
                }
            },
            update: (id, data) => {
                console.log(data,id)
                const is_data = local_db.get(key);
                if (is_data) {
                    const obj_data = is_data;
                    console.log(is_data)
                    obj_data[id].data = data;
                    local_db.set(key, obj_data);
                    return true
                }
                else {
                    const obj_data = {}
                    obj_data[id] = {
                        data: data,
                        id
                    }
                    local_db.set(key, obj_data);
                    return true
                }

            },
            delete: () => {

            }
        }
    }
}
export default local_storage