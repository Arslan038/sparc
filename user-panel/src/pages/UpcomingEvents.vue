<template>
  <div>
    <div class="main">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">Upcoming Engagements</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4" v-for="(event, index) in filterUpcoming" :key="index">
                <div class="card" style="cursor: pointer" v-if="Date.parse(currentDate) <= Date.parse(event.date)">
                    <div class="card-header" >
                      <img :src="event.event_image" width="500" height="200" alt="" @click="viewEvent(event.id)">
                      <div class="text-success pull-right mt-4 mr-3" v-clipboard="() => url+''+event.id" v-clipboard:success="clipboardSuccessHandler"><i class="fa fa-copy"></i></div>
                    </div>
                      <div class="card-body" @click="viewEvent(event.id)">
                      <h5 class="text-success"><strong> {{ event.event_name }}</strong></h5>
                      <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                      <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                      <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                      <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>  
                      <h6 class="text-success pull-right"> <img class="image-class" width="30" height="30" :src="getUser(event.created_by).profile_image" alt=""> {{ getUser(event.created_by).first_name + " " + getUser(event.created_by).last_name }}</h6>

                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax, FormGroupInput } from '@/components';
import nativeToast from 'native-toast'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'upcoming-events',
  bodyClass: 'upcoming-events-page',
  components: {
    Parallax,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      rating: 5,
      currentDate: null,
      userEvents: [],
      url: null
    }
  },
  computed: {
    ...mapGetters(['getEvents', 'allRatings', 'allUsers']),
    getUpcomingEvents() {
        return this.userEvents.map(event_id=> {
          let event_item=this.getEvents.find(event_item=>event_item.id==event_id)
                return event_item
            })
    },
    filterUpcoming() {
          let event = this.getUpcomingEvents.filter(event => Date.parse(this.currentDate) <= Date.parse(event.date))
          return event
        }
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchUser']),

    viewEvent(id) {
      this.$router.push('/events/'+id)
    },
    clipboardSuccessHandler({ value, event }) {
        console.log('success', value)
        nativeToast({
          message: 'Link Copied to Clipboard',
          position: 'north-east',
          // Self destroy in 5 seconds
          timeout: 3000,
          type: 'success'
        })
    },
    getUser(id) {
      let user_item = this.allUsers.find(user => user.id === id)
        return user_item  
    },
    getRatings(id) {
      let avgRating = [];
      this.allRatings.filter(rating => {
        if(rating.host_id == id) {
          avgRating.push(rating.ratingStars)
        }
      })

      if(avgRating.length > 0) {
        let sum = 0.0;
        let avg = 0.0;

        for(var i = 0; i < avgRating.length; i++) {
          sum += avgRating[i]
        }
        avg = sum / avgRating.length;
        return avg          
      }
    },
  },
  created() {
    this.fetchEvents();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.currentDate = mm + "/" + dd + "/" + yyyy;
    
    var link = window.location.href;
    this.url = link.replace('/upcoming-events', '/events/')
    

    this.fetchUser();

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      for(var key in loggedUser.events_attended){
        this.userEvents.push(loggedUser.events_attended[key])
      }
  }
};
</script>
<style scoped>
  #top {
    margin-top: -70px;
  }
</style>
