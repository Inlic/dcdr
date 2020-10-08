<template>
  <div class="">
    <div class="card">
      <form @submit.prevent="addChannel" class="form-group">
        <label for="">New Channel</label>
        <input type="text" 
        :v-model="newChannel.name"
        name="name" class="form-control" placeholder="name" aria-describedby="helpId">
        <button type="submit" class="btn btn-outline-primary">add channel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name:"channel-component",
  data(){
    return {
      newChannel: {}
      }
  },
  methods:{
    addChannel(){
      this.$store.dispatch("addChannel", this.newChannel)
    }
  }

}
</script>

<style>

</style>