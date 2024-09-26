<div align="center">
  <img height="250x" alt="dictionary-app-logo" src="https://res.cloudinary.com/ddlhtsgmp/image/upload/v1723136254/ip_address_tracker_logo.png" />

<br />
  <h1>IP Address Tracker</h1>

IP Address Tracker (web app). Track and analyze IP addresses. Utilize the app to view the location of any IP address on a [Cesium](https://cesium.com/platform/cesiumjs/) map and retrieve detailed information through the [IPinfo API](https://ipinfo.io/) via an API proxy.

</div>

## Running Locally

```bash
git clone git@github.com:brysonbw/vue-ip-address-tracker-client.git
```

```bash
cd vue-ip-address-tracker-client
```

```bash
rm -rf .git
```

### Install

```bash
pnpm install
```

### .env

```text
VITE_CESIUM_ION_TOKEN=
VITE_API_URL=
VITE_API_BASE_PATH=
VITE_BILLBOARD_IMAGE_URL=
```

- **[Cesium Ion](https://ion.cesium.com/)**: Signup or login to see and/generate your token
- **Api URL**: URL of API Proxy
- **Api Base Path**: API Base path of URL. For example, `/api/v1`
- **(Cesium) Billboard Image URL**: Uploaded image URL on Amazon s3, Cloudinary, or anywhere else that's similar

### Developing

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Server
https://github.com/brysonbw/deno-ip-address-tracker-api-proxy

### Build

```bash
pnpm run build
```
