Vue.component('nav-bar', {
    props: ['loggedIn'],
    methods: {
        logoutUser() {
            this.$emit('log-out')
        },
        showHome() {
            this.$emit('show-home')
        },
        showForm() {
            this.$emit('show-form')
        },
        myArticles() {
            console.log('my')
            this.$emit('my-articles')
        }
    },
    template: `
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#" v-on:click="showHome"><i class="fab fa-wordpress-simple"></i> Mini WP</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" v-if="loggedIn===true">
                    <li class="nav-item active">
                        <a class="nav-link" href="#" v-on:click="showHome">
                            <i class="fa fa-home"></i>
                            Home
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">
                            <i class="fa fa-plus"></i>
                            Add Article
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-on:click="myArticles">
                            <i class="fa fa-newspaper"></i>
                            My Article
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav ">
                    <li class="nav-item" v-if="loggedIn===true">
                        <a class="nav-link" href="#" v-on:click="logoutUser">
                            <i class="fas fa-sign-out-alt"></i>
                            SignOut
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})