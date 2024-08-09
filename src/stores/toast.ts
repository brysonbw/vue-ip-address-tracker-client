import { defineStore } from 'pinia'
import { Toast, ToastStore } from './types'

export const useToastStore = defineStore('toast', {
  state: (): ToastStore => ({
    toast: {
      show: false,
      message: '',
      type: 'success',
      duration: 3000,
    },
  }),
  actions: {
    initToast ({ show = true, message, type = 'success', duration = 3000 }: Toast) {
      this.toast = {
        show,
        message,
        type,
        duration,
      }
      const timeoutID = setTimeout(() => {
        this.toast = {
          show: false,
          message: '',
          type: 'success',
          duration: 3000,
        }
      }, duration)

      clearTimeout(timeoutID)
    },
  },
})
