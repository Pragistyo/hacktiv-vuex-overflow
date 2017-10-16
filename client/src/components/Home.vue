<template>
<div>
  <Navbar />
  <router-view></router-view>
  <div v-for="(item,index) in allDataQuestion">
    <div class="panel panel-warning">
      <h1>{{item.title}}</h1>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import QuestionDetail from '@/components/QuestionDetail'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    Navbar,
    QuestionDetail
  },
  computed: {
    ...mapState({
      dataLogin: 'loginStatus',
      allDataQuestion: 'question'
    })
  },
  methods: {
    ...mapActions([
      'getData'
    ])
  },
  mounted () {
    this.getData()
    // alert(JSON.stringify(this.allDataQuestion))
  }
}
</script>
