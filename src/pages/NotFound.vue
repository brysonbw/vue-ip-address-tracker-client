<template>
  <v-container class="d-flex justify-center align-center fill-height" fluid>
    <v-card class="mx-auto bg-transparent" max-width="344" width="400">
      <!-- 404 Not Found Message -->
      <v-card-text class="text-center">
        <p class="text-h5 font-weight-black text-info">404 Page Not Found</p>
        <div class="text-white mt-2">
          <span><em class="text-grey-lighten-1">{{ route.path }} </em></span>
        </div>
        <div class="text-white mt-2">
          Page does not exist
        </div>
      </v-card-text>
      <!-- Back to Home Link-->
      <div class="text-center">
        <router-link to="/">Go back to Home</router-link>
      </div>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  // Router
  const route = useRoute()
</script>
