<template>
  <div class="addkec">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Add Data Kecamatan
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="kabupaten">
                  <b-form-select id="kabupaten" v-model="carikabmodel">
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nama Kecamatan:"
                              label-for="kec">
                  <b-form-input id="nm_kec"
                                type="text"
                                v-model="nm_kec"
                                placeholder="Masukan Nama Kecamatan">
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
    name: 'addkec',
    data(){
      return {
        errors: null,
        carikabmodel: null,
        kabupaten: null,
        nm_kec: null,
        show: true
      }
    },
    mounted: function(){
      this.carikab();
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
      savedata (){
        this.errors = []
      if (this.nm_kec == '') {
        this.errors.push('Nama Kecamatan harus di isi !')
        document.getElementById('nm_kec').focus(this.nm_kec)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: apiUrl() + '/kec?token=' + app.$session.get('token'),
        data: {
          kabupaten: this.carikabmodel,
          nm_kec: this.nm_kec,
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'kec'})
            
        })
      }
    }
  }
</script>
