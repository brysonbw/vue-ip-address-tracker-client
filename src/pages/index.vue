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

  onMounted(async () => {
    const cesiumLoaded = await cesiumStore.loadCesium()
    if (cesiumLoaded.status) {
      if (acceptedGeolocation.value) {
        await appStore.getUserIpAddressData()
      }
      console.log('cesium loaded...')
      appStore.mapLoaded = true
      if (appStore.userIP && appStore.ipInfo.ip && appStore.ipInfo.lat && appStore.ipInfo.lon) {
        console.log('user ip found and fetched, plotting on map...')
        const { userIP } = appStore
        const { lat, lon, isp, ip } = appStore.ipInfo
        const name = `YOU\n${isp ?? ''}\n${userIP || ip}`
        await cesiumStore.addEntity({ ip: userIP || ip, name, lat, lon, flyTo: true })
      }

      const viewer = cesiumStore.cesium.viewer

      // Cesium event listeners
      // Selected entity
      viewer?.selectedEntityChanged.addEventListener(function (selectedEntity) {
        // Disable entity selection and infoBox if entity is NOT IP entity
        if (selectedEntity?.properties?.type === undefined) {
          viewer.selectedEntity = undefined
        }
      })
    }
  })
</script>
