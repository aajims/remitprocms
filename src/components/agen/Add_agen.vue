<template>
  <div class="adddesa">
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
                <b-form-group id="inputgroup"
                              label="Nama Agen:"
                              label-for="agen">
                  <b-form-input id="nm_agen"
                                type="text"
                                v-model="nm_agen"
                                placeholder="Masukan Nama Agen">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nama Pemilik:"
                              label-for="pemilik">
                  <b-form-input id="pemilik"
                                type="text"
                                v-model="pemilik"
                                placeholder="Masukan Nama Pemilik">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Nomor Telepon:"
                              label-for="tel">
                  <b-form-input id="no_telp"
                                type="text"
                                v-model="no_telp"
                                placeholder="Masukan Nomor Telepon">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Alamat Lengkap:"
                              label-for="alamat">
                  <b-form-textarea
                              id="alamat"
                              v-model="alamat"
                              placeholder="Masukan Alamat Lengkap "
                              rows="3"
                              max-rows="6"
                            />
                </b-form-group>
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="kab">
                  <b-form-select id="kabupaten" v-model="carikabmodel" v-on:change="carikec">
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="nm_kec" label="Nama Kecamatan:" label-for="kec">
                  <b-form-select id="kec" v-model="carikecmodel" >
                      <option v-for="(carikec, index) in kecamatan" :value="carikec.id"
                              v-bind:key="index">{{ carikec.nm_kec }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="desa" label="Nama Desa:" label-for="kec">
                  <b-form-select id="desa" v-model="caridesamodel" >
                      <option v-for="(caridesa, index) in desa" :value="caridesa.id"
                              v-bind:key="index">{{ caridesa.nm_desa }}
                      </option>
                  </b-form-select>
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
    name: 'adddesa',
    data(){
      return {
        errors: null,
        nm_agen: null,
        pemilik: null,
        no_telp: null,
        alamat: null,
        carikabmodel: null,
        carikecmodel: null,
        caridesamodel: null,
        kabupaten: null,
        kecamatan: null,
        desa: null,
        show: true
      }
    },
    mounted: function(){
      this.carikab();
      this.carikec();
      this.caridesa();
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
        axios.get(apiUrl() + '/kec?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.kecamatan = response.data
          // console.log(app.kecamatan)
        })
      },
      caridesa() {
      let app = this
        axios.get(apiUrl() + '/desa?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.desa = response.data
          // console.log(app.kecamatan)
        })
      },
      savedata (){
        this.errors = []
      if (this.pemilik == null) {
        this.errors.push('Nama Pemilik harus di isi !')
        document.getElementById('pemilik').focus(this.pemilik)
        return false
      }
      if (this.nm_agen == null) {
        this.errors.push('Nama Agen harus di isi !')
        document.getElementById('nm_agen').focus(this.nm_agen)
        return false
      }
      if (this.no_telp == null) {
        this.errors.push('Nomor Telp harus di isi !')
        document.getElementById('no_telp').focus(this.no_telp)
        return false
      }
      if (this.alamat == null) {
        this.errors.push('Alamat harus di isi !')
        document.getElementById('alamat').focus(this.alamat)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: apiUrl() + '/desa?token=' + app.$session.get('token'),
        data: {

          kabupaten: this.carikabmodel,
          kecamatan: this.carikecmodel,
          desa: this.caridesa,
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'agen'})
            
        })
      }
    }
  }
</script>
