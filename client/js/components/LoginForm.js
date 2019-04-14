Vue.component('login-form', {
    props: ['position'],
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            now: {
                position: ''
            }
        }
    },
    methods: {
        loginUser() {
            this.$emit('login-user', this.user)
            this.user.email = ''
            this.user.password = ''
        },
        registerUser() {
            this.$emit('register-user', this.user)
            this.now.position = 'login'
            this.user.email = ''
            this.user.password = ''
        }
    },
    template: `
    <div class="login-wrap">
        <div class="login-html">
            <div v-if="position==='login'">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
                <label for="tab-1" class="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="for-pwd">
                <label for="tab-2" class="tab">Sign Up</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <form v-on:submit.prevent="loginUser">
                            <div class="group" style="color:black">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="user.email" style="color:black" required>
                            </div>
                            <div class="group" style="color:black">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password"
                                    v-model="user.password" style="color:black" required>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In">
                            </div>
                            <div class="hr">
                                <div id="my-signin2"></div>
                            </div>
                        </form>
                    </div>
                    <div class="for-pwd-htm">
                        <form v-on:submit.prevent="registerUser">
                            <div class="group" style="color:black">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="user.email" style="color:black" required>
                            </div>
                            <div class="group" style="color:black">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password"
                                    v-model="user.password" style="color:black" required>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign Up">
                            </div>
                            <div class="hr"></div>
                        </form>
                    </div>
                </div>
            </div>
            <div v-if="position==='register'">
                <input id="tab-1" type="radio" name="tab" class="sign-in">
                <label for="tab-1" class="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="for-pwd" checked>
                <label for="tab-2" class="tab">Sign Up</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <form v-on:submit.prevent="loginUser">
                            <div class="group" style="color:black">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="email" style="color:black" required>
                            </div>
                            <div class="group" style="color:black">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password"
                                    v-model="password" style="color:black" required>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In">
                            </div>
                            <div class="hr">
                                <div id="my-signin2"></div>
                            </div>
                        </form>
                    </div>
                    <div class="for-pwd-htm">
                        <form v-on:submit="registerUser">
                            <div class="group">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="email" style="color:black" required>
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password"
                                    v-model="password" style="color:black" required>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign Up">
                            </div>
                            <div class="hr"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})