import { useRouter } from 'vue-router'

export function useScrollTo() {
  const router = useRouter()

  function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    router.push({ path: '/', hash: `#${sectionId}` })
  }

  return { scrollToSection }
}
