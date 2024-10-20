import App from "./defaults/App.vue"

const app = createSSRApp(App)

app.mount('#app')