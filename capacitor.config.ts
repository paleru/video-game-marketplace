import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TDS200_1015',
  webDir: 'dist',
  bundledWebRuntime: false,
  "server" : {
    "url" : "http://localhost:8100/" // Address of the server running locally
    }
};



export default config;
