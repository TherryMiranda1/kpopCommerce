import React from 'react'
import CategoryItem from './utils/CategoryItem'
import Title from './utils/Title' 

const Categories = ({ ifExists, endpoint }) => {
   console.log(endpoint)
  return (
   <>
      <div className='nike-container'>
        <Title title={'Secciones'} />
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1`}>
          {endpoint?.map((item, i) => (
            <CategoryItem {...item} key={i} ifExists={ifExists} />
          ))}
        </div>
      </div>
   </>
  )
}

export default Categories