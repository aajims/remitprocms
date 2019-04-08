<template>
  <div class="editdesk">
    <div class="container-fluid">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-header">
            Edit Data Deskripsi
          </div>
          <div class="col-md-8 col-sm-8">
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
    name: 'editdesk',
    data(){
      return {
        errors: null,
        ket: null,
        description: null,
        show: true
      }
    },
    mounted() {
      let app = this
      axios.get(apiUrl() + '/desk/' + this.$route.params.id + '?token=' + app.$session.get('token'), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }).then(function (response) {
        // console.log(response)
        app.ket = response.data.ket
        app.description = response.data.description
      })
    },
    methods: {
      updateData () {
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
        method: 'put',
        url: apiUrl()+'/desk/' + this.$route.params.id + '/?token=' + this.$session.get('token'),
        headers: {
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'application/json'
        },
        data: {
          ket: app.ket,
          description: app.description,
        }})
        .then(function (response) {
          localStorage.setItem('success', 'Data berhasil diupdate')
          app.$router.push({name:'desk'})
        })
      }
    }
  }
</script>
