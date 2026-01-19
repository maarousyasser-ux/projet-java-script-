export async function fetchAPI(url) {
    try {
      const res = await fetch(url)
      return await res.json()
    } catch {
      return []
    }
  }
  