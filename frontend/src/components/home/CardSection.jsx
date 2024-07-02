import React, { memo } from 'react'

const CardSection = memo( () => {
  return (
    <div className='py-12 flex flex-col md:flex-row items-center justify-evenly my-6 mx-auto gap-8'>
        <div className="card">
        <p className="heading">
         Popular this month
         </p>
        <p>
         Powered By
        </p>
     <p>Uiverse
    </p>
    </div>
    <div className="card">
        <p className="heading">
         Popular this month
         </p>
        <p>
         Powered By
        </p>
     <p>Uiverse
    </p>
    </div>
    <div className="card">
        <p className="heading">
         Popular this month
         </p>
        <p>
         Powered By
        </p>
     <p>Uiverse
    </p>
    </div>
    </div>
  )
})

export default CardSection