<template>
  <!-- <div class="modal-dialog"> -->
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
    <!-- <div class="modal-content"> -->
      <!-- <form v-on:submit.prevent="userLogin()"> -->
          <div class="modal-header">
              <h2><strong>Login</strong></h2>
          </div>
          <fieldset>
                <label class="pull-left"> Username: </label>
                <input v-model="form.username" class="form-control" type="text" placeholder="username" required></input><br>  
                <label class="pull-left"> Password: </label>
                <input v-model="form.password" class="form-control" type="password" placeholder="password" required><br>
                <button
                type="button" 
                @click.prevent="$emit('close')" 
                class="btn btn-default" 
                @click="userLogin()"
                >Login</button>
                <button 
                type="reset"
                class="btn btn-danger" 
                @click="$emit('closeLogin')"
                >Cancel</button>
          </fieldset>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      // showModal: false,
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
      alert(JSON.stringify(this.form) + ' ================')
      this.login(this.form)
      // this.$root.$router.push('/')
      this.$emit('closeLogin')
    },
    toggleModal () {
      // this.showModal = false
    }
  }
}
</script>
<style>
form {
padding-bottom: 20px;
}
fieldset {
padding-bottom: 20px;
}
.pull-left {
  padding-left: 10px;
}
</style>
