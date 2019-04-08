<template>
  <div id="app">
    <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
      <div v-if="this.$session.get('token')">
    <topbar-nav></topbar-nav>
    <div class="app-body">
      <sidebar-nav></sidebar-nav>
      <main class="main">
        <router-view/>
      </main>
    </div>
    <footer-nav></footer-nav>
    </div>
    <div v-else>
      <router-view/>
    </div>
    </body>
  </div>
</template>

<script>
  import TopbarNav from './components/template/topbar.vue'
  import SidebarNav from './components/template/sidebar.vue'
  import FooterNav from './components/template/footer.vue'

export default {
  name: 'App',
  components: { TopbarNav, SidebarNav, FooterNav }
}
</script>

