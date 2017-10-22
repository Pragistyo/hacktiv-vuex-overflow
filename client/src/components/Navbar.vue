<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span class="sr-only">Toggle navigation</span>
            </button>
              <ul class="nav navbar-nav navbar-right">
                  <li>
                      <router-link to="/" 
                      class="navbar-brand"
                      @click.native=" $emit('showHome')"
                      ><p>HOME</p>
                      </router-link>
                  </li>
                  <li>
                    <router-link 
                    v-if="dataLogin.status" 
                    :to="userData.id"
                    @click.native=" $emit('showUserQuestion')"
                    ><p>YOUR QUESTION</p>
                    </router-link>
                  </li>
                  <li>
                      <div class="col-md-12 col-md-offset-10" style="margin-bottom:10px;">
                          <h2 style="color:Black">HACKTIV-VUEX-OVERFLOW</h2>
                      </div>
                  </li>
              </ul>
          </div>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a @click="$emit('openLogin')" v-if="!dataLogin.status">Sign In</a>
            </li>
            <li>
              <a @click="$emit('openSignUp')" v-if="!dataLogin.status">Sign Up</a>
            </li>
            <li>
              <a @click="logout()" v-if="dataLogin.status">Logout</a>
            </li>
          </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loginForm: false,
      signUpForm: false,
      home: true
    }
  },
  components: {
    Login,
    Signup
  },
  computed: {
    ...mapState({
      dataLogin: 'loginStatus',
      userData: 'userData'
    })
  },
  methods: {
    logout () {
      var self = this
      self.dataLogin.status = false
      self.userData.username = null
      self.userData.id = null
      // self.token = null
      localStorage.clear()
      this.$router.push('/')
      this.$emit('showHome')
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
a:hover{
  cursor:pointer;
}
</style>
