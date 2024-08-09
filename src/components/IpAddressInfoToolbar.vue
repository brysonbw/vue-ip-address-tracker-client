<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-card
      v-if="show"
      class="mx-auto text-center"
      color=""
      flat
      max-width="800px"
      rounded="md"
    >
      <v-container class="pa-0 ma-0" fluid>
        <v-row class="d-flex align-center flex-nowrap" no-gutters>
          <!-- IP -->
          <v-card
            class="mx-auto"
            color="transparent"
            elevation="0"
            max-width="344"
          >
            <v-card-subtitle class="text-caption font-weight-light">IP Address</v-card-subtitle>
            <v-card-subtitle class="text-white font-weight-bold">{{ ipInfo.ip }}</v-card-subtitle>
          </v-card>

          <v-divider vertical />

          <!-- Location -->
          <v-card
            class="mx-auto"
            color="transparent"
            elevation="0"
            max-width="344"
          >
            <v-card-subtitle class="text-caption font-weight-light">Location</v-card-subtitle>
            <v-card-subtitle class="text-white font-weight-bold">{{ location.city }}, {{ location.region }}</v-card-subtitle>
            <v-card-subtitle class="text-white font-weight-bold">{{ location.country }}, {{ location.postal }}</v-card-subtitle>
          </v-card>

          <v-divider vertical />

          <!-- Timezone -->
          <v-card
            class="mx-auto"
            color="transparent"
            elevation="0"
            max-width="344"
          >
            <v-card-subtitle class="text-caption font-weight-light">Timezone</v-card-subtitle>
            <v-card-subtitle class="text-white font-weight-bold">{{ timezone.ipTimezone }}</v-card-subtitle>
            <v-card-subtitle class="text-white font-weight-bold">{{ timezone.now }}</v-card-subtitle>
          </v-card>

        </v-row>
      </v-container>
    </v-card>
    <!--No Data Placeholder-->
    <h3 v-if="!show" class="text-center mt-2 text-body-2 text-grey-darken-1">No IP Information To Display</h3>
  </v-container>
</template>

<script setup lang="ts">
  import moment from 'moment-timezone'
  import { useAppStore } from '@/stores/app'

  // Stores
  const appStore = useAppStore()

  // Computed
  const ipInfo = computed(() => {
    return appStore.ipInfo
  })
  const ip = computed(() => {
    return ipInfo.value.ip
  })
  const location = computed(() => {
    const { city, region, country, postal } = ipInfo.value
    return {
      city,
      region,
      country,
      postal,
    }
  })
  const timezone = computed(() => {
    const ipTimezone = ipInfo.value.timezone as string
    const now = moment.tz(ipTimezone).format('h:mm a z')
    return {
      ipTimezone,
      now,
    }
  })
  const show = computed(() => {
    if (!ip.value || !location.value || !timezone.value) {
      return false
    }
    return true
  })
</script>

<style scoped>
</style>
