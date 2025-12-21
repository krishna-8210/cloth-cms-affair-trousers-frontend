import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { div } from 'framer-motion/client'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import { Autocomplete, AutocompleteItem, Select, SelectItem } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { work_api_service, worker_api_service } from '@/services/mixServices'
import WorkerRolesListLoaderApi from '@/ApiComponents/WorkerRolesListLoaderApi'
import { datalist_type } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { worker_list_update_reducer } from '@/redux/DatalistSlice'


const MainForm = () => {
  const [worker_role_list, set_worker_role_list] = useState<datalist_type>({ list: [], status: 'loading', loading: true });
  const [selected_role_index, setselected_role_index] = useState<number | null>(null);
  const pre_worker_list_slice = useSelector((e: any) => e?.datalist_slice?.worker?.list);
  const dispatch = useDispatch();
  console.log(pre_worker_list_slice);
  const submit_handler = async (data: any) => {

    console.log(selected_role_index);
    if (selected_role_index) {
      data.selected_worker_role = worker_role_list.list[selected_role_index];
    }
    console.log(data)


    const resp = await responseHandler(worker_api_service.create, { data: data, id: '', query: '' }, { toast_display: true });
    dispatch(worker_list_update_reducer([...pre_worker_list_slice, resp.data]));
    console.log(resp);
  }



  const worker_list_update_handler = (list: []) => {
    console.log(list);
    set_worker_role_list({ list: list, status: 'loaded', loading: false });
  }
  const role_selection_handler = (e: number) => {
    setselected_role_index(e);
  }

  return <div>
    <WorkerRolesListLoaderApi update_list_handler={worker_list_update_handler} />
    <FormUi submit_handler={submit_handler} >
      <Input label="Worker name" isRequired name='name' />
      <Autocomplete isRequired name='role_index' label='Select Worler Role' isLoading={worker_role_list.loading} onSelectionChange={(e: any) => { role_selection_handler(e) }}>
        {worker_role_list.list.map((e: any, n: number) => {
          return <AutocompleteItem key={n} aria-label={e._id}>
            {e.title}
          </AutocompleteItem>

        })}
      </Autocomplete>
      <Input type='text' label="Mobile number" isRequired name='mobile' />
      <Input label="Address" isRequired name='address' />
      <Input label="Notes" isRequired name='notes' />
    </FormUi>

  </div>

}


export default function CreateWorkerForm() {
  return (
    <>

      <ModalPopup button_title={'Create Worker'} modal_title={'Create worker'} >
        <MainForm />
      </ModalPopup>
    </>
  )
}

