<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top" style="background-color: rgb(56, 232, 248);">
      <img style="margin-left: 10px;" src="@/assets/logo-ab-clair.png" width="40" height="24">
      <div class="a">
        <div class="d-flex" style="margin-left: 50px;">
          <input type="text" class="form-control me-2" placeholder="Search" v-model="search_data"
            aria-placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-primary" @click="search">Search</button>
          <div v-if="User.length > 0" class="card card-style">
          <ul>
            <li v-for="result in User">
              <router-link v-if="token !== null" :to="{ name: 'profile', params: { name: result.username, id: result.user_id } }">{{ result.username }}</router-link>
            </li>
          </ul>
        </div>
        </div>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu"
        aria-expanded="false" aria-controls="toggleMobileMenu" aria-lable="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="toggleMobileMenu">
        <ul class="navbar-nav ms-auto  text-center">
          <div class="btn">
            <button v-show="token === null" class="btn btn-primary" v-on:click="login">Login</button>
            <button v-show="token !== null" class="btn btn-primary" v-on:click="logout">Logout</button>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>
  
<script>
import 'bootstrap';

import Search_table from '../Search_table.vue';

import axios from 'axios';
import store from '@/store';
const baseURL = "http://localhost:8080";

export default {
  name: 'Navbar',
  store: store,
  data() {
    return {
      token: null,
      search_data: "",
      User: []
    }
  },
  component: {
    Search_table,
  },
  watch: {
    search_data() {
      this.User = [];
    },
  },
  created() {
    this.token = localStorage.getItem("access_token") || null;
  },
  methods: {
    login() {
      return this.$router.push({ path: '/login' });
    },
    logout() {
      window.localStorage.clear();
      return this.$router.push({path: '/login' });
    },
    faq() {
      return this.$router.push({ name: 'faq' });
    },
    search() {
      if(this.search_data.length==0) this.User=[];
      else{
        const formData = new FormData();
        formData.append('username', this.search_data);
        const options = {
          headers: {
            "Content-Type": "application/json",
          }
        };
        const url = `${baseURL}/api/search`;
        axios.post(url, formData, options).then((result) => {
          this.User = result.data;
          console.log(result.data);
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  },
}
</script>
<style>
.card-style {
    flex-direction: column;
    margin-top: 40px;
    padding-right: 10px;
    z-index: 1;
    position: absolute;
    /* box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.1); */
}
@media (max-width: 992px) {
.a{
  display: none;
}
}
</style>
  
  