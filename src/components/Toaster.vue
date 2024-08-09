<template>
  <v-snackbar
    v-model="toast.show"
    :absolute="true"
    color="white"
    :location="'bottom'"
    :timeout="toast.duration"
  >
    <v-icon :color="toast.type" :icon="typeIconMap[toast.type]" />
    {{ toast.message }}
    <template #actions>
      <v-btn
        color="pink"
        variant="text"
        @click="close"
      >Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useToastStore } from '@/stores/toast'

  // Stores
  const toastStore = useToastStore()

  const typeIconMap = {
    success: 'mdi-check-circle',
    warning: 'mdi-alert',
    info: 'mdi-information',
    error: 'mdi-alert-circle',

  }

  // Computed
  const toast = computed(() => {
    return toastStore.toast
  })

  // Methods
  function close () {
    toast.value.show = false
  }
</script>

<style scoped>

</style>
