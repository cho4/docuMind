import React from 'react'

export default function MessageForm() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
  <div style={{height: "60%" ,boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, width: '100%' }}>
  <textarea placeholder="Type here" style={{paddingTop: "50%", borderRadius: 10, flex: 1, padding: '10px', backgroundColor: '#f5f5f5', border: 'none', resize: 'none', outline: 'none', fontFamily: 'Euclid Circular A, sans-serif', display: 'flex', alignItems: 'center' }} />
  <button type="button" style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: '#f5f5f5', marginLeft: 10 }}>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" style={{ width: 20, height: 20, margin: 'auto', display: 'block' }}>
  <circle cx="15" cy="15" r="14" fill="#5CC2C2" />
  <text x="55%" y="70%" text-anchor="middle" fill="white" transform="rotate(-30 15 15)" font-size="24">{">"}</text>

</svg>



  </button>
</div>




</div>


  )
}
