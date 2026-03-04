// src/hooks/useApi.js
// Generic data-fetching hook used by every page that talks to the backend.
// Usage:
//   const { data, loading, error, refetch } = useApi("/blogs");

import { useState, useEffect, useCallback } from 'react'
import api from '../api/api'

export default function useApi(endpoint, options = {}) {
  const { params = {}, skip = false } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (skip) return
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(endpoint, { params })
      setData(res.data)
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, skip, JSON.stringify(params)])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
