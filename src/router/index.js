import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import User from '@/components/user/User'
import Adduser from '@/components/user/Add_user'
import Edituser from '@/components/user/Edit_user'
import Kab from '@/components/Kab/view_kab'
import AddKab from '@/components/Kab/Add_kab'
import EditKab from '@/components/Kab/Edit_kab'
import Kec from '@/components/Kec/view_kec'
import AddKec from '@/components/Kec/Add_kec'
import EditKec from '@/components/Kec/Edit_kec'
import Desa from '@/components/desa/view_desa'
import AddDesa from '@/components/desa/Add_desa'
import EditDesa from '@/components/desa/Edit_desa'
import Agen from '@/components/agen/view_agen'
import AddAgen from '@/components/agen/Add_agen'
import EditAgen from '@/components/agen/Edit_agen'
import Desk from '@/components/desk/view_desk'
import AddDesk from '@/components/desk/Add_desk'
import EditDesk from '@/components/desk/Edit_desk'

Vue.use(Router)
Vue.use(BootstrapVue);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/user/add',
      name: 'adduser',
      component: Adduser,
    },
    {
      path: '/user/edit/:id',
      name:  'edituser',
      component: Edituser,
    },
    {
      path: '/kab',
      name: 'kab',
      component: Kab,
    },
    {
      path: '/kab/add',
      name: 'addkab',
      component: AddKab,
    },
    {
      path: '/kab/edit/:id',
      name:  'editkab',
      component: EditKab,
    },
    {
      path: '/kec',
      name: 'kec',
      component: Kec,
    },
    {
      path: '/kec/add',
      name: 'addkec',
      component: AddKec,
    },
    {
      path: '/kec/edit/:id',
      name:  'editkec',
      component: EditKec,
    },
    {
      path: '/desa',
      name: 'desa',
      component: Desa,
    },
    {
      path: '/desa/add',
      name: 'adddesa',
      component: AddDesa,
    },
    {
      path: '/desa/edit/:id',
      name:  'editdesa',
      component: EditDesa,
    },
    {
      path: '/agen',
      name: 'agen',
      component: Agen,
    },
    {
      path: '/agen/add',
      name: 'addagen',
      component: AddAgen,
    },
    {
      path: '/agen/edit/:id',
      name:  'editagen',
      component: EditAgen,
    },
    {
      path: '/desk',
      name: 'desk',
      component: Desk,
    },
    {
      path: '/desk/add',
      name: 'adddesk',
      component: AddDesk,
    },
    {
      path: '/desk/edit/:id',
      name:  'editdesk',
      component: EditDesk,
    }
  ]
})
