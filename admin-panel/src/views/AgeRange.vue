<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0">
                                        View Age Range Statistics
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div v-if="users.length>0" class="table-responsive" style="padding:38px" >
                           <div class="row"> 
                                <div class="col-xl-6" >
                                    <card header-classes="bg-transparent">
                                        <div slot="header" class="row align-items-center">
                                            <div class="col">
                                                <h6 class="text-uppercase text-muted ls-1 mb-1">Age Range Statistics</h6>
                                                <h5 class="h3 mb-0">Events Attended</h5>
                                            </div>
                                        </div>
                                        <bar-chart
                                                :height="350"
                                                ref="barChart"
                                                :chart-data="redBarChart2.chartData"
                                        >
                                        </bar-chart>
                                    </card>
                                </div>
                                <div class="col-xl-6">
                                    <card header-classes="bg-transparent">
                                        <div slot="header" class="row align-items-center">
                                            <div class="col">
                                                <h6 class="text-uppercase text-muted ls-1 mb-1">Age Range Statistics</h6>
                                                <h5 class="h3 mb-0">Events Hosted</h5>
                                            </div>
                                        </div>
                                        <bar-chart
                                                :height="350"
                                                ref="barChart"
                                                :chart-data="redBarChart.chartData"
                                        >
                                        </bar-chart>
                                    </card>
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
  import {mapGetters,mapActions} from 'vuex'
  import * as chartConfigs from '@/components/Charts/config';
  import BarChart from '@/components/Charts/BarChart';

  export default {
    components:{
      BarChart
    },
    data(){
        return{
            redBarChart: {
            chartData: {
                labels: ['15-25', '25-35', '35-45', '45-55', '55-65', '65-75'],
                datasets: [{
                label: 'Events Hosted',
                data: [],
                }]
            },
            },
            redBarChart2: {
            chartData: {
                labels: ['15-25', '25-35', '35-45', '45-55', '55-65', '65-75'],
                datasets: [{
                label: 'Events Attended',
                data: [],
                }]
            },
            }
        }
    },
    name: 'agerange',
    computed : {
        ...mapGetters(['users']),
        get15to25Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>=15 && user_item.age<=25)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                  events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                  events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        },
        get25to35Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>25 && user_item.age<=35)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                  events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                  events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        },
        
        get35to45Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>35 && user_item.age<=45)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                  events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                  events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        },
        get45to55Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>45 && user_item.age<=55)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                  events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                  events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        },
        get55to65Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>55 && user_item.age<=65)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                  events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                  events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        },
        get65to75Events(){
            let arrs=this.users.filter(user_item=> user_item.role==null && user_item.age>65 && user_item.age<=75)
            var events_hosted=0
            var events_attended=0
            arrs.forEach(item=>{
                if(item.events_hosted){
                    events_hosted=events_hosted+Object.keys(item.events_hosted).length
                }
                if(item.events_attended){
                    events_attended=events_attended+Object.keys(item.events_attended).length

                }

            })
            return {events_hosted:events_hosted,events_attended:events_attended}
        }
    },
    created(){
        console.log("mounted")
        if(this.users.length>0){
             this.redBarChart.chartData.datasets[0].data.push(this.get15to25Events.events_hosted)
            this.redBarChart.chartData.datasets[0].data.push(this.get25to35Events.events_hosted)
            this.redBarChart.chartData.datasets[0].data.push(this.get35to45Events.events_hosted)
            this.redBarChart.chartData.datasets[0].data.push(this.get45to55Events.events_hosted)
            this.redBarChart.chartData.datasets[0].data.push(this.get55to65Events.events_hosted)
            this.redBarChart.chartData.datasets[0].data.push(this.get65to75Events.events_hosted)

        


            this.redBarChart2.chartData.datasets[0].data.push(this.get15to25Events.events_attended)
            this.redBarChart2.chartData.datasets[0].data.push(this.get25to35Events.events_attended)
            this.redBarChart2.chartData.datasets[0].data.push(this.get35to45Events.events_attended)
            this.redBarChart2.chartData.datasets[0].data.push(this.get45to55Events.events_attended)
            this.redBarChart2.chartData.datasets[0].data.push(this.get55to65Events.events_attended)
            this.redBarChart2.chartData.datasets[0].data.push(this.get65to75Events.events_attended)
        }
    },
    watch:{
        users(val){
        console.log("changed")
                console.log("changed")

        this.redBarChart.chartData.datasets[0].data.push(this.get15to25Events.events_hosted)
        this.redBarChart.chartData.datasets[0].data.push(this.get25to35Events.events_hosted)
        this.redBarChart.chartData.datasets[0].data.push(this.get35to45Events.events_hosted)
        this.redBarChart.chartData.datasets[0].data.push(this.get45to55Events.events_hosted)
        this.redBarChart.chartData.datasets[0].data.push(this.get55to65Events.events_hosted)
        this.redBarChart.chartData.datasets[0].data.push(this.get65to75Events.events_hosted)

       


        this.redBarChart2.chartData.datasets[0].data.push(this.get15to25Events.events_attended)
        this.redBarChart2.chartData.datasets[0].data.push(this.get25to35Events.events_attended)
        this.redBarChart2.chartData.datasets[0].data.push(this.get35to45Events.events_attended)
        this.redBarChart2.chartData.datasets[0].data.push(this.get45to55Events.events_attended)
        this.redBarChart2.chartData.datasets[0].data.push(this.get55to65Events.events_attended)
        this.redBarChart2.chartData.datasets[0].data.push(this.get65to75Events.events_attended)

        // console.log(this.redBarChart.chartData.datasets[0].data)


        }
    },
    methods : {}
  };
</script>
<style></style>
