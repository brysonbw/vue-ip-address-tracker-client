<template>
  <!-- Cesium Container -->
  <div id="cesiumContainer" />
  <!-- Overlays -->
  <!-- Button Overlay -->
  <div v-if="showOverlay" class="overlay-button-container">
    <v-tooltip
      location="top"
    >
      <template #activator="{ props }">
        <v-btn
          color="#212121"
          icon="mdi-earth-minus"
          style="border: 0.5px solid #424242"
          v-bind="props"
          @click="resetCameraViewGlobe"
        />
      </template>
      <span>Reset Camera</span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
  import 'cesium/Build/Cesium/Widgets/widgets.css'
  import { computed } from 'vue'
  import { useCesiumStore } from '@/stores/cesium'
  import { useAppStore } from '@/stores/app'

  // Stores
  const cesiumStore = useCesiumStore()
  const appStore = useAppStore()

  // Computed
  const showOverlay = computed(() => {
    if (!cesiumStore.error && !cesiumStore.loading && appStore.mapLoaded) {
      return true
    }
    return false
  })

  // Methods
  function resetCameraViewGlobe () {
    cesiumStore.flyTo({ lat: '37.0902', lon: '-95.7129', height: 30000000 })
  }
</script>

<style>
</style>
