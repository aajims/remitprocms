<template>
  <div class="addkec">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Add Data Desa
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="kab">
                  <b-form-select id="kabupaten" v-model="carikabmodel" v-on:change="carikec">
                    <option value="" v-bind:key="0"></option>
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:kabupaten="carikab.kabupaten" v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="nm_kec" label="Nama Kecamatan:" label-for="kec">
                  <b-form-select id="nm_kec" v-model="carikecmodel">
                      <option v-for="(carikec, index) in kecamatan" :value="carikec.id"
                              v-bind:key="index">{{ carikec.nm_kec }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nama Desa:"
                              label-for="desa">
                  <b-form-input id="desa"
                                type="text"
                                v-model="nm_desa"
                                placeholder="Masukan Nama Desa">
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
        carikecmodel: null,
        kabupaten: [],
        kecamatan: [],
        nm_kab: null,
        nm_kec: null,
        nm_desa: null,
        show: true
      }
    },
    mounted: function(){
      this.carikab();
      // this.carikec();
    },
    methods: {
      carikab() {
      let app = this
        axios.get(apiUrl() + '/kab?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.kabupaten = response.data
          // console.log(app.kabupaten)
        })
      },
      carikec() {
      let app = this
        axios.get(apiUrl() + '/kec/search/' + app.carikabmodel + '?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.kecamatan = response.data
          // console.log(app.kecamatan)
        })
      },
      savedata (){
        this.errors = []
      if (this.desa == null) {
        this.errors.push('Nama Desa harus di isi !')
        document.getElementById('desa').focus(this.desa)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: apiUrl() + '/desa?token=' + app.$session.get('token'),
        data: {
          kabupaten: this.carikabmodel,
          kecamatan: this.carikecmodel,
          nm_desa: this.nm_desa,
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'desa'})
            
        })
      }
    }
  }
</script>
