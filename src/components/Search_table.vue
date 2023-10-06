<template>
    <div class="container ">
      <div class="text-center custom-heading">
        <b>Results</b> 
      </div>
        <table class="table table-hover table-bordered text-center ">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{user.username}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Navbar from './Dashboard_component/Navbar.vue';
import store from '@/store';


export default {
  name: 'Search_table',
  store:store,
  data() {
    return {
      users: this.$store.getters.getUsers,
      post_no: 0,

    }
  },
  components: {
    Navbar
  },
}
</script>
<style>
.custom-heading{
  background-color: black;
  color: white;
  padding: 20px;
}
</style>