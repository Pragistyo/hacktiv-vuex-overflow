<template>
  <div>
    <form v-on:submit.prevent="userSignup">
      <input v-model="form.username" type="text" placeholder="username">
      <input v-model="form.password" type="password" placeholder="password">
      <input v-model="form.name" type="text" placeholder="name">
      <button>Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'signup'
    ]),
    userSignup () {
      this.signup(this.form)
    }
  }
}
</script>

<style>
</style>
