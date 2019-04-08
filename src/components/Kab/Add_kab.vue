<template>
  <div class="addkab">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Add Data Kabupaten
          </div>
          <div class="col-md-6 col-sm-6">
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
                                required
                                placeholder="Masukan Nama Kabupaten">
                  </b-form-input>
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
    name: 'addkab',
    data(){
      return {
        errors: null,
        nm_kab: null,
        show: true
      }
    },
    methods: {
      savedata (){
        this.errors = []
      if (this.nm_kab == null) {
        this.errors.push('Nama Kabupaten harus di isi !')
        document.getElementById('kab').focus(this.nm_kab)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: apiUrl() + '/kab?token=' + app.$session.get('token'),
        data: {
          nm_kab: this.nm_kab,
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'kab'})
            
        })
      }
    }
  }
</script>
