import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex justify-center items-center h-screen gap-1'>
        <h1 className='text-2xl border border-blue-600 p-6'>Hello World</h1>
        <button className='border-3 border-red-700' onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      </div>
    </>
  )
}

export default App
