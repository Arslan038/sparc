<template>
    <div>
        <div class="main">
            <div class="section">
                <div class="container ml-auto mr-auto">
                    <div class="col-md-2"></div>
                    <div class="col-md-12">
                        <h2 class="text-center title-up text-info">Create New Engagement</h2>
                        <div class="space-50"></div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Upload Engagement Featured Image*</label>
                                <input type="file" class="btn btn-primary mb-3" @change="onFileSelected">
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Upload Engagement Video</label><br/>
                                <input type="file" class="btn btn-primary mb-3" @change="onVideoSelected">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-lg-6">
                                <label for="">Engagement Name*</label>
                                <fg-input placeholder="Engagement Name" v-model="eventPayload.event_name"></fg-input>
                            </div>
                            <div class="col-sm-6 col-lg-6">
                                    <label for="">Engagement Date*</label>
                                    <fg-input>
                                    <el-date-picker
                                        type="date"
                                        popper-class="date-picker date-picker-success"
                                        :picker-options="pickerOptions"
                                        placeholder="Pick Engagement Date"
                                        v-model="eventPayload.date"
                                    >
                                    </el-date-picker>
                                    </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-lg-6">
                                <label for="">Start Time*</label>
                                <fg-input>
                                    <el-time-picker
                                        type="time"
                                        popper-class="time-picker time-picker-primary"
                                        placeholder="Pick Start Date"
                                        v-model="eventPayload.start_time"
                                    >
                                    </el-time-picker>
                                </fg-input>
                            </div>
                            <div class="col-sm-6 col-lg-6">
                                <label for="">End Time*</label>
                                <fg-input>
                                    <el-time-picker
                                        type="time"
                                        popper-class="time-picker time-picker-primary"
                                        placeholder="Pick End Date"
                                        v-model="eventPayload.end_time"
                                    >
                                    </el-time-picker>
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Engagement Location*</label>
                                <fg-input placeholder="Engagement Location" v-model="eventPayload.event_location"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Engagement Address*</label>
                                <fg-input placeholder="Engagement Address" v-model="eventPayload.event_address"></fg-input>
                            </div>   
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Space Name/Number*</label>
                                <fg-input placeholder="Space Name/Number(Lobby of Hotel)" v-model="eventPayload.event_space"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Location Access Instructions*</label>
                                <fg-input placeholder="Location Access Instructions" v-model="eventPayload.event_location_access"></fg-input>
                            </div>   
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <label for="">Host Contact Information*</label>
                                <fg-input placeholder="Host Contact Information" v-model="eventPayload.host_contact"></fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <label for="">Engagement Description*</label>
                                <fg-input placeholder="Engagement Description" v-model="eventPayload.event_description"></fg-input>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12 col-lg-12">
                                <label for="">Engagement Tags*</label>
                                <multiselect v-model="eventPayload.tags" 
                                :options="allTags" 
                                :multiple="true" 
                                :close-on-select="false" 
                                :clear-on-select="false" 
                                :preserve-search="true" 
                                placeholder="Pick Engagement Tags" 
                                label="value" 
                                track-by="value" 
                                :preselect-first="false">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                                </multiselect>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <label for="" class="mb-3">Is Engagement virtual, in person, or both ?</label><br>
                                <input type="radio" v-model="eventPayload.event_type" value="virtual"> Virtual
                                <input type="radio" v-model="eventPayload.event_type" value="in Person"> In Person
                                <input type="radio" v-model="eventPayload.event_type" value="both"> Both   
                            </div>
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'in Person'">
                            <div class="col-md-12 col-lg-12">
                                <label for="">People Capacity*</label>
                                <fg-input type="number" min="1" placeholder="Capacity" v-model="eventPayload.capacity"></fg-input>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'virtual'">
                            <div class="col-md-12 col-lg-12">
                                <label for="">People Capacity*</label>
                                <fg-input type="number" min="1" placeholder="Capacity" v-model="eventPayload.virtual_capacity"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Zoom Link*</label>
                                <fg-input placeholder="Zoom Link" v-model="eventPayload.zoom_link"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Google Hangout Link*</label>
                                <fg-input placeholder="Google Hangout Link" v-model="eventPayload.google_link"></fg-input>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="eventPayload.event_type == 'both'">
                            <div class="col-md-6 col-lg-6">
                                <label for="">In Person Capacity*</label>
                                <fg-input type="number" min="1" placeholder="In Person Capacity" v-model="eventPayload.capacity"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Virtual Capacity*</label>
                                <fg-input type="number" min="1" placeholder="Virtual Capacity" v-model="eventPayload.virtual_capacity"></fg-input>
                            </div>

                            <div class="col-md-6 col-lg-6">
                                <label for="">Zoom Link*</label>
                                <fg-input placeholder="Zoom Link" v-model="eventPayload.zoom_link"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <label for="">Google Hangout Link*</label>
                                <fg-input placeholder="Google Hangout Link" v-model="eventPayload.google_link"></fg-input>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6 col-lg-6">
                                <label for="">Will this Engagement be Free ?</label> <br>
                                <input type="radio" v-model="eventPayload.event_free" value="yes"> Yes
                                <input type="radio" v-model="eventPayload.event_free" value="no"> No
                            </div>
                        </div>
                        <div class="row mt-2" v-if="eventPayload.event_free == 'no'">
                            <div class="col-md-12 col-lg-12">
                                <label for="">Price Per Person*</label>
                                <fg-input placeholder="Price Per Person" v-model="eventPayload.event_price_per_person"></fg-input>
                            </div>
                            <div class="col-md-12 col-lg-12 mb-2">
                                <label for="">Will this Engagement going to a cause ?</label> <br>
                                <input type="radio" v-model="eventPayload.cause" value="yes"> Yes
                                <input type="radio" v-model="eventPayload.cause" value="no"> No
                            </div>
                            <div class="col-md-6 col-lg-6" v-if="eventPayload.cause == 'yes'">
                                <label for="">Charity 1*</label>
                                <fg-input placeholder="Percentage" v-model="eventPayload.event_cause1"></fg-input>
                            </div>
                            <div class="col-md-6 col-lg-6" v-if="eventPayload.cause == 'yes'">
                                <label for="">Charity 2 (Optional)</label>
                                <fg-input placeholder="Percentage" v-model="eventPayload.event_cause2"></fg-input>
                            </div>
                        </div>
                        <div class="row col-md-12 col-lg-12">
                            <n-button class="btn btn-primary btn-block ml-3 mt-3" round @click="validateEvent">{{ createButton }}</n-button>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <alert type="danger" v-if="warning" dismissible>
                                    <div class="alert-icon">
                                    <i class="now-ui-icons objects_support-17"></i>
                                    </div>
                                    <strong>Something went wrong!</strong> {{ message }}
                                </alert>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Button,
  Alert,
  Checkbox,
  Radio,
  FormGroupInput,
  Switch
} from '@/components';
import { DatePicker, TimePicker } from 'element-ui';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'create_engagement',
    components: {
        Multiselect,
        Alert,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [DatePicker.name]: DatePicker,
    [TimePicker.name]: TimePicker,
    [FormGroupInput.name]: FormGroupInput,
    [Switch.name]: Switch,
    [Option.name]: Option,
  },
  computed: { ...mapGetters(['allTags'])},
  data() {
      return {
          file: '',
          createButton: 'Create Engagement',
          pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now();
            },
          },
        eventPayload: {
            created_by: null,
            event_name: null,
            event_location: null,
            event_address: null,
            event_location_access: null,
            event_space: null,
            host_contact: null,
            zoom_link: null,
            capacity: null,
            virtual_capacity: null,
            google_link: null,
            event_cause1: null,
            event_cause2: null,
            event_price_per_person: null,
            cause: 'no',
            event_free: 'yes',
            event_type: 'in Person',
            tags: [],
            date: null,
            start_time: null,
            end_time: null,    
            event_description: null,
            event_image: null,
            event_video: null,
        },
        warning: false,
        message: '',
        interestId: []
      }
  },
  methods: {
      ...mapActions(['fetchTags','createEvent']),

      validateEvent() {
          if(this.eventPayload.event_name == null || this.eventPayload.event_location == null || this.eventPayload.host_contact == null || this.eventPayload.event_space == null || this.eventPayload.event_address == null || this.eventPayload.event_location_access == null || this.eventPayload.date == null || this.eventPayload.start_time == null || this.eventPayload.end_time == null || this.eventPayload.event_description == null || this.eventPayload.tags == null){
              this.message = "Please Fill Required Fields"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'in Person' && this.eventPayload.capacity == null) {
              this.message = "Please Set In Person Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'virtual' && (this.eventPayload.zoom_link == null || this.eventPayload.google_link == null)) {
              this.message = "Please Enter Zoom Link and Google Hangout Link for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'both' && (this.eventPayload.zoom_link == null || this.eventPayload.google_link == null)) {
              this.message = "Please Enter Zoom Link and Google Hangout Link for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'virtual' && this.eventPayload.virtual_capacity == null) {
              this.message = "Please Set Virtual Capacity for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.event_type == 'both' && (this.eventPayload.capacity == null || this.eventPayload.virtual_capacity == null) ) {
              this.message = "Both In Person and Virtual Capacity Required"
              this.warning = true
          }
          else if(this.eventPayload.event_free == 'no' && this.eventPayload.event_price_per_person == null) {
              this.message = "Please Enter Price Per Person for Engagement"
              this.warning = true
          }
          else if(this.eventPayload.cause == 'yes' && this.eventPayload.event_cause1 == null) {
              this.message = "Please Enter Percentage for Cause"
              this.warning = true
          }
          else if(this.eventPayload.event_image == null) {
              this.message = "Please Pick Event Image"
              this.warning = true
          }
          else {
              this.registerEvent();
          }
      },

      registerEvent() {
          this.createButton = "Creating Event Please Wait..."
          const newDate = this.eventPayload.date.toLocaleDateString()
          const newStartTime = this.eventPayload.start_time.toLocaleTimeString()
          const newEndTime = this.eventPayload.end_time.toLocaleTimeString()
          this.eventPayload.date = newDate
          this.eventPayload.start_time = newStartTime
          this.eventPayload.end_time = newEndTime

            if(this.eventPayload.tags != null) {
                this.eventPayload.tags.forEach(item => {
                this.interestId.push(item.id)
                })
            }

            this.eventPayload.tags = this.interestId

          this.createEvent(this.eventPayload);
          this.$router.push('/host')
      },
      onFileSelected(event) {
          let file = event.target.files[0]
          this.eventPayload.event_image = file
          var extension = file.name.substring(file.name.lastIndexOf('.')+1);
      },
      onVideoSelected(event) {
          let video = event.target.files[0];
          this.eventPayload.event_video = video
          console.log(this.eventPayload.event_video.name);
      }
  },
  created() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
        this.eventPayload.created_by = loggedUser.id
    }
    this.fetchTags();
  }
}
</script>

<style scoped>
    
</style>
