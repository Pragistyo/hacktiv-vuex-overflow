<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form v-on:submit.prevent="userSignup">
        <div class="modal-header">
        <h2><strong>Sign Up</strong></h2>
        </div>
          <fieldset>
            <label class="pull-left"> Username: </label>
            <input v-model="form.username" type="text" class="form-control" placeholder="username"><br>
            <label class="pull-left"> Password: </label>
            <input v-model="form.password" type="password" class="form-control" placeholder="password"><br>
            <label class="pull-left"> Email: </label>
            <input v-model="form.email" type="text" class="form-control" placeholder="email"><br>
            <button type="submit" class="btn btn-default">Sign Up</button>
            <button data-dismiss="modal" class="btn btn-danger">Cancel</button>
          </fieldset>
      </form>
    </div>
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
        email: ''
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
form {
padding-bottom: 20px;
}
.pull-left {
  padding-left: 10px;
}
</style>
