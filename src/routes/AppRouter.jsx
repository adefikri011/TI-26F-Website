import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import Members from '../pages/Members'
import Schedule from '../pages/Schedule'
import Gallery from '../pages/Gallery'
import Announcements from '../pages/Announcements'
import NotFound from '../pages/NotFound'

function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
export default AppRouter
