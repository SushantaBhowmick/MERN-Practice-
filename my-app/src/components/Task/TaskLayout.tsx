import TaskHeader from './TaskHeader'
import { Outlet } from 'react-router-dom'

const TaskLayout = () => {
  return (
    <div>
      <TaskHeader />
      <Outlet />
    </div>
  )
}

export default TaskLayout
