<template>
  <v-container class="d-flex h-screen justify-center align-center" fluid>
    <v-row class="d-flex flex-column" no-gutters>
      <!-- Progress Spinner -->
      <v-col class="d-flex justify-center" cols="12">
        <v-progress-circular
          :color="props.color"
          indeterminate
          :size="props.size"
          :width="props.width"
        />
      </v-col>
      <!-- Loading Text -->
      <v-col class="d-flex justify-center mt-3" cols="12">
        <p>{{ text }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    size: {
      type: String,
      required: false,
      default: '70',
    },
    width: {
      type: String,
      required: false,
      default: '7',
    },
    text: {
      type: String,
      required: false,
      default: 'Loading Map...',
    },
  })
</script>
<style scoped>

</style>
