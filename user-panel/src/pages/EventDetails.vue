<template>
  <div>
    <div class="main mt-5">
      <div class="section section-images">
        <div class="container" id="top">
          <div class="col-md-12">
              <div class="row">
                  <div class="col-md-12">
                      <b-alert class="mb-5" v-if="!success && success != null" show variant="danger" dismissible> <i class="fa fa-warning"></i> {{msg}}</b-alert> <br/>
                      <b-alert class="mb-5" v-if="success" show variant="success" dismissible>{{msg}}</b-alert> <br/>
                  </div>
              </div>
            <div class="row text-center" id="card-margin">
                <div class="col-md-12">
                <h2 class="text-center ml-3 title title-up mb-5">Engagement Details</h2>
              </div>
            </div>
            
            <div class="row" >
              <div class="col-md-8">
                <b-card-group deck >
                    <b-card border-variant="primary" :img-src="getSelectedEvent[0].event_image" img-height="300" img-alt="Event image" img-top>
                        <b-card-text>
                          <div class="row">

                          <div class="col-md-12">
                            <h5 class="text-success"><b> {{ getSelectedEvent[0].event_name }}</b></h5>
                            <h6> <star-rating v-model="eventRating" :star-size="16" disabled></star-rating></h6>
                            
                           </div> 
                           </div>
                           <div class="row">
                             <div class="col-md-6">
                               <h6 class="text-info"> <i class="fa fa-map-marker"></i> {{ getSelectedEvent[0].event_location }}</h6>
                              
                              <h6 class="text-info"> <i class="fa fa-clock-o"></i> {{ getSelectedEvent[0].start_time + " - " + getSelectedEvent[0].end_time }} </h6>
                              <h6 class="text-info"> <i class="fa fa-calendar"></i> {{ getSelectedEvent[0].date }}</h6>
                             </div>
                             <div class="col-md-6">
                               <h6 class="text-info"> <i class="fa fa-address-card-o"></i> {{ getSelectedEvent[0].event_address }}</h6>
                               <h6 class="text-info"> <i class="fa fa-globe-americas"></i> {{ getSelectedEvent[0].event_location_access }}</h6>
                               <h6 class="text-info"> <i class="fa fa-globe-americas"></i> {{ getSelectedEvent[0].event_space }}</h6>
                             </div>
                           </div>
                        </b-card-text>
                    </b-card>
                </b-card-group>
                
                <b-card class="mt-3" v-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date) && isUserParticipant && !isUserRated">
                  <b-card-text>
                    <div class="col-md-12">
                      <h4 class="title-up text-info">Rate Your Experience</h4>
                      <star-rating v-model="submitEventRating.ratingStars" :star-size="36" :increment="0.5"></star-rating>
                      <h6 class="mt-3">Feedback</h6>
                      <div class="row">
                        <div class="col-md-8">
                        <textarea class="form-control" v-model="submitEventRating.feedback" placeholder="Give your Feedback..."></textarea>
                      </div>
                      <div class="col-md-3">
                        <button class="btn btn-success mt-3" @click="rateEngagementNow">Rate Now</button>
                      </div>
                      </div>
                    </div>
                  </b-card-text>
                </b-card>
                <b-card class="mt-2" v-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date)">
                  <b-card-text>
                    <h4 class="title-up text-info">Engagement Reviews</h4>
                    <div class="col-md-12" v-for="(rating, index) in getRatings" :key="index">
                      <h6 class="text-success">{{getUserDetails(rating.user_id).first_name}}</h6>
                      <star-rating :rating="rating.ratingStars" :read-only="true" :star-size="16" :increment="0.5"></star-rating>
                      <strong>{{rating.feedback}}</strong>
                      <hr>
                    </div>
                  </b-card-text>
                </b-card>
              </div>
              <div class="col-md-4">
                  <div class="event-info">
                      <h5 class="text-info"><b>Engagement Description</b></h5>
                      <p>{{ getSelectedEvent[0].event_description }}</p>
                      <h6 class="text-danger text-center"></h6>
                      <a class="btn btn-success text-white btn-block" @click="participateEvent" v-if="Date.parse(currentDate) <= Date.parse(getSelectedEvent[0].date) "> <span v-if="participated">You are Already Signed Up</span> <span v-if="!participated">PARTICIPATE NOW</span> </a>
                      <button class="btn btn-danger btn-block" v-else-if="Date.parse(currentDate) > Date.parse(getSelectedEvent[0].date)" disabled>Engagement Expired</button>
                  </div>
                  <div class="event-info mt-2">
                      <h5 class="text-info"><b>Engagement Extras</b></h5>
                      <h6><b class="text-success">Engagement Free: </b> {{getSelectedEvent[0].event_free}}</h6>
                      <h6><b class="text-success">Engagement Type: </b> {{getSelectedEvent[0].event_type}}</h6>
                      <h6 v-if="getSelectedEvent[0].event_price_per_person != null"><b class="text-success">Engagement Price: </b> $ {{getSelectedEvent[0].event_price_per_person}} PER PERSON</h6>
                      <h6><b class="text-success">Engagement Cause: </b> {{getSelectedEvent[0].cause}}</h6>
                      <h6 v-if="getSelectedEvent[0].capacity != null"><b class="text-success">People capacity: </b> {{getSelectedEvent[0].capacity}}</h6>
                      <h6 v-if="getSelectedEvent[0].capacity != null"><b class="text-success">Seats Reserved: </b> {{total}}</h6>
                      <h5 class="text-info mt-4"><b>Engagement Tags</b></h5>
                      <span class="badge badge-pill badge-success" v-for="(tag,index) in getEventTags" :key="index">{{tag.value}}</span>
                  </div>
                  <div class="event-info mt-2">
                    <h5 class="text-info"><b>Host Information</b></h5>
                     <p style="display:none;">{{getUserDetails(getSelectedEvent[0].created_by) }}</p>
                     <img class="rounded-circle" v-if="userDetails.profile_image != null" :src="userDetails.profile_image" width="30" alt="">
                     <span class="ml-3" v-if="userDetails.first_name != undefined">
                       <b>{{userDetails.first_name + " " + userDetails.last_name}}</b> 
                     </span>
                     <button class="btn btn-info btn-block" @click="viewProfile(getSelectedEvent[0].created_by)">View Profile</button>
                  </div>
                  <div class="event-info mt-2 mb-5">
                    <h5 class="text-info"><b>Engagement Participants</b></h5>
                      <div class="col-md-12" v-for="(user, index) in getParticipantsList" :key="index">
                        <strong class="text-success">{{ user.first_name + " " + user.last_name}}</strong>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.participateModal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Event Participation</h4>
      <h4 class="text-danger text-center">{{msg}}</h4>
      <a class="btn btn-success text-center text-white btn-block" v-clipboard="() => url" v-clipboard:success="clipboardSuccessHandler">Copy Link</a>
    </modal>
  </div>
