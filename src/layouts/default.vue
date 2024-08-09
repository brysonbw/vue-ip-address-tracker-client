<template>
  <v-app>
    <!-- Navbar -->
    <TheNavbar v-if="!loading && !error && isFoundRoute" />
    <!-- Content -->
    <v-main>
      <router-view />
    </v-main>
    <!-- Toast -->
    <Toaster />
  </v-app>
</template>

<script lang="ts" setup>
  import { useCesiumStore } from '@/stores/cesium'

  // Stores
  const cesiumStore = useCesiumStore()

  // Router
  const route = useRoute()

  // Check if the current route is a found route
  const isFoundRoute = computed(() => {
    const name = route.name as string
    if (name === 'NotFound') {
      return false
    }
    return true
  })

  // Computed
  const error = computed(() => {
    return cesiumStore.error
  })
  const loading = computed(() => {
    return cesiumStore.loading
  })
</script>
