import React from 'react'

function BalanceShow({ balance }: any) {

    return (
        <div>
            {Number(balance) > 0 ?
                <span className='text-success'>
                    {balance}
                </span> :
                <span className='text-danger'>
                    {balance}</span>}
        </div>
    )
}

export default BalanceShow