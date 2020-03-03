const app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        json: './assets/json/job.json',
        jobs: [
            {
                company: 'テスト会社',
                job_name: 'テストお仕事',
                income: '年収100万円',
                location: '勤務地テスト',
                image: './assets/img/img01.jpg'
            },
            {
                company: 'テスト会社',
                job_name: 'テストお仕事',
                income: '年収100万円',
                location: '勤務地テスト',
                image: './assets/img/img01.jpg'
            },
            {
                company: 'テスト会社',
                job_name: 'テストお仕事',
                income: '年収100万円',
                location: '勤務地テスト',
                image: './assets/img/img01.jpg'
            },
            {
                company: 'テスト会社',
                job_name: 'テストお仕事',
                income: '年収100万円',
                location: '勤務地テスト',
                image: './assets/img/img01.jpg'
            }
        ]
    },
    methods: {
        getJobs: function () {
            console.log(this.json)
            axios.get(this.json)
                .then(function (response) {
                    console.log()
                    this.jobs = response;
                })
                .catch(function (error) {
                    console.error(error)
                })
        }
    },
    mounted() {
        // this.getJobs()
    }
})