<template>
  <div class="editkec">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Edit Data Kecamatan
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="nm_kab">
                  <b-form-select id="kabupaten" v-model="carikabmodel">
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nama Kecamatan:"
                              label-for="nm_kec">
                  <b-form-input id="nm_kec"
                                type="text"
                                v-model="nm_kec"
                                placeholder="Masukan Nama Kecamatan">
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
    name: 'editkec',
    data(){
      return {
        errors: null,
        carikabmodel: null,
        kabupaten: null,
        nm_kec: null,
        show: true
      }
    },
    mounted() {
      this.carikab()
      let app = this
      axios.get(apiUrl() + '/kec/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.carikabmodel = response.data.kabupaten
        app.nm_kec = response.data.nm_kec 
      })
    },
    methods: {
      carikab() {
      let app = this
        axios.get(apiUrl() + '/kab?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.kabupaten = response.data
          // console.log(app.nm_kab)
        })
      },
      updateData () {
        this.errors = []
          if (this.nm_kec == '') {
          this.errors.push('Nama Kecamatan harus di isi !')
          document.getElementById('nm_kec').focus(this.nm_kec)
          return false
        }
        var app = this
        axios({
        method: 'put',
        url: apiUrl()+'/kec/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          kabupaten: this.carikabmodel,
          nm_kec: app.nm_kec,
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'kec'})
        })
      },
      mounted: function(){
        this.carikab();
      },
    }
  }
</script>
