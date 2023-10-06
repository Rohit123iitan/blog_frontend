<template>
    <div>
        <div >
            <img class="card-img-top" src="../assets/bg.jpg" style="height: 5cm;" alt="Card image cap">
            <img class="card-img-top img_fit" src="../assets/profile_img.jpg"  alt="profilt_img">
            <b class="img_fit">{{username }}</b>
            <div class="float-sm-end ">
                <follow></follow>
            </div>
        </div>
    </div>
</template>
<script>

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery';
import popper from 'popper.js';
const baseURL = "http://127.0.0.1:8080";
import axios from 'axios';
import follow from "@/components/Follow.vue";
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
window.$ = jquery;
window.Popper = popper;
export default{
    name:"profile",
    data(){
        return{
            follow:0,
            user_data:[],
            username:"",
            post:[],
        }
    },
    components:{
        follow,
    },
    mounted(){
        let user_name=this.$route.params.name;
        console.log(user_name);
        axios.post(`${baseURL}/api/get_user_data`,{"name":user_name}).then(res=>
        {
            this.user_data=res.data;
            this.username=res.data[0];
            console.log(this.user_data);
            console.log(this.username);
        }).catch(error => {
            console.log(error);
            this.$router.push({ path: '/' });
        })
    }
}
</script>
<style>
.img_fit{
    position: relative;
    bottom:3cm;
    width: 5cm;
    height: 5cm;
    padding: 5px;
    border-radius: 50%;
}
</style>