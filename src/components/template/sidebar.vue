<template>
    <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/"><i class="icon-speedometer"></i> Dashboard</router-link>
        </li>
        <li>
          <a href="#masterMenu" class="nav-link" data-toggle="collapse" ><i class="icon-cursor"></i> Master</a>
          <ul>
            <li class="nav-item collapse" id="masterMenu">
              <router-link to="/user"><i class="icon-cursor"></i> Data User</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/kab"><i class="icon-cursor"></i> Data Kabupaten</router-link>
          <router-link to="/kec"><i class="icon-cursor"></i> Data Kecamatan</router-link>
          <router-link to="/desa"><i class="icon-cursor"></i> Data Desa</router-link>
          <router-link to="/agen"><i class="icon-cursor"></i> Data Agen</router-link>
          <router-link to="/desk"><i class="icon-cursor"></i> Data Desk</router-link>
        </li>
        <li>
          <a href="javascript:void(0)" v-on:click="logout"><i class="fa fa-sign-out"></i> Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
    export default {
        methods: {
        logout () {
        this.$session.destroy()
        this.$router.push('/login')
      }
    }
    }
</script>
