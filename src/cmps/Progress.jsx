import React from "react";

export function Progress({ value: value, max }) {
  console.log("Progress -> value, max", value, max)


  function getClass() {
    if (value > 10) return 'green'
    if (value > 5) return 'blue'
     return 'red'
  }

  return (
    <div className="progress-bar">
      {/* <span style="width: 80%;"></span> */}
      <span className={getClass()} style={{ width: `${(+value / max) * 100}%` }}></span>
    </div>
  )
}

