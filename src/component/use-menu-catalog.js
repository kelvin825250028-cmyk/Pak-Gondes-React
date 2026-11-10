import { useEffect, useState } from 'react'
import { MENU_STORAGE_KEY, readMenu } from './menu-data.js'

export default function useMenuCatalog() {
  const [menuItems, setMenuItems] = useState(readMenu)

  useEffect(() => {
    function syncMenu(event) {
      if (event.key === MENU_STORAGE_KEY || event.key === null) {
        setMenuItems(readMenu())
      }
    }

    window.addEventListener('storage', syncMenu)
    return () => window.removeEventListener('storage', syncMenu)
  }, [])

  return [menuItems, setMenuItems]
}
