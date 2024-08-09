// Utilities
import { fetchClient } from '@/config/fetch'
import { defineStore } from 'pinia'
import { AppStore } from './types'

export const useAppStore = defineStore('app', {
  state: (): AppStore => ({
    apiFullPath: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_BASE_PATH}`,
    userIP: null,
    ipInfo: {
      city: null,
      country: null,
      ip: null,
      loc: null,
      lat: null,
      lon: null,
      postal: null,
      region: null,
      timezone: null,
    },
    acceptedGeolocation: false,
    mapLoaded: false,
  }),
  actions: {
    async getIpAddressData (ipAddress: string | null) {
      if (!ipAddress) {
        return
      }
      const appStore = useAppStore()
      const url = `${appStore.apiFullPath}country,city`
      const result = await fetchClient({
        url,
        parameters: {
          ipAddress,
        },
      })
      if (result.status && result.data) {
        const [lat, lon] = result.data.loc.split(',')
        result.data = {
          ...result.data,
          lat,
          lon,
        }
      }
      return result
    },
    async getUserIpAddress () {
      const url = `https://api.ipify.org?format=json`
      const result = await fetchClient({
        url,
      })
      if (!result.ip) {
        return { status: false }
      }
      this.userIP = result.ip
      return { status: true }
    },
    async getUserIpAddressData () {
      try {
        const result = await this.getUserIpAddress()
        if (!result.status) {
          throw new Error('IP not found')
        }
        const nextResult = await this.getIpAddressData(this.userIP)
        if (!nextResult.status) {
          throw new Error('Could not retrieve IP info')
        }
        this.ipInfo = {
          ...nextResult.data,
        }
      } catch (error: any) {
        console.error(error)
      }
    },
  },
})
