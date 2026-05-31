import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
import {UserList} from './pages/UserList'
import {UserDetails} from './pages/UserDetails'
import {UserForm} from './pages/UserForm'

function App() {
  return(
    <BrowserRouter>
    <div className ="min-h-screen bg-gray-50 text-gray-900 font sans p-4">
      <header className = "max-w-6xl mx-auto py-6 mb-8 border-b border-gray-200 flex justify-between items-center">
        <Link to ="/users" className="hover:opacity-80 transition-opacity">
          <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
        </Link>
        <Link
          to="/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            + New User
          </Link>
      </header>

    <main className = "max-w-6xl mx-auto">
      <Routes>
            <Route path="/users" element={<UserList/>}/>

            <Route path="/users/new" element={<UserForm/>}/>
            <Route path="/users/edit/:id" element={<UserForm/>}/>
            
            <Route path="/users/:id" element={<UserDetails/>}/>
            <Route path="/" element={<Navigate to="/users" replace />} />
          </Routes>
    </main>
    </div>
    </BrowserRouter>
  )
}

export default App