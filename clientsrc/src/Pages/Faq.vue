<template>
  <div class="container-fluid background">
    <div class="row justify-content-center bg-darken flex-fill d-flex">
      <div class="col-12 mt-5">
        <div class="card text-center border-0 content-shadow animate__animated animate__fadeInUp">
          <div class="card-header bg-black red">
            <h3>Frequently Asked Questions</h3>
          </div>
          <div class="card-body bg-dark ">
            <div class="card">
            <p @click="toggle1=!toggle1" class="neon blue">
              1. Do I need to be logged in to create or join a poll?
            </p>
            <p v-if="toggle1" class="orange card-header">You do not need to log in to join a poll.  However, you must be logged in to create one.</p>
            </div>
            <div class="card">
            <p @click="toggle2=!toggle2" class="neon blue">
              2. I joined a room without logging in.  Why can't I add items to the poll?
            </p>
            <p v-if="toggle2" class="orange card-header">The host has the ability to limit who can add items to the poll.  Ask them to change it next time.</p>
            </div>
            <div class="card">
            <p @click="toggle3=!toggle3" class="neon blue">
              3. Can I use this to help my friends decide what to do other than play computer games?
            </p>
            <p v-if="toggle3" class="orange card-header">Sure!  You can add non-game items as well as anything else to a poll.  The only thing that is required is a name for the poll item.</p>
            </div>
            <div class="card">
            <p @click="toggle4=!toggle4" class="neon blue">
              4. Why isn't my steam library loading?
            </p>
            <p v-if="toggle4" class="orange card-header">Make sure you set your steam user profile to public in order for the api to work properly.  If your profile is public and you are still having trouble, double check your steam profile id number associated with your account page link.  Some non-numerical links may not work.</p>
            </div>
            <div class="card">
            <p @click="toggle5=!toggle5" class="neon blue">
              5. What does DCDR stand for?
            </p>
            <p v-if="toggle5" class="orange card-header">Decider, Discerning Doctor, Disconnect Doctor etc.</p>
            </div>
            <div class="card">
            <p @click="toggle6=!toggle6" class="neon blue">
              6. Why the neon theme?
            </p>
            <p v-if="toggle6" class="orange card-header">We were going for a neo 80s synthwave vibe that's somewhat popular in certain gaming circles. Glowy leds for everyone!</p>
            </div>
            <div class="card">
            <p @click="toggle7=!toggle7" class="neon blue">
              7. Where can I go to report a bug in the website?
            </p>
            <p v-if="toggle7" class="orange card-header">No bug report feature exists at this time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Faq",
    data(){
      return {
        toggle1: false,
        toggle2: false,
        toggle3: false,
        toggle4: false,
        toggle5: false,
        toggle6: false,
        toggle7: false
      }
    }
  }
</script>

<style>
.neon.blue{
  cursor: pointer;
}


</style>