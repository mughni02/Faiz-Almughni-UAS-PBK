import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const activeSection = ref('home')
  const isScrolled = ref(false)
  const sections = ['home', 'tentang', 'produk', 'kontak']

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    isScrolled.value = scrollTop > 100

    // Determine active section based on scroll position
    const windowHeight = window.innerHeight
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          activeSection.value = sectionId
        }
      }
    })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      activeSection.value = sectionId
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    activeSection,
    isScrolled,
    scrollToSection
  }
}