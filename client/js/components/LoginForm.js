Vue.component('loginform', {
    props: ['position'],
    data() {
        return {
            positionNow: 'login',
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$emit('loginuser', this.user)
        },
        register() {
            this.$emit('registeruser', this.user)
        },
        changeToSignIn() {
            this.$emit('changelogin')
        },
        changeToSignUp() {
            this.$emit('changeregister')
        }
        
    },
    template: `
    <div class="login-wrap">
        <div class="login-html">
            <div v-if="position==='login'">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="for-pwd" ><label for="tab-2" class="tab">Sign Up</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <form v-on:submit.prevent="login">
                            <div class="group">
                                <label for="user" class="label">Username or Email</label>
                                <input type="email" class="input" v-model="user.email">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password" v-model="user.password">
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In">
                            </div>
                            <div class="hr"></div>
                        </form>
                    </div>
                    <div class="for-pwd-htm">
                        <form v-on:submit.prevent="register">
                            <div class="group">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="user.email">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password" v-model="user.password">
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
                <input id="tab-1" type="radio" name="tab" class="sign-in" ><label for="tab-1" class="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="for-pwd" checked><label for="tab-2" class="tab">Sign Up</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <form v-on:submit.prevent="login">
                            <div class="group">
                                <label for="user" class="label">Username or Email</label>
                                <input type="email" class="input" v-model="user.email">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password" v-model="user.password">
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In">
                            </div>
                            <div class="hr"></div>
                        </form>
                    </div>
                    <div class="for-pwd-htm">
                        <form v-on:submit="register">
                            <div class="group">
                                <label for="user" class="label">Email</label>
                                <input type="email" class="input" v-model="user.email">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input type="password" class="input" data-type="password" v-model="user.password">
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