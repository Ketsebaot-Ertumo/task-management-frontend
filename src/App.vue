<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; 2024 Task Management App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
/* Add your global styles here */
</style>




<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Task Management App"/>
  <ul>
    <li><router-link to="/task">Dashboard</router-link></li>
    <li><router-link to="/task/create">Create Task</router-link></li>
  </ul>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

