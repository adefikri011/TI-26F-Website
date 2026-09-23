import Navbar from './Navbar'
import Footer from './Footer'
import MagicCursorTrail from '../ui/MagicCursorTrail'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <MagicCursorTrail />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
