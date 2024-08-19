import isEqual from 'lodash.isequal'

export default class DeleteButtonComponent {
  eGui
  eButton
  eventListener
  gridApi

  static users
  init(props) {
    this.eGui = document.createElement('div')
    const eButton = document.createElement('button')
    eButton.className = 'btn-simple'
    eButton.textContent = 'Удалить строку'
    this.gridApi = props.api
    this.eventListener = () => {
      eButton.dispatchEvent(new CustomEvent('delete-row', { bubbles: true, detail: props.data }))
      this.removeRow(props.data)
      DeleteButtonComponent.users.value = DeleteButtonComponent.users.value.filter(
        (row) => !isEqual(row, props.data)
      )
    }
    eButton.addEventListener('click', this.eventListener)
    this.eGui.appendChild(eButton)
  }

  getGui() {
    return this.eGui
  }

  refresh() {
    return true
  }

  destroy() {
    if (this.eButton) {
      this.eButton.removeEventListener('click', this.eventListener)
    }
  }

  removeRow(data) {
    const transaction = {
      remove: [data]
    }
    this.gridApi.applyTransaction(transaction)
  }
}
