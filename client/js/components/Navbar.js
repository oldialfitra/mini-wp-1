Vue.component('nav-bar', {
    methods: {
        login() {
            this.$emit('change-to-login')
        },
        register() {
            this.$emit('change-to-register')
        }
    },
    template: `
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"><i class="fab fa-wordpress-simple"></i> Mini WP</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">
                        <i class="fa fa-home"></i>
                        Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa fa-envelope-o">
                        </i>
                        Link
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">
                        <i class="fa fa-envelope-o">
                        </i>
                        Disabled
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-envelope-o">
                        </i>
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" v-on:click="login">
                        <i class="fa fa-bell">
                        </i>
                        Test
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-on:click="register">
                        <i class="fa fa-globe">
                        </i>
                        Test
                    </a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit" style="color:white">Search</button>
            </form>
        </div>
    </nav>
    `
})