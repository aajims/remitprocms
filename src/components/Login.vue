<template>
    <div>
        <div class="container">
    <div align="center">
        <img class="logos" src="static/images/Logo RemitPro.png">
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6 col-sm-6">
            <div class="card p-4">
                <div class="card-body">
                    <h2>Welcome to Dashboard</h2>
                    <p class="text-muted">Sign In to your account</p>
                    <div class="alert alert-danger" v-for="error in errors">
                        <p>{{ error }}</p>
                    </div>
                    <form role="form" @submit.prevent="login">
                        <div class="input-group mb-3">
                            <input type="text" name="email" class="form-control" placeholder="Email" v-model="email" autofocus/>
                        </div>
                        <div class="input-group mb-4">
                            <input type="password" name="password" class="form-control" v-model="password" placeholder="Password" >
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button type="submit" class="btn btn-primary px-4">Login</button>
                            </div>
                            <div class="col-6 text-right">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data: function () {
    return {
      email: null,
      password: null,
      sukses: null,
      errors: null
    }
  },
  errors: function (resp) {
    app.errors.push(resp.response.data.msg);
    app.email = null;
    app.password = null;
},
  mounted() {
      if (this.$session.has('token')) {
          this.$router.push('/')
      }
  },
  methods: {
    login () {
      this.errors = []
      if (this.email == null) {
        this.errors.push('Email User Harus di isi !')
        return false
      } else if (this.password == null) {
        this.errors.push('Password harus di isi !')
        return false
      }
        // console.log(this.email)
      var app = this
      axios({
        method: 'post',
        url: 'http://localhost:8000/auth/login',
        // url: 'http://178.128.221.185:8000/auth/login',
        data: {
          email: this.email,
          password: this.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
      }).catch(function(res){
            app.errors = res.response.data.msg
        }).then(function(res){
            app.$session.set('token', res.data.token)
            app.$session.set('name', res.data.name)
            app.$router.push('/')
        })
    }
  }
}
</script>