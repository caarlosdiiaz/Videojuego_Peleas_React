import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
//dist(assets(index-Ca449wdD.css y i9ndex-D8bA-9WG.js), imagenes e index.html)
//node_modules
//public (imagenes (se duplicaron en dist))
//src(assets(logoreact.svg), components(player.jsx, player.css), app.css, app.jsx, index.css, main.jsx)