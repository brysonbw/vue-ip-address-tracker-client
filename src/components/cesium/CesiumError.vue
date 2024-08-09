<template>
  <v-container class="d-flex justify-center align-center fill-height" fluid>
    <v-card class="mx-auto" max-width="344">
      <!-- Cesium Error Text/Content -->
      <v-card-text class="text-center">
        <p class="text-h6 font-weight-black text-warning">Could Not Load Map</p>
        <div class="text-medium-emphasis">
          An error occurred while trying to load the map. Please check network and/or refresh page.
        </div>
      </v-card-text>
      <!-- Refresh Broweser Button -->
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
// Methods
  function refreshPage () {
    window.location.reload()
  }
</script>
