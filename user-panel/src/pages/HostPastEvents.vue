<template>
    <div>
        
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                <h2>Past Engagements</h2>
                <div class="row">
                  <div class="col-md-4" v-for="(event, index) in filterPast" :key="index">
                    <div >
                    <div @click="viewEvent(event.id)" style="cursor: pointer">
                        <div class="card">
                          <div class="card-header">
                              <img :src="event.event_image" width="500" height="200" alt="">
                          </div>
                          <div class="card-body">
                              <h5 class="text-success title-up"><b> {{ event.event_name }} </b></h5>
                              <h6> <star-rating :rating="getRatings(event.created_by)" :increment="0.1" :star-size="16" :read-only="true"></star-rating></h6>
                              <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ event.event_location }}</h6>
                              <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ event.start_time + " - " + event.end_time }} </h6>
                              <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ event.date }}</h6>
                          </div>
                        </div>
                    </div>
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
import { mapGetters } from 'vuex'
export default {
    name: 'host-past-engagements',
    data() {
      return {
        userEvents: [],
        hostedEvents: [],
        rating: 5,
        currentDate: null
      }
    },
    computed : {
        ...mapGetters(['getEvents', 'allRatings']),
        getSelectedEvents() {
            return this.userEvents.map(event_id=> {
            let event_item=this.getEvents.find(event_item=>event_item.id==event_id)
                  return event_item
              })
        },

        filterPast() {
          let event = this.getSelectedEvents.filter(event => Date.parse(this.currentDate) > Date.parse(event.date))
          return event
        }
    },
    methods: {
        viewEvent(id) {
          this.$router.push({path: '/events/'+id})
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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        this.currentDate = mm + "/" + dd + "/" + yyyy;

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      for(var key in loggedUser.events_hosted){
        this.userEvents.push(loggedUser.events_hosted[key])
      }
      console.log("new runner")
      

      console.log(this.getSelectedEvents)
      //console.log("Count " + loggedUser.events_hosted)
      // this.userEvents = loggedUser.events_hosted
      // console.log("Events " + this.userEvents[0])
    }
}
</script>

<style scoped>
    
</style>