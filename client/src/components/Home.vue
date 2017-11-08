<template>
<div>
    <Navbar 
    @openLogin=" loginForm=true, signUpForm=false, postQuestion= false"
    @openSignUp=" signUpForm=true, loginForm=false, postQuestion= false" 
    @showHome=" signUpForm=false, loginForm=false, postQuestion= true"
    @showUserQuestion="allQuestion=false"
    ></Navbar>
    <Login v-if="loginForm" @closeLogin=" loginForm=false, postQuestion= true"></Login>
    <SignUp v-if="signUpForm" @closeSignUp=" signUpForm=false, postQuestion= true"></SignUp>
    <router-view 
    v-if="!loginForm && !signUpForm"
    ></router-view>
</div>
</template>


<script>
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Navbar from '@/components/Navbar'
// import Question from '@/components/Question'
// import Allquestion from '@/components/Allquestion'
import EditQuestion from '@/components/EditQuestion'
import QuestionDetail from '@/components/QuestionDetail'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      // allQuestion: true,
      loginForm: false,
      signUpForm: false,
      postQuestion: true,
      editForm: false
    }
  },
  components: {
    Navbar,
    QuestionDetail,
    Login,
    SignUp,
    EditQuestion
  },
  computed: {
    ...mapState({
      dataLogin: 'loginStatus',
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions([
      'getData',
      'checkLogin'
    ])
  },
  mounted () {
    this.getData()
    if (localStorage.token) {
      this.checkLogin()
    }
  }
}
</script>
<style>
.hello {
  background-image: linear-gradient(to right, red, orange 20%, brown);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

