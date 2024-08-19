import { ref } from 'vue'

export function useGrid(selector, options = {}) {
  const gridOptions = ref(options)
  /* подключение скрипта */

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js'
    )

    document.head.appendChild(script)

    script.onload = () => {
      const myGridElement = document.querySelector(selector)
      // eslint-disable-next-line no-undef
      const grid = agGrid.createGrid(myGridElement, gridOptions.value)
      resolve(grid)
    }

    script.onerror = () => reject(new Error('Ошибка загрузки скрипта'))
  })
}
