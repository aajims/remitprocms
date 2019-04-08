<template>
  <div class="adduser">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Add Data
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="inputgroup"
                              label="Alamat Email:"
                              label-for="email">
                  <b-form-input id="email"
                                type="email"
                                v-model="email"
                                required
                                placeholder="Masukan alamat email Valid" autofocus>
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup1"
                              label="Masukan Password:"
                              label-for="password">
                  <b-form-input id="password"
                                type="password"
                                v-model="password"
                                required
                                placeholder="Masukan Password">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup1"
                              label="Nama Lengkap:"
                              label-for="name">
                  <b-form-input id="name"
                                type="text"
                                v-model="name"
                                required
                                placeholder="Masukan nama lengkap">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="level"
                              label="Level:"
                              label-for="level">
                    <b-form-select v-model="level" :options="options" class="mb-3" />
                </b-form-group>
                <b-button type="submit" v-on:click.prevent="savedata" variant="primary"> Simpan</b-button>
              </b-form>
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
    name: 'adduser',
    data(){
      return {
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        errors: null,
        email: null,
        password: null,
        name: null,
        level: null,
      options: [
        { value: null, text: '----  Pilih Level ------' },
        { value: 'admin', text: 'Admin' },
        { value: 'staff', text: 'Staff' },
      ],
        show: true
      }
    },
    methods: {
      isEmailValid() {
      return  (this.reg.test(this.email));
    },
      savedata (){
        this.errors = []
      
      if (this.email == null) {
        this.errors.push('Email User harus di isi !')
        document.getElementById('email').focus(this.email)
        return false
      } else if (!this.isEmailValid(this.email)){
        this.errors.push('Email tidak valid !')
        return false
      } else if (this.password == null) {
        this.errors.push('Password Harus di isi !')
        document.getElementById('password').focus(this.password)
        return false
      } else if (this.name == null) {
        this.errors.push('Nama User Harus di isi !')
        document.getElementById('name').focus(this.name)
        return false
      } else if (this.level == null) {
        this.errors.push('Level Harus di Pilih !')
        document.getElementById('level').focus(this.level)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/users?token=' + app.$session.get('token'),
        data: {
          name: this.name,
          password: this.password,
          email: this.email,
          level: this.level
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'user'})
            
        })
      }
    }
  }
</script>
