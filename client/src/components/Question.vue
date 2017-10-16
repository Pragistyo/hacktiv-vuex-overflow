<template>
<div>
  <ul v-for="(data, index) in question" :key="data.id">
    <li><router-link :to="{name:'QuestionDetail', path:':id', params: { id: data._id}}">{{ data.title }}</router-link></li>
    <li>{{ data.question }}</li>
    <li>{{ data.author.username }}</li>
  </ul>
  <input v-model="form.title" type="text">
  <input v-model="form.question" type="text">
  <button @click="post()">Submit</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        title: '',
        question: ''
      }
    }
  },
  methods: {
    ...mapActions({
      postData: 'postData'
    }),
    post () {
      this.postData(this.form)
    }
  },
  computed: {
    ...mapState([
      'question'
    ])
  }
}
</script>
