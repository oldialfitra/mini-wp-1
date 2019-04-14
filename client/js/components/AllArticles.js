Vue.component('all-articles', {
    props: ['oneArticle', 'indexArticle', 'currentUser'],
    data() {
        return {

        }
    },
    methods: {
        getOneArticle(id) {
            console.log('masuk ke get one component')
            this.$emit('get-one', {id})
        },
        deleteArticle(id, index) {
            console.log('masuk ke delete')
            console.log(id)
            console.log(index)
            this.$emit('delete-one', {id, index})
        },
        clickTag(name) {
            console.log(name)
            this.$emit('one-tag', {name})
        }
    },
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <span>{{oneArticle.author.email}}</span>
            
            <!-- Go to www.addthis.com/dashboard to customize your tools -->
            <div class="addthis_inline_share_toolbox" v-bind:data-url="oneArticle.featured_image" v-bind:data-title="oneArticle.title" v-bind:data-description="oneArticle.content" v-bind:data-media="oneArticle.featured_image"></div>
        
            <div class="btn-group" style="float:right;" v-if="oneArticle.author._id===currentUser">
                <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#updateModal" v-on:click="getOneArticle(oneArticle._id)">Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteArticle(oneArticle._id, indexArticle)">Delete</button>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="panel-body">
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object" v-bind:src="oneArticle.featured_image"
                            style="max-width:400px;max-height:400px; box-shadow: 10px 10px 5px grey;" alt="Kurt">
                    </a>
                    <div class="list-tags">  
                        <div class="tags-content" v-for="tag in oneArticle.tags">
                            <a href="" v-on:click.prevent="clickTag(tag)">{{ tag }}</a>
                        </div>
                    </div>
                </div>
                <div class="media-body">
                    <h4 class="media-heading well text-center"><strong>{{oneArticle.title}}</strong></h4>
                    <p v-html="oneArticle.content"></p>
                    <div class="clearfix"></div>
                    <div class="btn-group" role="group" id="BegeniButonlari">
                        <button type="button" class="btn btn-default"><span
                                class="glyphicon glyphicon-thumbs-up"></span></button>
                        <button type="button" class="btn btn-default"><span
                                class="glyphicon glyphicon-thumbs-down"></span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})