<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3 transparent">
      <form v-on:submit.prevent="userSignup" class="form-horizontal">
        <div class="modal-header">
        <h2><strong>Sign Up</strong></h2>
        </div>
          <fieldset>
            <label class="pull-left"> Username: </label>
            <input v-model="formSignUp.username" type="text" class="form-control" placeholder="username" required><br>
            <label class="pull-left"> Password: </label>
            <input v-model="formSignUp.password" type="password" class="form-control" placeholder="password" required><br>
            <label class="pull-left"> Email: </label>
            <input v-model="formSignUp.email" type="text" class="form-control" placeholder="email" required><br>
            <button type="submit" class="btn btn-default">Sign Up</button>
            <button type="reset"class="btn btn-danger" @click="$emit('closeSignUp')">Cancel</button>
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
      formSignUp: {
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
    clearForm () {
      this.formSignUp.username = ''
      this.formSignUp.password = ''
      this.formSignUp.email = ''
    },
    userSignup () {
      this.signup(this.formSignUp)
      this.clearForm()
      this.$emit('closeSignUp')
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
