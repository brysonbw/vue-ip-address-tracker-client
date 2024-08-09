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
  const appStore = useAppStore()
  const toastStore = useToastStore()

  // On init ask user for permission to know location
  async function requestLocation () {
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

  requestLocation()
</script>
