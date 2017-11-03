<template>
   <div class="row" v-if="userData.username && userData.username != 'undefined'">
      <legend class="col-md-6 col-md-offset-3" style="color:black">
        <h1  class="hello"> Hello : {{userData.username}} !</h1>
      </legend>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      dataLogin: 'loginStatus',
      userData: 'userData'
    })
  }
}
</script>

