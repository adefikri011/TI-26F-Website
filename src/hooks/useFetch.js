import { useCallback, useEffect, useState } from 'react'

export function useFetch(fetcher) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshIndex, setRefreshIndex] = useState(0)

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    setRefreshIndex((i) => i + 1)
  }, [])

  useEffect(() => {
    let active = true
    fetcher()
      .then((d) => {
        if (active) setData(d)
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [refreshIndex, fetcher])

  return { data, loading, error, refetch }
}
