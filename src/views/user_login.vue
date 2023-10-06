<template>
  <div id="app">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;background-color:blanchedalmond;">
          <div class="card-body p-4 text-center">
            <h3 class="mb-4">Sign in</h3>
            <div class="row my-2">
              <label class="col-sm-4 col-form-label" for="username">Username</label>
              <div class="col-sm-8">
                <input type="email" class="form-control " id="username" v-model="username" required />
              </div>
            </div>
            <div class="row my-2">
              <label for="email" class="col-sm-4 col-form-label">Email</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
            </div>
            <div class="row my-2">
              <label for="password" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8">
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-8">
                <button class="btn btn-primary btn-lg btn-block" v-on:click="login">Login</button>
              </div>
            </div>
            <hr class="my-4">
            <div>
              <p class="mb-0" style="-webkit-text-fill-color:darkolivegreen;">Don't have an account? <router-link to="/user_reg">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const baseURL = "http://localhost:8080";
import axios from 'axios';
export default {
  data(){
    return{
      username:'',
      email:'',
      password:'',
      register:'false',
    };
  },
  methods:{
    async login() {
      const postData = {
        username: this.username,
        email: this.email,
        password: this.password,

      };
      try {
        const res = await axios.post(`${baseURL}/api/login`, postData)
        if (res.status == 200) {
          localStorage.setItem('access_token', res.data[0]);
          localStorage.setItem('user_id', res.data[1]);
          console.log(res);
          return this.$router.push({ path: '/dashboard' });
        }
        else {
          console.log(res);
        }
      } catch (err) {
        console.log(err)
        throw new Error(err);
      }
    }
  }
  
}
</script>
<style>

@media (max-width: 767.98px) {
    .input-group {
        margin-top: 0;
        margin-bottom: 10px;
    }

    .ml-auto {
        margin-left: auto !important;
    }
}
</style>
