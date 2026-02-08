
import { TopNavItem } from "@/types";
import React from "react";
import { Outlet } from "react-router";
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  title: string;
  topnavItems: TopNavItem[];
}

const MainLayout:React.FC<MainLayoutProps>=({ topnavItems = [], title = "" }) => {
   
    return (
        <>
            <div className='flex  justify-between py-1  px-2 h-[5vh] '>
                <div className='flex  items-center gap-2'>
                    <div className='text-xl font-bold'>
                        <Link to="/products">{title}</Link>
                    </div>
                </div>
            
               
                <div className='flex gap-2 '>

                    {topnavItems.map((item: any, n: number) => (<div key={n + 'layout_items'}>
                        {item.type == 'popup' ?
                            <div className='' >
                                {item.element}
                            </div>
                            : <div className='' >
                                <Link to={`${item.link.toLowerCase()}`}>
                                    {item.label}
                                </Link>
                            </div>
                        }
                    </div>
                    ))}
                </div>
            </div>
            <div className=' p-2 pr-1 pb-1 h-[95vh] overflow-scroll '>
                <div className=' rounded-xl p-2  border-gray-600 w-full h-full overflow-y-auto'>
                    <Outlet />
                </div>

            </div>
        </>
    )
}

export default MainLayout