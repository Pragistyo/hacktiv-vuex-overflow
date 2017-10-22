<template>
     <div class="row form-horizontal">
      <div class="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
        <form v-on:submit.prevent="bla" class="form-horizontal">
            <fieldset>
                <label class="pull-left" style="font-size:22px; padding-top:20px; text-decoration:underline"> Post Question: </label><br>
                <button 
                type="submit"
                class="btn btn-success pull-right"
                @click=""
                >POST
                </button><br><br>
                <label class="pull-left" for="titleQ" style="padding-top:10px;"> Title Question: </label>
                <input v-model="formQ.title" class="form-control" type="text" id="titleQ" placeholder="title" style="color:teal;" required></input><br>  
                <label class="pull-left"> Description: </label>
                <textarea v-model="formQ.content" class="form-control" type="text" placeholder="Question Description" style="color:teal;" required></textarea><br>
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
      formQ: {
        title: null,
        content: null
      }
    }
  },
  mounted: function () {
  },
  computed: {
    ...mapState({
      loginStatus: 'loginStatus',
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions([
      'postData'
    ]),
    bla () {
      this.postData(this.formQ)
      this.formQ.title = null
      this.formQ.content = null
    }
  },
  watch: {
  }
}
</script>

