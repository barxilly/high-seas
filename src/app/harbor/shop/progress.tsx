// harbor/shop/progress.tsx

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Progress({ val, items }) {
  const currentTix = Number(Cookies.get('tickets') ?? 0)
  let favItems = items.filter((item) => val.includes(item.id))
  console.log(favItems)
  let max = favItems.sort(
    (a: ShopItem, b: ShopItem) => b.priceGlobal - a.priceGlobal,
  )[0]
  if (!max) {
    return null
  }
  useEffect(() => {
    localStorage.setItem('favouriteItems', JSON.stringify(val))
  }, [val])
  /*let favItems = favItems.map((item) => {
    return {position: (item.globalPrice / max.priceGlobal) * 100 + '%'}
  })*/
  return (
    <>
      <div className="relative ">
        <progress
          value={currentTix}
          max={max.priceGlobal}
          className="w-full rounded color-blue-400 bg-white"
        ></progress>
        {favItems.map((item) => (
          <div
            className="absolute top-0 flow flow-col -translate-x-1/2"
            style={{ left: (item.priceGlobal / max.priceGlobal) * 100 + '%' }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="rounded-full h-8 bg-white ring-2 ring-black aspect-square object-cover"
            />
            <div className="bg-black m-1 rounded-sm">{item.priceGlobal}</div>
          </div>
        ))}
      </div>
    </>
  )
}
