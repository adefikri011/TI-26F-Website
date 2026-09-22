import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import WaxSeal from '../../components/ui/WaxSeal'

export function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? 'Email atau password salah.' : err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-inkbrown flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-parchment border-4 border-gold rounded-md p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <WaxSeal />
          <h1 className="font-display text-3xl text-maroon mt-4">Admin Portal</h1>
          <p className="font-body italic text-inkbrown/70 mt-1">
            TI26F — Restricted Area
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-body text-sm mb-1 text-inkbrown">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/60 border border-inkbrown/30 rounded font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-body text-sm mb-1 text-inkbrown">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/60 border border-inkbrown/30 rounded font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-maroon bg-maroon/10 border border-maroon/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full font-display bg-maroon text-gold py-3 rounded border-2 border-gold hover:bg-gold hover:text-maroon transition-colors disabled:opacity-60"
          >
            {submitting ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>

        <p className="font-body text-xs text-inkbrown/60 text-center mt-6">
          Hanya untuk admin kelas TI26F
        </p>
      </div>
    </div>
  )
}
