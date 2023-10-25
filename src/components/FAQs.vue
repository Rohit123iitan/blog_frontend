<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <h1 class="text-center mb-5">Frequently Asked Questions</h1>
        <div class="accordion" id="faq">
          <div class="card" v-for="(faq, index) in faqs" :key="index">
            <div class="card-header" :id="'faq-heading-' + index" @click="toggleAccordion(index)">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button">
                  {{ faq.question }}
                </button>
              </h5>
            </div>

            <div :id="'faq-collapse-' + index" class="collapse" :class="{ 'show': faq.open }" :aria-labelledby="'faq-heading-' + index" data-parent="#faq">
              <div class="card-body">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap';

export default {
  data() {
    return {
      faqs: [
        {
          question: 'What is Vue.js?',
          answer: 'Vue.js is a progressive JavaScript framework used for building user interfaces.',
          open: false
        },
        {
          question: 'What is Bootstrap?',
          answer: 'Bootstrap is a popular front-end framework used for building responsive websites and web applications.',
          open: false
        },
        {
          question: 'How do I get started with Vue.js?',
          answer: 'You can get started with Vue.js by reading the official documentation and building small projects.',
          open: false
        },
        {
          question: 'Is Vue.js difficult to learn?',
          answer: 'Vue.js is relatively easy to learn compared to other front-end frameworks like Angular and React.',
          open: false
        },
        {
          question: 'Can I use Bootstrap with Vue.js?',
          answer: 'Yes, you can use Bootstrap with Vue.js. There are several ways to integrate Bootstrap with Vue.js, such as using BootstrapVue or manually importing the Bootstrap CSS and JavaScript files.',
          open: false
        }
      ]
    }
  },
  methods: {
    toggleAccordion(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
}
</script>


