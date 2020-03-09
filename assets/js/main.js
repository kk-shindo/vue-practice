const app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        json: './assets/json/job.json',
        keys: {
            "company": "会社名",
            "job_name": "求人名",
            "income": "年収",
            "location": "勤務地"
        },
        jobs: []
    },
    methods: {
        getJobs: function () {
            axios.get(this.json)
                .then(function (response) {
                    this.jobs = response.data;
                }.bind(this))
                .catch(function (error) {
                    console.error(error)
                }.bind(this))
        }
    },
    mounted() {
        this.getJobs()
    }
})