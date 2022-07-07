import { Route, Routes } from 'react-router-dom'

import ManageAssessments from '@/pages/Admin/Manage-Assessments/manage-assessments'
import ManageRecords from '@/pages/Admin/Manage-Records/manage-records'
import ManageUsers from '@/pages/Admin/Manage-Users.jsx/manage-users'
import AdminProfile from '@/pages/Admin/Profile/admin-profile'

function AdminRouter() {
  return (
    <Routes>
      <Route path='/' element={<ManageRecords />}/>
      <Route path='/manage-users' element={<ManageUsers />}/>
      <Route path='/manage-assessments' element={<ManageAssessments />}/>
      <Route path='/profile' element={<AdminProfile />}/>
    </Routes>
  )
}

export default AdminRouter