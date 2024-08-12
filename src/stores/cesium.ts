// Utilities
import { defineStore } from 'pinia'
import * as Cesium from 'cesium'
import { CesumStore } from './types'
import { useAppStore } from './app'

export const useCesiumStore = defineStore('cesium', {
  state: (): CesumStore => ({
    loading: false,
    error: null,
    cesium: {
      viewer: null,
    },
  }),
  actions: {
    async loadCesium () {
      const appStore = useAppStore()
      this.loading = true
      try {
        //! WebGL not enabled
        if (!appStore.webglEnabled) {
          throw new Error('Could not load map. Browser or device may not support WebGL.')
        }
        Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN
        const viewer = new Cesium.Viewer('cesiumContainer', {
          terrain: Cesium.Terrain.fromWorldTerrain(),
          baseLayer: new Cesium.ImageryLayer(new Cesium.OpenStreetMapImageryProvider({
            url: 'https://tile.openstreetmap.org/',
          })),
          navigationHelpButton: false,
          infoBox: true,
          baseLayerPicker: false,
          animation: false,
          geocoder: false,
          timeline: false,
          sceneModePicker: false,
          fullscreenButton: false,
          selectionIndicator: true,
          homeButton: false,
        })

        // Add Cesium OSM Buildings, a global 3D buildings layer.
        Cesium.createOsmBuildingsAsync().then(buildingTileset => {
          viewer.scene.primitives.add(buildingTileset)
        })

        // Enable or ensure zoom is enabled
        viewer.scene.screenSpaceCameraController.enableZoom = true

        // Allow zooming using mouse wheel and touch pinch gestures
        viewer.scene.screenSpaceCameraController.zoomEventTypes = [
          Cesium.CameraEventType.WHEEL,
          Cesium.CameraEventType.PINCH,
        ]

        // Adjust maximum and minimum zoom distances
        viewer.scene.screenSpaceCameraController.maximumZoomDistance = 1000000000
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 10

        // Add viewer to pina/cesium state
        this.cesium.viewer = viewer
        return { status: true }
      } catch (error: any) {
        this.error = error
        console.error(error)
        return { status: false }
      } finally {
        this.loading = false
      }
    },
    async addEntity ({ ip, name, lat, lon, flyTo = false }: {ip: string, name: string, lat: string, lon: string, flyTo?: boolean}) {
      const appStore = useAppStore()
      const viewer = this.cesium.viewer
      const isp = name.replaceAll('YOU', '').replaceAll(ip, '')
      viewer?.entities.add({
        id: ip,
        name,
        position: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), 0),
        billboard: {
          image: import.meta.env.VITE_BILLBOARD_IMAGE_URL,
          color: Cesium.Color.BLUE,
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: name,
          font: '14pt monospace',
          fillColor: Cesium.Color.GHOSTWHITE,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          showBackground: true,
          backgroundColor: new Cesium.Color(0.1, 0.1, 0.1, 0.8),
          backgroundPadding: new Cesium.Cartesian2(8, 4),
          pixelOffset: new Cesium.Cartesian2(0, -20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
        properties: {
          type: 'ip',
        },
        description: `
        <div style="
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          color: #212121; 
          padding: 20px; 
        ">
          <h2 style="
            font-size: 24px; 
            color: #0D47A1;
            margin: 0 0 10px; 
          ">
            ${ip === appStore.userIP ? `YOU` : isp ?? ip}
          </h2>
          <p style="
            font-size: 16px; 
            margin: 0 0 5px;
          ">
            <strong>IP:</strong> ${ip}
          </p>
           <p style="
            font-size: 16px; 
            margin: 0 0 5px;
          ">
            <strong>ISP:</strong> ${isp ?? 'Not Found'}
          </p>
          <p style="
            font-size: 16px; 
            margin: 0;
          ">
            <strong>Location:</strong> ${lat} / ${lon}
          </p>
        </div>
      `,
      })

      if (flyTo) {
        await this.flyTo({ lat, lon })
      }

      return { status: true }
    },
    async removeAllEntities () {
      const viewer = this.cesium.viewer
      viewer?.entities.removeAll()
    },
    async removeEntityById (id: string) {
      const viewer = this.cesium.viewer
      viewer?.entities.removeById(id)
    },
    async getEntityById (id: string) {
      const viewer = this.cesium.viewer
      const entity = viewer?.entities.getById(id)
      if (entity === undefined) {
        return { status: false }
      }
      return { status: true, entity }
    },
    async flyTo ({ lat, lon, height = 15000.0 }: {lat: string | number, lon: string | number, height?: string | number}) {
      const viewer = this.cesium.viewer
      viewer?.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), Number(height)),
      })
    },
  },
})
