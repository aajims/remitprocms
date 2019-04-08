<template>
    <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button">☰</button>
    <a class="navbar-brand" href="#"><img class="logod" src="static/images/Logo RemitPro.png"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" href="#">☰</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
          <span class="d-md-down-none">{{ name }}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <router-link to="/profil" class="prof"><i class="fa fa-user"></i> Profil</router-link><br>
          <router-link to="/auth/logout" class="prof"><i class="fa fa-sign-out"></i> Logout</router-link>
        </div>
      </li>
      <li class="nav-item d-md-down-none">
        <a class="nav-link navbar-toggler" href="#">☰</a>
      </li>
    </ul>
  </header>
</template>

<script>
    export default {
        data: function () {
    return {
      name: null
    }},
    mounted() {
      if (this.$session.has('token')) {

          this.$router.push('/')
          
      }
      this.name = this.$session.get('name')
  },
    }
</script>
