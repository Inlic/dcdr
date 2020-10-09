<template>
  <div>
    <div class="card m-1">
      <div class="card-header methods" @click="toggleit">{{channelData.name}}</div>
      <div class="card-body" v-if="this.toggle == true">
        <ul>
          <li v-if="channelData.rooms > 0">rooms go here</li>
          <li v-else>
              <select v-model="selected">
              <option disabled value="">Please select one</option>
              <option v-for="room in polls" :key=room.id :value="room">{{room.name}}</option>
              </select>
              <span>Selected: {{ selected.name }}</span> 
            <button type="button" @click="addPoll" class="btn btn-outline-primary">add a poll!</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import as from "../store/alertsService"
export default {
  name: "channel-body-componet",
  props:["channelData"],
  data(){
    return{
      toggle: false,
      selected: { name: "none"}
    }
  },
  methods:{
    toggleit(){
      this.toggle = !this.toggle
    },
    addPoll(){
      let payload = {_id: this.channelData._id, rooms: this.selected.id}
      this.$store.dispatch("addRoomtoChannel", payload)
    }
  },
  computed:{
    polls(){
        return this.$store.state.myRooms;
    }
  }
}
</script>

<style>

</style>