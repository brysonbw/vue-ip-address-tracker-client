<template>
  <!-- Viewer/Globe -->
  <CesiumViewer v-if="!error" />
  <!-- Error Display -->
  <CesiumError v-else />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useCesiumStore } from '@/stores/cesium'

  // Stores
  const cesiumStore = useCesiumStore()

  // Computed
  const error = computed(() => {
    return cesiumStore.error
  })
</script>

<style scoped>

</style>
