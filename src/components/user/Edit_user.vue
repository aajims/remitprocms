<template>
  <div class="edituser">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Edit Data User
          </div>
          <div class="col-md-8 col-sm-8">
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
                                placeholder="Masukan alamat email Valid">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup1"
                              label="Masukan Password:"
                              label-for="pass">
                  <b-form-input id="pass"
                                type="password"
                                v-model="password"
                                placeholder="Masukan Password">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup1"
                              label="Nama Lengkap:"
                              label-for="name">
                  <b-form-input id="name"
                                type="text"
                                v-model="name"
                                placeholder="Masukan nama lengkap">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup1"
                              label="Level:"
                              label-for="level">
                    <b-form-select v-model="level" :options="options" class="mb-3" />
                </b-form-group>
                <b-button type="submit" v-on:click.prevent="updateData" variant="primary"> Update</b-button>
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
    name: 'edituser',
    data(){
      return {
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
    mounted() {
      let app = this
      axios.get(apiUrl() + '/users/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.email = response.data.email
        app.name = response.data.name
        app.level = response.data.level
      })
    },
    methods: {
      updateData () {
        this.errors = []
        if (this.email == '') {
              this.errors.push('Email harus di isi !');
              document.getElementById('email').focus();
              return false;
          } else if (this.name == '') {
              this.errors.push('Nama harus di isi !');
              document.getElementById('name').focus();
              return false;
          } else if (this.level == '') {
              this.errors.push('Level belum di pilih!');
              document.getElementById('level').focus();
              return false;
          }
        var app = this
        axios({
        method: 'put',
        url: apiUrl()+'/users/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          email: app.email,
          name: app.name,
          level: app.level,
          password: app.password
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'user'})
        })
      }
    }
  }
</script>
