import React from 'react'

function BalanceShow({ balance }: any) {
const numberss=Number(balance).toFixed(2);

    return (
        <div>
            {Number(balance) > 0 ?
                <span className='text-success'>
                    {numberss}
                </span> :
                <span className='text-danger'>
                    {numberss}</span>}
        </div>
    )
}

export default BalanceShow