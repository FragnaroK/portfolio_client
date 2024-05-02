import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@Components": `${path.resolve(__dirname, "./src/components/")}`,
      "@Public": `${path.resolve(__dirname, "./public/")}`,
      "@Sections": path.resolve(__dirname, "./src/app/sections"),
      "@Types": `${path.resolve(__dirname, "./src/types")}`,
      "@Contexts": `${path.resolve(__dirname, "./src/contexts")}`,
      "@Utils": `${path.resolve(__dirname, "./src/utils")}`,
      "@Database": `${path.resolve(__dirname, "./src/database")}`,
      "@Assets": `${path.resolve(__dirname, "./src/assets")}`,
      "@App": `${path.resolve(__dirname, "./src/app")}`,
      "@Fonts": `${path.resolve(__dirname, "./src/assets/fonts")}`,
    }
  }
})