</template>
<script>
import { Parallax, FormGroupInput, Alert, Modal } from '@/components';


import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'event-details',
  bodyClass: 'event-details-page',
  components: {
    Parallax,
    Alert,
    Modal,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      modals: {
        participateModal: false,
      },
      url: window.location.href,
      rating: 0,
      eventRating: 5,
      success: null,
      event: [],
      fetchedTags: [],
      tagName: [],
      newEvent: {
          id: null,
          userId: null
      },
      msg: null,
      userEvents: [],
      ratedEvents: [],
      total: 0,
      currentDate: null,
      userDetails: {},
      participated: false,
      participantsList: [],

      submitEventRating: {
        ratingStars: null,
        feedback: null,
        host_id: null,
        event_id: null,
        user_id: null,
      },

      isUserParticipant: false,
      isUserRated: false,

      fetchedRatings: [],
    }
  },
  computed: {
    ...mapGetters(['getSelectedEvent', 'allTags', 'getParticipants', 'user','allUsers', 'allRatings', 'ratingDone']),

    getEventTags() {
        this.fetchedTags = this.getSelectedEvent[0].tags
        return this.fetchedTags.map(element => {
            let eventTag = this.allTags.find(tag => tag.id==element)
            return eventTag
        });   
    },

    getParticipantsList() {
      this.participantsList = [];
      return this.getParticipants.map(item => {
        let user_item = this.allUsers.find(user => user.id == item)
          return user_item
      })
    },

    getRatings() {
      this.fetchedRatings = [];
      let rating = this.allRatings.filter(item => item.event_id == this.newEvent.id)
      return rating;
    }
  },
  methods: {
    ...mapActions(['fetchEventById', 'fetchTags', 'fetchParticipants', 'eventParticipant', 'fetchUser', 'fetchUserById', 'saveRating']),

    copyLink() {
      var copyText = window.location.href;
      console.log(copyText)
      document.execCommand("copy");
    },
    clipboardSuccessHandler({ value, event }) {
        console.log('success', value)
    },
    getUserDetails(id) {

      // let ref = this;
       let user_obj=this.allUsers.find(user_item=>user_item.id==id)
       this.userDetails = user_obj
       return user_obj
    },
    participateEvent() {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      if(loggedUser != null) {
        // for(var key in this.getSelectedEvent[0].users_attending){
        //     this.userEvents.push(this.getSelectedEvent[0].users_attending[key])
        // }

        if(this.userEvents.find(element => element == loggedUser.id)) {
          console.log("Already Signed Up")
          this.msg = "You are Already Signed Up"
          this.modals.participateModal = true
          this.participated = true
        }
        else {
          if(this.getSelectedEvent[0].event_price_per_person != null){
            this.modals.participateModal = true
            this.msg = "Please Pay Engagement Fee to particpate"
          }
          else if(this.total >= this.getSelectedEvent[0].capacity) {
            this.modals.participateModal = true
            this.msg = "Sorry! All seats are reserved"
          }
          else {
            this.eventParticipant(this.newEvent)
            this.total++;
            this.modals.participateModal = true
            this.msg = "Your Seat has been confirmed"
          }
        }
      }
      else {
        this.modals.participateModal = true
        this.msg = "Please Login to Participate"
      }
    },
    
    viewProfile(id) {
      this.$router.push({path:'/users/'+id})
    },

    rateEngagementNow() {
      this.submitEventRating.host_id = this.getSelectedEvent[0].created_by;
      this.submitEventRating.user_id = this.newEvent.userId;
      this.submitEventRating.event_id = this.$route.params.eventId;

      this.saveRating(this.submitEventRating);

      console.log("Feedback " +  this.submitEventRating.feedback)
      console.log("Stars " +  this.submitEventRating.ratingStars)
      console.log("Host " +  this.submitEventRating.host_id)
      console.log("User " +  this.submitEventRating.user_id)
      console.log("Event " +  this.submitEventRating.event_id)
    }
  },
  created() {
    this.newEvent.id = this.$route.params.eventId
    this.fetchTags();
    this.fetchParticipants(this.newEvent);
    this.total = this.getParticipants.length;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    this.currentDate = mm + "/" + dd + "/" + yyyy;

    this.fetchEventById(this.newEvent);

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
        this.newEvent.userId = loggedUser.id
        for(var key in this.getSelectedEvent[0].users_attending){
          this.userEvents.push(this.getSelectedEvent[0].users_attending[key])
        }
        if(this.userEvents.find(element => element == loggedUser.id)) {
          this.isUserParticipant = true
          console.log(this.isUserParticipant) 
        }

        for(var key in loggedUser.events_rated) {
          this.ratedEvents.push(loggedUser.events_rated[key])
        }
        if(this.ratedEvents.find(element => element == this.newEvent.id)) {
          this.isUserRated = true
          console.log("Rated" + this.isUserRated) 
        }


    }
    
     

    //this.getSelectedEventTags()
    
    // console.log("Participants")
    // console.log(this.getParticipants)

    
  },
  watch: {
      getParticipated(val) {
        console.log('Watching')
          if(val) {
              setTimeout(() => {
                  if(val == 'success'){
                    this.success = true
                    this.msg = "Your Seat Has Been Confirmed"
                    console.log("Confirmed")
                  }
                }, 500)
          }
          else {
            console.log('No Val')
          }
      },

      ratingDone(val) {
        if(val) {
          setTimeout(() => {
                  if(val == 'success'){
                    this.isUserRated = true
                    console.log("You Rated")
                  }
                }, 500)
        }
      }
  }
};
</script>
<style scoped>
  input[type="text"] {
    color: #fff;
  }
  #image {
      max-width: 100%;
      width: 100%;
      height: 400px;
  }
  #card-margin {
      margin-top: -70px;
  }
  .event-info {
    padding: 10px;
    border: 2px solid #e5e5e5;
  }
  #top {
    margin-top: -70px;
  }
</style>
  