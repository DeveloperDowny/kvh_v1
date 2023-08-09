import React, { useEffect } from 'react'
import APIRequests from '../api'

const TestComponent = () => {

  const mfetch = async () => {
    const res = await APIRequests.mtest();
  }

  useEffect(() => {
    console.log('TestComponent mounted.')
    mfetch();
  }, [])
  return (
    <div className="t-bg-blue-500 t-text-white t-p-4">
    <h1 className="t-text-2xl t-font-bold">Hello, Tailwind CSS!</h1>
    <p className="t-mt-2">Tailwind CSS is awesome!</p>
  </div>
  )
}

export default TestComponent