function Navbar() {
  return (
    <nav className="font-display bg-inkbrown text-gold px-6 py-4 flex justify-between items-center">
      <span className="text-xl">TI26F</span>
      <div className="flex gap-6 text-sm">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/members">Members</a>
        <a href="/schedule">Schedule</a>
        <a href="/gallery">Gallery</a>
      </div>
    </nav>
  )
}
export default Navbar
