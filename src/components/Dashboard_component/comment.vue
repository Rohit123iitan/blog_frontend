<template>
    <div>
        <div class="modal fade" id="create_comment" tabindex="-1" aria-labelledby="ModalLabel2" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="ModalLabel2">Comments</h1>
                        <button type="button" @click="clear_data" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="Content" class="form-label">comment <span style="color: red;">*</span></label>
                            <textarea class="form-control" id="Content" v-model="comment" rows="3"
                                placeholder="What in your mind"></textarea>
                        </div>
                        <div v-for="comment_ in get_comments" class="custom_card" v-show="showComments">
                            <div v-show='comment_.comment !== ""'>
                                <img src="../../assets/profile_img.jpg" alt="user_img" class="custom_img"
                                    v-show='comment_.user_img === ""'>
                                <img :src="comment_.user_img" alt="user_img" v-show='comment_.user_img !== ""'>
                                <b>{{ comment_.u_name }}</b>
                                <p class="custom_fit">{{ comment_.comment }}</p>
                            </div>
                        </div>
                        <p @click="fetchPostComments" v-on:click="showComments = !showComments"
                            class="custom_text float-sm-end">{{ show }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="button" @click="clear_data" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" v-on:click="Save_comment" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery';
import popper from 'popper.js';
window.$ = jquery;
window.Popper = popper;
import axios from 'axios';
import store from '@/store';
const baseURL = "http://localhost:8080";
export default {
    name: 'comment',
    data() {
        return {
            get_comments: [],
            comment: "",
            user_id: 0,
            post_id: null,
            show: "Show comment",
            showComments: false,
        }
    },
    store: store,
    methods: {
        pressButton() {
            this.$refs.button.click();
        },
        clear_data() {
            this.get_comments=[],
            this.showComments = false;
            this.show = "Show comment";
            this.comment = "";
        },
        Save_comment() {
            this.user_id = localStorage.getItem("user_id");
            this.post_id = this.$store.getters.getId;
            const postData = {
                user_id: this.user_id,
                post_id: this.post_id,
                comment: this.comment
            };
            try {
                const url = `${baseURL}/api/add_comment`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = postData;
                axios.post(url, body, options).then((result) => {
                    this.pressButton();
                }).catch((err) => {
                    console.log(err);
                })
            }
            catch (err) {
                console.log(err);
            }
        },
        fetchPostComments() {
            this.post_id = this.$store.getters.getId;
            const postData1 = {
                post_id: this.post_id,
            };
            try {
                const url = `${baseURL}/api/get_comment`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = postData1;
                axios.post(url, body, options).then((result) => {
                    this.get_comments = result.data;
                }).catch((err) => {
                    console.log(err);
                })
            }
            catch (err) {
                console.log(err);
            }
            if (this.show == "Show comment") {
                this.show = "Hide comment";
            }
            else {
                this.show = "Show comment";
            }
        }
    }

}
</script>
<style>
.custom_text {
    color: rgb(143, 143, 235);
    cursor: pointer;
}

.custom_text:hover {
    color: blue;
    cursor: pointer;
}

.custom_text::after {
    display: none;
}

.custom_img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin: 10px;
}

.custom_card {
    margin: 10px;
    background-color: antiquewhite;
    border-radius: 10px;
}

.custom_fit {
    position: relative;
    left: 70px;
    bottom: 10px;
}</style>