<template>
  <div class="editkec">
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
                <b-form-group id="nm_kab" label="Nama Kabupaten:" label-for="nm_kab">
                  <b-form-select id="kabupaten" v-model="carikabmodel">
                      <option v-for="(carikab, index) in kabupaten" :value="carikab.id"
                              v-bind:key="index">{{ carikab.nm_kab }}
                      </option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="nm_kec" label="Nama Kecamatan:" label-for="kec">
                  <b-form-select id="kec" v-model="carikecmodel">
                      <option v-for="(carikec, index) in kecamatan" :value="carikec.id_kec"
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
    mounted() {
      this.carikab();
      this.carikec();
      this.caridesa();
      let app = this
      axios.get(apiUrl() + '/agen/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.nm_agen = response.data.nm_agen
        app.pemilik = response.data.pemilik
        app.no_telp = response.data.no_telp
        app.alamat = response.data.alamat
        app.carikabmodel = response.data.kabupaten
        app.carikecmodel = response.data.kecamatan
        app.caridesamodel = response.data.desa
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
          // console.log(app.nm_kab)
        })
      },
      caridesa() {
      let app = this
        axios.get(apiUrl() + '/desa?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (response) {
          app.desa = response.data
        })
      },
      updateData () {
        this.errors = []
          if (this.nm_agen == '') {
          this.errors.push('Nama Agen harus di isi !')
          document.getElementById('nm_agen').focus(this.nm_agen)
          return false
        }
        if (this.pemilik == '') {
          this.errors.push('Nama Pemilik harus di isi !')
          document.getElementById('pemilik').focus(this.pemilik)
          return false
        }
        if (this.no_telp == '') {
          this.errors.push('No Telp harus di isi !')
          document.getElementById('no_telp').focus(this.no_telp)
          return false
        }
        if (this.alamat == '') {
          this.errors.push('Alamat harus di isi !')
          document.getElementById('alamat').focus(this.alamat)
          return false
        }
        var app = this
        axios({
        method: 'put',
        url: apiUrl()+'/agen/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          nm_agen: app.nm_agen,
          pemilik: app.pemilik,
          no_telp: app.no_telp,
          alamat: app.alamat,
          kabupaten: this.carikabmodel,
          kecamatan: this.carikecmodel,
          desa: this.caridesamodel
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'agen'})
        })
      },
      mounted: function(){
        this.carikab();
        this.carikec();
        this.caridesa();
      },
    }
  }
</script>
