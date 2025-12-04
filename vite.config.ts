import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import path from 'path'
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
    routeFileIgnorePrefix: "-",
    quoteStyle: "single"
  }), react(), svgr(), sentryVitePlugin({
    org: "valhalla",
    project: "portfolio_client"
  })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@Components": `${path.resolve(__dirname, "./src/components/index.ts")}`,
      "@Component": `${path.resolve(__dirname, "./src/components")}`,
      "@Public": `${path.resolve(__dirname, "./public/")}`,
      "@Sections": path.resolve(__dirname, "./src/app/sections"),
      "@Types": `${path.resolve(__dirname, "./src/types/index.ts")}`,
      "@Type": `${path.resolve(__dirname, "./src/types")}`,
      "@Context": `${path.resolve(__dirname, "./src/context")}`,
      "@Utils": `${path.resolve(__dirname, "./src/utils")}`,
      "@Database": `${path.resolve(__dirname, "./src/database")}`,
      "@Assets": `${path.resolve(__dirname, "./src/assets")}`,
      "@App": `${path.resolve(__dirname, "./src/app")}`,
      "@Fonts": `${path.resolve(__dirname, "./src/assets/fonts")}`,
      "@Hooks": `${path.resolve(__dirname, "./src/hooks")}`,
      "@Constants": `${path.resolve(__dirname, "./src/constants")}`,
      "@Firebase": `${path.resolve(__dirname, "./src/config/firebase.config.ts")}`,
      "@Styles": `${path.resolve(__dirname, "./src/styles/components")}`,
      "@Style": `${path.resolve(__dirname, "./src/styles/global.css")}`,
      "@Theme": `${path.resolve(__dirname, "./src/styles/theme.css")}`,
      "@Window": `${path.resolve(__dirname, "./src/config/window.config.ts")}`,
      "@Layout": `${path.resolve(__dirname, "./src/app/layout")}`,
    }
  },

  build: {
    sourcemap: true
  }
})