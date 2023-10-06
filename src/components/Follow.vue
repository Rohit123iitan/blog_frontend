<template>
    <div >
        <button v-if="buttom == 'follow'" class="custom-btn" >follow</button>
        <button v-if="buttom == 'unfollow'" class="custom-btn" >unfollow</button>
    </div>
</template>
<script>
  const baseURL = "http://127.0.0.1:8080";
  import axios from 'axios';
  const token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  export default {
    data() {
      return {
        username:"",
        followed:[],
        buttom:"",
      };
    },
    params:{
        follower_name:"",
    },
    mounted() {
      let user_id=localStorage.getItem("user_id");
      axios.post(`${baseURL}/api/get_followed`, { "user_id": user_id }).then(res => {
        this.followed=res.data;
        console.log(this.follower_name)
        for(follow in this.followed){
            if(follow.name==this.follower_name){
                this.buttom="unfollow";
                break;
            }
            else if(follow.id==user_id){
                this.buttom="user";
                break;
            }
            else{
                this.buttom="follow";
            }

        }
        console.log(res);
      }).catch(error => {
        console.log(error)
        this.$router.push({ path: '/' });
      })
    }
  }
</script>
<style>
.custom-btn{
    border: none;
    position: relative;
    bottom:50px;
    color: aliceblue;
    background-color: red;
    border-radius: 10%;
    margin: 10px;
}
</style>