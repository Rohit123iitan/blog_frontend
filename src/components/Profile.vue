<template>
    <div>
        <div style="height: 140px;" >
            <img class="card-img-top" src="../assets/bg.jpg" style="height: 5cm;" alt="Card image cap">
            <img class="card-img-top" id="img_fit" src="../assets/profile_img.jpg" alt="profilt_img">
            <b id="img_fit">{{ username }}</b>
            <div class="float-sm-end ">
                <follow :followerId="parseInt(follower_id)"></follow>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="row" style="margin: 0;" v-for="post in posts" :key="post.post_id">
                    <div class="container-fluid card h-auto w-100" style="margin-bottom: 10px;padding: 0;">
                        <div>
                            <img class="custom_img" src="../assets/profile_img.jpg" alt="author_img"
                                v-show='post.user_img === ""'>
                            <img :src="post.user_img" alt="author_img" v-show='post.user_img !== ""'>
                            <router-link :to="{ name: 'profile', params: { name: post.username, id: post.user_id } }">{{
                                post.username }}</router-link>
                        </div>
                        <hr>
                        <div class="card-body ">
                            <p class="card-text">{{ post.content }}</p>
                        </div>
                        <img v-bind:src="post.image" alt="post_img" class="card-img-top img-fit img-fluid">
                        <div>
                            <button class="custom-btn" @click="like_(post.post_id)" v-show="post.like == false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path
                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>
                                Like
                            </button>
                            <button class="custom-like-btn" @click="dislike_(post.post_id)" v-show="post.like == true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path
                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>
                                Like
                            </button>
                            <button @click="setCurrentPostId(post.post_id)" class="float-sm-end custom-btn "
                                data-bs-toggle="modal" data-bs-target="#create_comment">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-chat" viewBox="0 0 16 16">
                                    <path
                                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                </svg>
                                comment
                            </button>
                        </div>
                        <comment></comment>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>
<script>

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import comment from './Dashboard_component/comment.vue';
import axios from 'axios';
import store from '@/store';
const baseURL = "https://blog-backend1-ev7i.onrender.com";
import follow from "@/components/Follow.vue";
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    name: "profile",
    data() {
        return {
            follow: 0,
            user_data: [],
            username: "",
            posts: [],
            follower_id: 0,
        }
    },
    components: {
        follow,
        comment,
    },
    methods: {
        like_(id) {
            const postData = {
                "user_id": localStorage.getItem("user_id"),
                "post_id": id,
            };
            const options = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseURL}/api/like_post`;
            const body = postData;
            axios.post(url, body, options).then((result) => {
                window.location.reload();
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        dislike_(id) {
            const postData = {
                "user_id": localStorage.getItem("user_id"),
                "post_id": id,
            };
            const options = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseURL}/api/dislike_post`;
            const body = postData;
            axios.put(url, body, options).then((result) => {
                window.location.reload();
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        setCurrentPostId(postId) {
            this.$store.commit('setCurrentPostId', postId);
        },
    },
    created() {
        this.follower_id = this.$route.params.id;
    },
    mounted() {
        let user_name = this.$route.params.name;
        console.log("follower_id/profile")
        console.log(this.follower_id);
        axios.post(`${baseURL}/api/get_user_data`, { "name": user_name }).then(res => {
            this.user_data = res.data;
            this.username = res.data[0];
            console.log(this.user_data);
            console.log(this.username);
        }).catch(error => {
            console.log(error);
            // this.$router.push({ path: '/' });
        })

        axios.post(`${baseURL}/api/get_blog`, {
            "user_id": localStorage.getItem("user_id")
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                this.posts = response.data;
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>
<style>
#img_fit {
    position: relative;
    bottom: 3cm;
    width: 5cm;
    height: 5cm;
    padding: 5px;
    border-radius: 50%;
}
.custom_img {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  margin: 10px;
}

hr {
  margin: 0;
}

.custom-btn:hover {
  color: #000;
  text-shadow: 10px;
  /* background-color: #f1f1f1; */
  box-shadow: 0 10px 20px -8px rgb(240, 75, 113);
}

.custom-btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #666;
}

.custom-like-btn:hover {
  color: white;
  text-shadow: 10px;
  /* background-color: #f1f1f1; */
  box-shadow: 0 10px 20px -8px rgb(122, 75, 240);
}

.custom-like-btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #2504f9;
  color: white;
}
a {
  cursor: pointer;
}

.row {
  margin-top: 50px;
}

.img-fit {
  aspect-ratio: 16/9;
  object-fit: fill;
}

.sticky {
  position: fixed;
  top: 50px;
}

body {
  width: 100%;
  height: 100%;
  background-color: rgb(176, 214, 229);
}

button {
  border: none;
}
</style>
