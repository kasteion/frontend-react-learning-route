import React, { useState } from "react"
import { SelectStars } from "../styles/components"

const Stars = () => {
  const [stars, setStars] = useState(5)
  return (
    <SelectStars selected={stars}>
      <span
        role="button"
        onClick={() => setStars(1)}
        onKeyDown={() => {}}
        tabIndex={0}
      >
        ⭐
      </span>
      <span
        role="button"
        onClick={() => setStars(2)}
        onKeyDown={() => {}}
        tabIndex={-1}
      >
        ⭐
      </span>
      <span
        role="button"
        onClick={() => setStars(3)}
        onKeyDown={() => {}}
        tabIndex={-2}
      >
        ⭐
      </span>
      <span
        role="button"
        onClick={() => setStars(4)}
        onKeyDown={() => {}}
        tabIndex={-3}
      >
        ⭐
      </span>
      <span
        role="button"
        onClick={() => setStars(5)}
        onKeyDown={() => {}}
        tabIndex={-4}
      >
        ⭐
      </span>
    </SelectStars>
  )
}

export default Stars
