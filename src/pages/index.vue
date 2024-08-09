<template>
  <LoadingIndicator v-if="loading" />
  <TheMap v-if="!loading" />
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { useCesiumStore } from '@/stores/cesium'
  import { useAppStore } from '@/stores/app'

  // Stores
  const cesiumStore = useCesiumStore()
  const appStore = useAppStore()

  // Computed
  const loading = computed(() => {
    return cesiumStore.loading
  })

  const acceptedGeolocation = computed(() => {
    return appStore.acceptedGeolocation
  })

  // On init/created
  // Fetch IP and IP info from current anonymous user
  if (acceptedGeolocation.value) {
    await appStore.getUserIpAddressData()
  }

  onMounted(async () => {
    const cesiumLoaded = await cesiumStore.loadCesium()
    if (cesiumLoaded.status) {
      console.log('cesium loaded...')
      appStore.mapLoaded = true
      if (appStore.userIP && appStore.ipInfo.ip && appStore.ipInfo.lat && appStore.ipInfo.lon) {
        console.log('user ip found and fetched, plotting on map...')
        const { userIP } = appStore
        const { lat, lon, isp, ip } = appStore.ipInfo
        const name = `YOU\n${isp ?? ''}\n${userIP || ip}`
        await cesiumStore.addEntity({ ip: userIP || ip, name, lat, lon, flyTo: true })
      }
    }
  })
</script>
