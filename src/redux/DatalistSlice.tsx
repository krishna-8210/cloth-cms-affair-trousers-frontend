
import { createSlice } from '@reduxjs/toolkit'
export const Slice = createSlice({
    name: 'datalist',
    initialState: {
        work: {
            list: [],
        },
        worker: {
            list: [],
            selected_worker: null
        },
        selected_work: {
            data: null
        }
    },


    reducers: {
        work_list_update_reducer: (state: any, { payload }: any) => {
            console.log("work reducer update");
            state.work.list = [...state.work.list, ...payload];
        },
        //it will select the work 
        select_work_handler_reducer: (state: any, { payload }: any) => {
            console.log("select_work_handler_reducer");
            state.selected_work.data = payload;
        },
        worker_list_update_reducer: (state: any, { payload }: any) => {
            console.log("worker_list_update_reducer");
            state.worker.list = payload;
        },
        select_worker_handler_reducer: (state: any, { payload }: any) => {
            console.log("select_worker_handler_reducer");
            state.worker.selected_worker = payload;
        },

    }
}

)

// Action creators are generated for each case reducer function
export const { work_list_update_reducer, select_work_handler_reducer,worker_list_update_reducer,select_worker_handler_reducer } = Slice.actions

export default Slice.reducer