import { Button } from '@heroui/button'
import { title } from 'process';
import React, { useState } from 'react'



// button_size- sm | md | lg | 
function SelectButtonlist({ button_object_list=[],select_handler, button_size = 'sm' }:any) {//button_object_list- accept props as array of object eg: [{title:"",id:"",action:funcion,}]


    const [selectedbtn, setselectedbtn] = useState(0);
  
    const btn_handler=(e:any,n:number)=> {
                    setselectedbtn(n);
                    if(e.action){
                     e.action(e.id);
                    }
                    select_handler(e,n)
                }
    return (
        <div className='w-full h-full flex flex-col gap-1'>

            {button_object_list.map((e:any,n:number) => {

                return <Button className='w-full capitalize rsounded-md'  color={n==selectedbtn?"primary":'default'}  onClick={() =>{btn_handler(e,n)}} size={button_size}>
                    {e.page_name.length<5?e.page_name:e.page_name.slice(0,5)+'..'}
                </Button>
            })}

        </div>
    )
}

export default SelectButtonlist