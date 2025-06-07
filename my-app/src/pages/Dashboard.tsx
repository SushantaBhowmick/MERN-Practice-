import { useUser } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const {user} = useUser()
    // const navigate = useNavigate();
    console.log(user);

  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <h1 className='text-[20px] font-semibold'>Welcome Back {user?.name}</h1>
    </div>
  )
}

export default Dashboard
