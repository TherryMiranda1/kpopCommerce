import React from 'react'
import Item from './utils/Item'
import Title from './utils/Title' 

const Sales = ({ ifExists, endpoint }) => {
   console.log(endpoint)
  return (
   <>
      <div className='nike-container'>
        <Title title={'Top Sales'} />
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${ifExists ? ' xl:grid-cols-3 md:grid-cols-2 grid-cols-1' : ' xl:grid-cols-3 md:grid-cols-2 grid-cols-1'}`}>
          {endpoint?.map((item, i) => (
            <Item {...item} key={i} ifExists={ifExists} />
          ))}
        </div>
      </div>
   </>
  )
}

export default Sales