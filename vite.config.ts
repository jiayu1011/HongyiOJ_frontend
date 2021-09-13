import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const path = require('path')

const resolve = pathUrl => path.join(__dirname, pathUrl)


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [reactRefresh()],



})
