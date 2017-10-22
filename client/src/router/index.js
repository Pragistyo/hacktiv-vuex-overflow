import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Home from '@/components/Home'
import Question from '@/components/Question'
import Allquestion from '@/components/Allquestion'
// import PostQuestion from '@/components/PostQuestion'
import EditQuestion from '@/components/EditQuestion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/edit',
      name: 'Edit',
      component: EditQuestion
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: '', name: 'Allquestion', component: Allquestion },
        {
          path: ':id/',
          name: 'QuestionUser',
          component: Question,
          // props: true,
          children: [
            {
              path: 'edit',
              name: 'EditQuestion',
              component: EditQuestion
            }
          ]
        }
      ]
    }
  ]
})
