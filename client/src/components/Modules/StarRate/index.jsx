import React from 'react'

function StarRate({rateAmount}) {
  const getStars = (rate) => {
    console.log(rate)
    var stars = rate.split(' ').map((star, index) => {
      return parseInt(star, 10)
    })
    return stars
  }

  return (
    <>
      {getStars(rateAmount).map((rate, index) => {
        return(
          <span key={index} className="material-icons">
            {/* 2 for full, 1 for half, 0 for empty */}
            {rate === 2 ? 'star' : (rate === 0 ? 'star_border' : 'star_half')}
          </span>
        )
      })}
    </>
  )
}

export default StarRate
