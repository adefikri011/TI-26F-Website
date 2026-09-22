import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { RequireAuth } from '../components/admin/RequireAuth'
import { AdminLayout } from '../components/layout/AdminLayout'
import { AdminLogin } from '../pages/admin/AdminLogin'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AdminMembers } from '../pages/admin/AdminMembers'
import { AdminSchedule } from '../pages/admin/AdminSchedule'
import { AdminGallery } from '../pages/admin/AdminGallery'
import { AdminAnnouncements } from '../pages/admin/AdminAnnouncements'
import Home from '../pages/Home'
import About from '../pages/About'
import Members from '../pages/Members'
import Schedule from '../pages/Schedule'
import Gallery from '../pages/Gallery'
import Announcements from '../pages/Announcements'
import NotFound from '../pages/NotFound'

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/members"
        element={
          <Layout>
            <Members />
          </Layout>
        }
      />
      <Route
        path="/schedule"
        element={
          <Layout>
            <Schedule />
          </Layout>
        }
      />
      <Route
        path="/gallery"
        element={
          <Layout>
            <Gallery />
          </Layout>
        }
      />
      <Route
        path="/announcements"
        element={
          <Layout>
            <Announcements />
          </Layout>
        }
      />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
      </Route>

      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  )
}
export default AppRouter
