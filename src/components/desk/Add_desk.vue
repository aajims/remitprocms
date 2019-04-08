<template>
  <div class="adddesk">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Add Data Deskripsi
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="alert alert-info" v-if="errors" v-for="error in errors">
              <p>{{ error }}</p>
            </div>
            <div class="kotak">
              <b-form>
                <b-form-group id="inputgroup"
                              label="Text Deskripsi:"
                              label-for="ket">
                  <tinymce id="ket" :row="4" v-model="ket"></tinymce>
                </b-form-group>
                <b-form-group id="inputgroup"
                              label="Text Deskripsi in English:"
                              label-for="description">
                  <tinymce id="description" :row="4" v-model="description"></tinymce>
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
    name: 'adddesk',
    data(){
      return {
        errors: null,
        ket: null,
        description: null,
        show: true
      }
    },
    methods: {
      savedata (){
        this.errors = []
      if (this.ket == '') {
        this.errors.push('Text Deskripsi harus di isi !')
        document.getElementById('ket').focus(this.ket)
        return false
      }
      if (this.description == '') {
        this.errors.push('Text Deskripsi harus di isi !')
        document.getElementById('description').focus(this.description)
        return false
      }
      var app = this
      axios({
        method: 'post',
        url: apiUrl() + '/desk?token=' + app.$session.get('token'),
        data: {
          ket: this.ket,
          description: this.description,
        },
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": 'application/json'
        }
        })
        .then(function (response) {
          localStorage.setItem('sukses', 'Data Berhasil di Simpan')
            app.$router.push({ name: 'desk'})
            
        })
      }
    }
  }
</script>
