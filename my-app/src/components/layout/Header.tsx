import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { ShoppingCart } from 'lucide-react'

const Header = () => {
  const {user,logout} = useUser()
  return (
    <div className='bg-purple-600'>
      <div className='flex font-bold text-[18px] justify-between items-center p-6 text-white'>
      <div className="">Logo</div>
      <div className="gap-16 flex">
        <Link to={'/'}>Home</Link>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/tasks'}>Tasks</Link>
        <Link to={'/accordion'}>Accordion</Link>
        <Link to={'/products'}>Products</Link>
      </div>
      <div className="flex items-center gap-5">
        <Link to={'/cart'} className=' border-[2px] p-2 rounded-md'><ShoppingCart /> </Link>
       {user?
       <button className='bg-white p-2 text-black font-semibold rounded-md' onClick={()=>logout()}>Logout</button>
       :
       <Link to={'/login'}>Login</Link>
      }
      </div>
    </div>
    </div>
  )
}

export default Header
