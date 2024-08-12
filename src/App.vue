<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from './stores/app'
  import { useToastStore } from './stores/toast'

  // Stores
  const appStore = useAppStore()
  const toastStore = useToastStore()

  /**
   * On App init (before component mounts)
   * @usage Init API calls, listeners, checks, ect...
   */
  async function onCreated () {
    await detectWebGL().then(async isWebGLEnabled => {
      console.log('is WebGL enabled: ', isWebGLEnabled)
      if (isWebGLEnabled) {
        appStore.webglEnabled = true
        await requestGeolocation()
      } else {
        const message = 'Your browser or device may not support WebGL.'
        toastStore.initToast({ message, type: 'error', duration: 9000 })
        throw new Error(message)
      }
    }).catch(error => {
      console.error(error)
    })
  }

  /**
   * Detect if WebGL enabled for browser
   */
  async function detectWebGL () {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return gl instanceof WebGLRenderingContext
  }

  /**
   * Request user Geolocation
   */
  async function requestGeolocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  function success () {
    appStore.acceptedGeolocation = true
  }

  function error (error: any) {
    console.error(error.message)
    appStore.acceptedGeolocation = false
    toastStore.initToast({ message: 'Geolocation access denied. See your browser settings to allow access.', type: 'info', duration: 9000 })
  }

  onCreated()
</script>
