import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength]=useState(6)
  const[numAllowed,setNumAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState('')
  const[btntext,setBtntext]=useState("Copy")

  const passwordRef=useRef()

  const PasswordGenerator=useCallback(()=>{
    let pass=""
    let str="ASDFGHJKLZXCVBNMQWERTYUIOPwertyuiopzxcvbnmkjhgfdsa"
    if(numAllowed) str+= "1234567890"
    if(charAllowed) str+= "!@#$%^&*"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random() * str.length + 1);
      pass+= str.charAt(char)
    }
    setPassword(pass)
    setBtntext("Copy")

  },[length,numAllowed,charAllowed,setPassword])

  useEffect(()=>{
    PasswordGenerator()
  },[length,numAllowed,charAllowed,PasswordGenerator])

const CopyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
  setBtntext("Copied✅")
},[password])

  return (
    <div className="flex justify-center items-center w-full h-screen bg-no-repeat bg-cover" style={{backgroundImage:`url(https://media.istockphoto.com/id/1142665514/photo/abstract-glowing-digital-background-binary-numbers.jpg?s=612x612&w=0&k=20&c=SvgFpmWTqjsY8-Jxm0-9fpgL6pJjENwTnA0-6zQm4Nc=)`}}>
   <div className='w-2/5 max-w-[500px]  px-10 bg-black text-white rounded-2xl opacity-30 relative z-1 h-80'>
   </div>
   <div className='text-white px-16 w-2/5 max-w-[500px] bg-transparent absolute z-2'>
    <h1 className='text-center mb-10 text-3xl font-semibold text-orange-500'>Password Generator App</h1>
    <div className=' flex w-full rounded-3xl overflow-hidden '>
      <input type="text" 
      className='px-4 py-1 w-full outline-none text-black'
      placeholder='Copy your password here'
      value={password}
      ref={passwordRef}
      readOnly
      />
      <button 
      className='px-4 py-1 font-semibold text-xl bg-orange-500 hover:bg-orange-700'
      onClick={CopyPasswordToClipboard}
      >{btntext}</button>
    </div>
    <div className='flex flex-col gap-y-3 mt-10 text-lg '>
      <div className='flex gap-x-10'>
        <input type="range" 
        min={6}
        max={16}
        value={length}
        onChange={(e)=>setLength(e.target.value)}
        />
        <label htmlFor="">Length :{length}</label>
      </div>
      <div className='flex gap-x-7 '>
        <input type="checkbox" name="" id="number" 
        defaultChecked={numAllowed}
       onChange={()=>setNumAllowed(prev=>!prev)}
        />
        <label htmlFor="number">Number Allowed</label>
      </div>
      <div className='flex gap-x-6'>
        <input type="checkbox" name="" id="character" 
        defaultChecked={charAllowed}
        onChange={()=>setCharAllowed(prev=>!prev)}
        />
        <label htmlFor="character">Character Allowed</label>
      </div>
    </div>

   </div>

    </div>
  )
}

export default App
