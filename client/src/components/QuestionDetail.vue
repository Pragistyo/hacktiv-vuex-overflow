<template>
  <div>
    <ul>
      <li>{{ questionDetail.title }}</li>
      <li>{{ questionDetail.question }}</li>
      <li v-for="answer in questionDetail.answer" :key="answer.id">{{ answer.answer }}</li>
      <li>
        <input v-model="answerForm.answer" type="text">
        <button @click="post()">Submit</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  data () {
    return {
      answerForm: {
        answer: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getDetails',
      'postAnswer'
    ]),
    post () {
      var payload = {
        id: this.id,
        answer: this.answerForm
      }
      this.postAnswer(payload)
    }
  },
  computed: {
    ...mapState([
      'questionDetail'
    ])
  },
  mounted () {
    this.getDetails(this.id)
  }
}
</script>

<style>
</style>
