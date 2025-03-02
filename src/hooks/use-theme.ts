import { ref, watch } from 'vue'
import { lighten, darken } from '@/utils/colors'

const THEME_COLOR = 'THEME_COLOR'
const THEME_MODE = 'THEME_MODE'

export const useTheme = () => {
  const themeColors = ref([
    { color: '#2d6af6', themeColor: 'pureBlue', label: '纯蓝' },
    { color: '#f5222d', themeColor: 'scarlet', label: '猩红' },
    { color: '#fa541c', themeColor: 'orangeRed', label: '橙红' },
    { color: '#fadb14', themeColor: 'gold', label: '金色' },
    { color: '#13c2c2', themeColor: 'emerald', label: '绿宝石' },
    { color: '#52c41a', themeColor: 'limeGreen', label: '石灰绿' },
    { color: '#eb2f96', themeColor: 'deepPink', label: '深粉' },
    { color: '#722ed1', themeColor: 'deepViolet', label: '深紫' }
  ])

  const themeColor = ref(localStorage.getItem(THEME_COLOR) ?? 'pureBlue')
  const themeMode = ref<'light' | 'dark'>((localStorage.getItem(THEME_MODE) as any) ?? 'light')
  const setPropertyPrimary = (mode: string, i: number, color: string) => {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      themeMode.value === 'dark' ? darken(color, i / 10) : lighten(color, i / 10)
    )
  }

  const setElementPlusProperty = (color: string) => {
    document.documentElement.style.setProperty('--el-color-primary', color)
    for (let i = 1; i <= 2; i++) {
      setPropertyPrimary('dark', i, color)
    }
    for (let i = 1; i <= 9; i++) {
      setPropertyPrimary('light', i, color)
    }
  }

  const changeThemeColor = (item) => {
    themeColor.value = item.themeColor
    localStorage.setItem(THEME_COLOR, item.themeColor)
  }

  const changeThemeMode = (mode) => {
    themeMode.value = mode
    localStorage.setItem(THEME_MODE, mode)
  }

  const updateThemeColor = () => {
    const target = themeColors.value.find((item) => item.themeColor === themeColor.value)
    if (!target) return
    setElementPlusProperty(target.color)
  }

  const updateThemeMode = () => {
    if (themeMode.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    updateThemeColor()
  }

  watch(themeColor, updateThemeColor, { immediate: true })

  watch(themeMode, updateThemeMode, { immediate: true })

  return {
    themeColors,
    themeColor,
    themeMode,
    changeThemeColor,
    changeThemeMode
  }
}
