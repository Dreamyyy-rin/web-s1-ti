import { LoaderCircle } from 'lucide-react'

const Loader = ({size}: {size: number}) => {
  return (
    <LoaderCircle size={size} className='animate-spin' />
  )
}

export default Loader