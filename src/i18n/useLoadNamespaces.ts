import { useEffect, useState } from 'react'
import i18n, { ensureNamespaces, type LazyNamespace } from './i18n'

export function useLoadNamespaces(namespaces: LazyNamespace[]) {
  const [ready, setReady] = useState(() => namespaces.every((ns) => i18n.hasResourceBundle(i18n.language, ns)))

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        await ensureNamespaces(namespaces)
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    }

    if (!ready) run()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespaces.join('|')])

  return { ready }
}

