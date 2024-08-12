import * as Cesium from 'cesium'

export type AppStore = {
    apiFullPath: string
    userIP: string | null,
    ipInfo: {
      city?: string | null,
      country?: string | null,
      hostname?: string | null
      ip?: string | null,
      loc?: string | null,
      lat?: string | null,
      lon?: string | null,
      org?: string | null,
      ans?: string | null,
      isp?: string | null,
      postal?: string | null,
      region?: string | null,
      timezone?: string | null
    }
    acceptedGeolocation: boolean
    webglEnabled: boolean
    mapLoaded: boolean
  }

export type CesumStore = {
    loading: boolean,
    error: any,
    cesium: {
      viewer: Cesium.Viewer | null
    }
  }

export type Toast = {
  show?: boolean,
  message: string,
  type: 'success' | 'warning' | 'info' | 'error',
  duration?: number,
}

export type ToastStore = {
    toast: Toast,
  }
