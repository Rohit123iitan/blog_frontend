<template>
    <div>
        <div class="modal fade" id="create_post" tabindex="-1" aria-labelledby="ModalLabel1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="ModalLabel1">Blog post</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="Title" class="form-label">Title <span style="color: red;">*</span></label>
                            <input type="email" class="form-control" id="Title" v-model="title" placeholder="Title">
                        </div>
                        <div class="mb-3">
                            <label for="Content" class="form-label">Content <span style="color: red;">*</span></label>
                            <textarea class="form-control" id="Content" v-model="content" rows="3" placeholder="What in your mind"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="file-input" class="form-label">Image <span style="color: red;">*</span></label>
                            <input class="form-control" type="file" id="file-input" @change="onFileSelected" accept="image/*" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" v-on:click="post_blog" class="btn btn-primary">POST</button>
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
const baseURL = "http://localhost:8080";
import axios from 'axios';
export default {
    name: 'create_blog',
    data(){
        return {
            user_id:2,
            title:"",
            content:"",
            image:null
        }
    },
    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0];
        },
        pressButton() {
        this.$refs.button.click();
        },
        async post_blog(){
            const formData = new FormData();
            formData.append('user_id', this.user_id);
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('image', this.image);
            try {
                const response = await axios.post(`${baseURL}/api/blog_post`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status!=200) {
                    const message = `An error has occured: ${response.status} - ${response.statusText}`;
                    throw new Error(message);
                }
                else{
                    this.pressButton();
                    window.location.reload();
                }
            } 
            catch (error) {
                console.log(error);
            }
        }
    },
}
</script>