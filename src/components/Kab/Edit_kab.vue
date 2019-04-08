<template>
  <div class="editkab">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Edit Data Kabupaten
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="inputgroup"
                              label="Nama Kabupaten:"
                              label-for="kab">
                  <b-form-input id="kab"
                                type="text"
                                v-model="nm_kab"
                                placeholder="Masukan Nama Kabupaten">
                  </b-form-input>
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
    name: 'editkab',
    data(){
      return {
        errors: null,
        nm_kab: null,
        show: true
      }
    },
    mounted() {
      let app = this
      axios.get(apiUrl() + '/kab/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.nm_kab = response.data.nm_kab
      })
    },
    methods: {
      updateData () {
        this.errors = []
          if (this.nm_kab == null) {
          this.errors.push('Nama Kabupaten harus di isi !')
          document.getElementById('kab').focus(this.kab)
          return false
        }
        var app = this
        axios({
        method: 'put',
        url: apiUrl()+'/kab/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          nm_kab: app.nm_kab,
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'kab'})
        })
      }
    }
  }
</script>
