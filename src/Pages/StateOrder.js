import React from 'react'
import { useParams } from "react-router-dom";
function StateOrder() {
  let { pending, success } = useParams();
  return (
    <>

  <h1>Order State</h1>
  <p>Pending: {pending}</p>
  <p>Success: {success}</p>

      
    </>
  )
}

export default StateOrder
