import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { isLoading, page, nbPages, pageHandler } = useGlobalContext()
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => pageHandler('dec')}>
        Pre
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => pageHandler('inc')}>
        Nxt
      </button>
    </div>
  )
}

export default Buttons
// if it is loading disabled ( we cannot click when it is loading)
