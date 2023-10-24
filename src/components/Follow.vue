<template>
    <div >
        <button v-if="buttom == 'follow'" id="custom-btn" @click="follow">follow</button>
        <button v-if="buttom == 'unfollow'" id="custom-btn" @click="unfollow" >unfollow</button>
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
        followId: null,
        buttom:"",
      };
    },
  created() {
    this.followId = this.followerId;
  },
  props: {
    followerId: {
      type: Number,
    }
  },
  methods:{
      follow(){
        let user_id=localStorage.getItem("user_id");
        console.log("follow_id/follow")
        console.log(this.followerId)
        axios.post(`${baseURL}/api/follow`, { "user_id": user_id,"follower_id":this.followerId }).then(res => {
        this.followed=res.data;
        this.buttom="unfollow";
      }).catch(error => {
        console.log(error)
      })
      },
      unfollow(){
        let user_id=localStorage.getItem("user_id");
        axios.post(`${baseURL}/api/unfollow`, { "user_id": user_id,"follower_id":this.followerId }).then(res => {
        this.followed=res.data;
        this.buttom="follow";
      }).catch(error => {
        console.log(error)
      })
      }
    },
    mounted() {
      let user_id=localStorage.getItem("user_id");
      console.log("user_id")
      axios.post(`${baseURL}/api/get_followed`, { "user_id": user_id }).then(res => {
        this.followed=res.data;
        console.log("a")
        for(let i=0;i<this.followed.length;i++){
            if(this.followed[i].id==this.followerId){
                this.buttom="unfollow";
                break;
            }
            else if(this.followerId==user_id){
              console.log(this.followed[i].id)
                this.buttom="";
                break;
            }
            else{
                this.buttom="follow";
            }
        }
        if(res.data.length==0 && this.followerId!=user_id) this.buttom="follow";
        console.log(res.data);
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>
<style>
#custom-btn{
    border: none;
    position: relative;
    bottom:50px;
    color: aliceblue;
    background-color: red;
    border-radius: 10%;
    margin: 10px;
}
</style>