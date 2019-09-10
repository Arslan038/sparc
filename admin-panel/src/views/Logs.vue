<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <search-logs-table title="Sparco Search Logs" :tableData="searches"></search-logs-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import SearchLogsTable from './Tables/SearchLogsTable'
  import {mapGetters} from 'vuex'
  export default {
    name: 'tables',
    components: {
      SearchLogsTable
    },
    computed : {
        ...mapGetters(['users','getUsers','tags','searches']),
    }
  };
</script>
<style scoped>
  </style>
