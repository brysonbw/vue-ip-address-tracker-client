<template>
  <v-form
    ref="form"
    validate-on="submit"
    @submit.prevent="onSubmit"
  >
    <!-- IP Text Field -->
    <v-text-field
      v-model="input"
      class="mx-auto"
      clearable
      density="compact"
      :disabled="loading"
      :loading="loading"
      max-width="500px"
      placeholder="Search for IP address"
      prepend-inner-icon="mdi-magnify"
      required
      :rules="ipRules"
    >

      <!-- Appending Buttons -->
      <template #append-inner>
        <!-- Send IP Button -->
        <v-tooltip
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :disabled="loading || !input"
              icon
              :loading="loading"
              variant="plain"
              @click.prevent="onSubmit"
            >
              <v-icon color="grey-lighten-1">
                mdi-send
              </v-icon>
            </v-btn>
          </template>
          <span>Track IP</span>
        </v-tooltip>
      </template>

      <template #append>
        <!-- Use User IP Address Button -->
        <v-tooltip
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              :disabled="loading || input === userIP"
              icon
              :loading="loading"
              variant="plain"
              v-bind="props"
              @click="getUserIP"
            >
              <v-icon color="grey-lighten-1">
                mdi-map-marker
              </v-icon>
            </v-btn>
          </template>
          <span>Use My IP Address</span>
        </v-tooltip>
      </template>
    </v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useCesiumStore } from '@/stores/cesium'
  import { useAppStore } from '@/stores/app'
  import { useToastStore } from '@/stores/toast'
  import { IFormMethods } from '@/types'
  import { regex } from '@/utils/regex'

  // Stores
  const cesiumStore = useCesiumStore()
  const appStore = useAppStore()
  const toastStore = useToastStore()

  // Refs
  const input = ref<string>('')
  const form = ref<IFormMethods | null>(null)
  const loading = ref<boolean>(false)

  // Computed
  const userIP = computed(() => {
    return appStore.userIP
  })

  const acceptedGeolocation = computed(() => {
    return appStore.acceptedGeolocation
  })

  // Validation rules
  const ipRules = [
    (v: string) => !!v || 'IP is required',
    (v: string) => {
      if (regex.ipv4.test(v) || regex.ipv6.test(v)) {
        return true
      }
      return 'Invalid IP'
    },
  ]

  // Methods
  async function onSubmit () {
    if (form.value) {
      const { valid } = await form.value.validate()
      if (valid) {
        if (!acceptedGeolocation.value && input.value === appStore.userIP) {
          toastStore.initToast({ message: 'Geolocation access denied. Enable access or try different IP.', type: 'info', duration: 9000 })
          return
        }
        loading.value = true
        const result = await plotIpAddress(input.value)
        if (result.status) {
          toastStore.initToast({ message: 'IP tracked successfully!', type: 'success' })
          input.value = ''
        }
        if (!result.status) {
          toastStore.initToast({ message: 'Could not track IP. Please check network and/or try again.', type: 'error', duration: 7000 })
        }
        loading.value = false
      }
    }
  }

  async function plotIpAddress (ipAddress: string) {
    // Check if ip/entity already plotted - fly to and don't fetch
    if (ipAddress === appStore.ipInfo.ip) {
      const entityFound = await cesiumStore.getEntityById(input.value)
      if (entityFound.status) {
        await cesiumStore.flyTo({ lat: appStore.ipInfo.lat as string, lon: appStore.ipInfo.lon as string })
        return { status: true }
      }
    }
    try {
      const result = await appStore.getIpAddressData(ipAddress)
      if (!result.status) throw new Error('Could not retrieve IP info')
      const { ip, lat, lon } = result.data
      appStore.ipInfo = {
        ...result.data,
      }
      const name = `${ipAddress === appStore.userIP ? 'YOU\n' : ''}${appStore.ipInfo.isp ?? ''}\n${appStore.ipInfo.ip}`
      await cesiumStore.removeAllEntities()
      await cesiumStore.addEntity({ ip: ipAddress || ip, name, lat, lon, flyTo: true })
      return { status: true }
    } catch (error) {
      console.error(error)
      return { status: false }
    }
  }

  async function getUserIP () {
    if (!userIP.value) {
      console.log('fetching user ip...')
      loading.value = true
      const result = await appStore.getUserIpAddress()
      loading.value = false
      if (!result.status) {
        toastStore.initToast({ message: 'Could not retrieve your IP. Please check network and/or try again.', type: 'error', duration: 7000 })
        return
      }
    }
    toastStore.initToast({ message: 'Retrieved IP successfully!', type: 'success' })
    input.value = userIP.value as string
  }
</script>
