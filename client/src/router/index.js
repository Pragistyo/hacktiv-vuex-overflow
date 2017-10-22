import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Home from '@/components/Home'
import Question from '@/components/Question'
// import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: ':id',
          name: 'QuestionUser',
          component: Question,
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    }
  ]
})
