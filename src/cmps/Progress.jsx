import React from "react";

export function Progress({ value: value, max }) {


  function getClass() {
    if (value > 10) return 'green'
    if (value > 5) return 'blue'
    return 'red'
  }

  return (
    <div className="progress-bar">
      <span className={getClass()} style={{ width: `${(+value / max) * 100}%` }}></span>
    </div>
  )
}

