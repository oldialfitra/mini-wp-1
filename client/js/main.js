let baseURL = 'http://localhost:5000'

let app = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        position: '',
        email: '',
        password: ''
    },
    methods: {
        changeToRegister() {
            console.log('masuk ke register')
            this.position = 'register'
        },
        changeToLogin() {
            console.log('masuk ke login')
            this.position = 'login'
        },
        changeToAllArticle() {
            if (this.position !== 'all') {
                this.position = 'all'
            }
        },
        loginUser() {
            axios
            .post(baseURL + '/users/signin', {
                email: this.email,
                password: this.password
            })
            .then(({data}) => {
                Swal.fire({
                    type: 'success',
                    title: `Logged in`,
                    animation: true,
                    timer: 1500
                })
                console.log(data)
                this.email = ''
                this.password = ''
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                this.isLoggedIn = true,
                this.position = 'all'
            })
        },
        registerUser() {
            axios
            .post(baseURL + '/users/signup', {
                email: this.email,
                password: this.password
            })
            .then(({data}) => {
                Swal.fire({
                    type: 'success',
                    title: `Sign Up success`,
                    animation: true,
                    timer: 1500
                })
                this.email = ''
                this.password = ''
                this.position = 'login'
            })
        },
        logoutUser() {
            localStorage.clear()
            this.isLoggedIn = false
            this.position = 'login'
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.isLoggedIn = true
            console.log(this.isLoggedIn)
            console.log(this.position)
        }
        else {
            this.isLoggedIn = false
            this.position = 'login'
            console.log(this.isLoggedIn)
            console.log(this.position)
        }
    },

})