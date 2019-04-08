<template>
  <div class="editdesa">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Edit Data Desa
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="nm_kab">
                  <b-form-select id="kabupaten" v-model="carikabmodel" v-on:change="carikec">
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="nm_kec" label="Nama Kecamatan:" label-for="nm_kec">
                  <b-form-select id="nm_kec" v-model="carikecmodel">
                      <option v-for="(carikec, index) in kecamatan" :value="carikec.id_kec"
                              v-bind:key="index">{{ carikec.nm_kec }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nama Desa:"
                              label-for="desa">
                  <b-form-input id="nm_desa"
                                type="text"
                                v-model="nm_desa"
                                placeholder="Masukan Nama Desa">
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
    name: 'editdesa',
    data(){
      return {
        errors: null,
        carikabmodel: null,
        carikecmodel: null,
        kabupaten: null,
        kecamatan: null,
        nm_desa: null,
        show: true
      }
    },
    mounted() {
      this.carikab(),
      this.carikec()
      let app = this
      axios.get(apiUrl() + '/desa/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.carikabmodel = response.data.kabupaten
        app.carikecmodel = response.data.kecamatan
        app.nm_desa = response.data.nm_desa
        // console.log(response.data)
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
      carikec() {
      let app = this
        axios.get(apiUrl() + '/kec?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.kecamatan = response.data
          // console.log(app.carikecmodel)
        })
      },
      updateData () {
        this.errors = []
          if (this.kabupaten == null) {
          this.errors.push('Nama Kabupaten harus di isi !')
          document.getElementById('kabupaten').focus(this.kabupaten)
          return false
        }
         if (this.nm_desa == '') {
          this.errors.push('Nama Desa harus di isi !')
          document.getElementById('nm_desa').focus(this.nm_desa)
          return false
        }
        var app = this
        axios({
        method: 'put',
        url: apiUrl()+'/desa/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          kabupaten: this.carikabmodel,
          kecamatan: this.carikecmodel,
          nm_desa: this.nm_desa
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'desa'})
        })
      },
      mounted: function(){
        this.carikab();
        this.carikec();
      },
    }
  }
</script>
