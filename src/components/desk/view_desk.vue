<template>
  <div class="container-fluid">
    <div class="animated fadeIn">
      <div class="card">
        <div class="card-header">
           Data Deskripsi
        </div>
        <div class="kotak">
          <b-button variant="success"><router-link to="/desk/add">Add Data</router-link></b-button>
        </div>
        <div class="alert alert-info" v-if="sukses" >
            <p>{{ sukses }}</p>
        </div>
        <div class="alert alert-info" v-if="success" >
            <p>{{ success }}</p>
        </div>
        <div class="kotak">
          <b-row>
            <b-col md="2">
              <b-form-group horizontal class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" />
              </b-form-group>
            </b-col>
            <b-col md="4"></b-col>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Filter" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-table show-empty
                   stacked="md"
                   :items="items"
                   :fields="fields"
                   :current-page="currentPage"
                   :per-page="perPage"
                   :filter="filter"
                   :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc"
                   :sort-direction="sortDirection"
                   @filtered="onFiltered">
            <template slot="actions" slot-scope="row">
              <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
              <b-button size="sm" @click.stop="editItem(row.item)" class="mr-1">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button size="sm" v-b-modal="'myModal'" v-on:click="deleteQueue(row.item)"><i class="fa fa-trash"></i></b-button>
            </template>
            <template slot="id" slot-scope="totalRows">
              {{totalRows.index + 1}}
            </template>
            <template slot="row-details" slot-scope="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                </ul>
              </b-card>
            </template>
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
          </b-row>

          <b-modal id="myModal">
              Are you sure want delete item this ??
            <div slot="modal-footer" class="w-100">
              <p class="float-left"></p>
              <b-btn size="sm" class="float-right" variant="primary" v-on:click="deleteItem()">
                Yes
              </b-btn>
       </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

  export default {
    data () {
      return {
        sukses: null,
        success: null,
        deleteID: 0,
        items: [],
        fields: [
          { key: 'id', label: 'No' },
          { key: 'ket', label: "Keterangan" },
          { key: 'description', label: "Description" },
          { key: 'actions', label: 'Actions' }
        ],
        currentPage: 1,
        perPage: 20,
        totalRows: 0,
        pageOptions: [ 20, 40 ],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        modalInfo: { title: '', content: '' }
      }
    },
    methods: {
      deleteItem(row) {
        let app = this
        axios.delete(apiUrl() + '/desk/' + this.deleteID + '?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (res) {
          window.location.reload(true)
        })
        
      },
      deleteQueue(row) {
        this.deleteID = row.id
      },
      editItem(row) {
        this.$router.push({ name: 'editdesk', params: { id: row.id} })
      },
      getdata () {
        let app = this
        axios.get(apiUrl()+'/desk?token=' + app.$session.get('token'), {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }).then(function (res) {
          app.items = res.data
        })
      },
      info (item, index, button) {
        this.modalInfo.title = `Row index: ${index}`
        this.modalInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    created(){
      this.getdata()
      this.totalRows = this.items.length
      this.sukses = localStorage.getItem('sukses')
      localStorage.removeItem('sukses')
      this.success = localStorage.getItem('success')
      //Hapus notifikasi sukses
      localStorage.removeItem('success')
    }
  }
</script>
