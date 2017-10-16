import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuestionDetail from '@/components/QuestionDetail'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Question',
          component: Question
        },
        {
          path: ':id',
          name: 'QuestionDetail',
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
