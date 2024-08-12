<template>
  <v-container class="d-flex justify-center align-center fill-height" fluid>
    <v-card class="mx-auto" max-width="344">
      <!-- Error Text/Content -->
      <v-card-text class="text-center">
        <p :class="['text-h6 font-weight-black', webglEnabled ? 'text-warning' : 'text-red-darken-1']">{{ title }}</p>
        <div class="text-medium-emphasis">
          {{ text }}
        </div>
      </v-card-text>
      <!-- Error Button/Actions -->
      <v-card-actions v-if="!webglEnabled">
        <v-btn
          block
          href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser"
          target="_blank"
          text="Enable WebGL in browser"
          variant="tonal"
        />
      </v-card-actions>
      <v-card-actions>
        <v-btn
          block
          text="Refresh Page"
          variant="tonal"
          @click="refreshPage"
        />
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/app'

  // Stores
  const appStore = useAppStore()

  // Computed
  const webglEnabled = computed(() => {
    return appStore.webglEnabled
  })
  const title = computed(() => {
    if (!webglEnabled.value) {
      return 'WebGL Requried'
    }
    return 'Could Not Load Map'
  })
  const text = computed(() => {
    if (!webglEnabled.value) {
      return 'An error occurred while trying to load the map. Please ensure WebGL is enabled in your browser, check your network connection, or try refreshing the page.'
    }
    return 'An error occurred while trying to load the map. Please check network and/or refresh page.'
  })

  // Methods
  function refreshPage () {
    window.location.reload()
  }
</script>
