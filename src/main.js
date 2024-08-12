import { createApp, provide, h } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import router from './router'

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
    uri: process.env.VUE_APP_API_ENDPOINT,
    cache: new InMemoryCache(),
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
app.use(router);
app.mount('#app')

