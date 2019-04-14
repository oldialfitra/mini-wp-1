let baseURL = 'http://localhost:5000'

function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(localStorage.getItem('token') === undefined, 'ini google')
    if (!localStorage.getItem('token')) {
        app.loginGoogle(id_token)
    }
}

function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': onSuccess,
        'onfailure': onFailure,
        'text': 'helo'
    });
}

function disconnectGoogle() {
    console.log('disconnecting..')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        renderButton()
    });
}

let app = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        position: 'login',
        articles: [],
        existTags: {},
        user: '',
        article: {
            articleId: '',
            title: '',
            content: '',
            image: '',
            selectedTags: ''
        }
    },
    methods: {
        changeSign(payload) {
            console.log('masuk ke main', payload)
            this.position = payload
        },
        showHome() {
            this.position = 'home'
            this.getAllArticle()
            this.getAllTags()
        },
        showForm() {
            this.position = 'form'
        },
        loginUser(payload) {
            axios
                .post(baseURL + '/users/signin', {
                    email: payload.email,
                    password: payload.password
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Logged in`,
                        animation: true,
                        timer: 1500
                    })
                    console.log(data)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.id)
                    this.isLoggedIn = true
                    this.position = 'home'
                    this.getAllArticle()
                    this.getAllTags()
                    this.user = localStorage.getItem('id')
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        loginGoogle(token) {
            console.log(token)
            axios
                .post(baseURL + '/users/googlesignin', {
                    idToken: token
                })
                .then(({ data }) => {
                    // console.log(data)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.id)
                    this.isLoggedIn = true
                    this.position = 'home'
                    this.getAllArticle()
                    this.getAllTags()
                    this.user = localStorage.getItem('id')
                    Swal.fire({
                        type: 'success',
                        title: `Logged in`,
                        animation: true,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        registerUser(payload) {
            console.log('masuk ke register')
            console.log(payload)
            axios
                .post(baseURL + '/users/signup', {
                    email: payload.email,
                    password: payload.password
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Sign Up success`,
                        animation: true,
                        timer: 1500
                    })
                    this.position = 'login'
                })
                .catch((err) => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        logoutUser() {
            this.isLoggedIn = false
            this.position = 'login'
            this.user = ''
            this.articles = []
            this.existTags = {}
            disconnectGoogle()
            localStorage.clear()
        },
        addArticle(payload) {
            let data = new FormData()
            data.append('title', payload.title)
            data.append('content', payload.content)
            data.append('image', payload.image)
            data.append('tags', payload.selectedTags)
            console.log(data)
            // console.log(this.selectedTags.join(','))
            axios
                .post(baseURL + '/articles', data, {
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Add article success`,
                        animation: true,
                        timer: 1500
                    })
                    console.log('masuk ke add article')
                    console.log('')
                    this.position = 'home'
                    this.getAllArticle()
                    $('#exampleModal').modal('toggle');
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getOneArticle(payload) {
            console.log('masuk ke get one')
            console.log(payload)
            axios
                .get(baseURL + '/articles' + `/${payload.id}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    console.log('masuk ke then')
                    this.article.title = data.title
                    this.article.content = data.content
                    this.article.image = data.featured_image
                    this.article.tags = data.tags
                    this.article.articleId = data._id
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        updateArticle(payload) {
            // console.log(payload, 'ini lemparan')
            let data = new FormData()
            data.append('title', payload.title)
            data.append('content', payload.content)
            data.append('image', payload.image)
            data.append('tags', payload.tags)
            // console.log(data, 'ini payload')
            axios
                .put(baseURL + `/articles/${this.article.articleId}`, data, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.article.title = ''
                    this.article.content = ''
                    this.article.image = ''
                    this.article.tags = ''
                    this.article.articleId = ''
                    this.getAllArticle()
                    Swal.fire({
                        type: 'success',
                        title: `Update article success`,
                        animation: true,
                        timer: 1500
                    })
                    $('#updateModal').modal('toggle');
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        deleteArticle(payload) {
            console.log('masuk ke delete')
            console.log(payload, 'ini payload')
            // let articleId = JSON.stringify(payload.id)
            axios
                .delete(baseURL + `/articles/${payload.id}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.articles.splice(Number(payload.index), 1)
                    Swal.fire({
                        type: 'success',
                        title: `Delete article success`,
                        animation: true,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getAllArticle() {
            axios
                .get(baseURL + '/articles', {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getAllTags() {
            console.log('masuk ke all tags')
            axios
                .get(baseURL + '/tags', {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    data.forEach(e => {
                        console.log(e)
                        this.existTags[e.name.toLowerCase()] = e.name
                    });
                    console.log(data)
                    console.log(this.existTags, 'ini exists')

                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getMyArticles() {
            console.log('masuk ke all tags')
            axios
                .get(baseURL + '/articles/my', {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.articles = data

                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getOneTag(payload) {
            console.log('masuk ke getOne')
            axios
                .get(baseURL + `/tags/one?name=${payload.name}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.articles = data.articles.reverse()
                    console.log(data, 'ini tag')
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.isLoggedIn = true
            this.position = 'home'
            this.getAllArticle()
            this.getAllTags()
            this.user = localStorage.getItem('id')
        }
        else {
            this.isLoggedIn = false
            this.position = 'login'
            console.log(this.isLoggedIn)
            console.log(this.position)
            this.user = ''
        }
    }
})