import { Loader2 } from 'lucide-react'

const loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <Loader2 className='size-24 animate-spin text-white'/>
    </div>
  )
}

export default loading