<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <form v-on:submit.prevent="userLogin()">
        <div class="modal-header">
          <h2><strong>Login</strong></h2>
        </div>
          <fieldset>
            <label class="pull-left"> Username: </label>
            <input v-model="form.username" class="form-control" type="text" placeholder="username"><br>
            <label class="pull-left"> Password: </label>
            <input v-model="form.password" class="form-control" type="password" placeholder="password"><br>
            <button type="submit" class="btn btn-default">Login</button>
            <button data-dismiss="modal" class="btn btn-danger">Cancel</button>
          </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      showModal: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      datanya: 'loginStatus'
    })
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    userLogin () {
      this.login(this.form)
      alert(JSON.stringify(this.datanya) + ' ================')
      this.$root.$router.push('/bla/bla')
    },
    toggleModal () {
      this.showModal = false
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
