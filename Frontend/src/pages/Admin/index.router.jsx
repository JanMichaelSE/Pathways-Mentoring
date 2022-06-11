import { Route, Routes } from 'react-router-dom'

import ManageAssessments from './Manage-Assessments/manage-assessments'
import ManageRecords from './Manage-Records/manage-records'
import ManageUsers from './Manage-Users.jsx/manage-users'
import AdminProfile from './Profile/admin-profile'

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