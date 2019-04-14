Vue.component('update-article', {
    props: ['one-article', 'allTags'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput
    },
    methods: {
        updateArticle() {
            console.log(this.oneArticle)
            // console.log('masuk ke update article')
            // // console.log(this.$refs.file.files[0])
            this.oneArticle.image = this.$refs.file.files[0]
            // // this.image = this.$refs.file.files[0];
            // console.log(this.oneArticle, 'ini article')
            this.$emit('update-article', this.oneArticle)
            // this.oneArticle.title = ''
            // this.oneArticle.content = ''
            // this.oneArticle.image = ''
            // this.oneArticle.tags = ''
        }
    },
    template: `
    <div class=" form-wrap modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update Article</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="updateArticle">
                    <div class="form-group" style="color:black">
                        <label class="label">Title</label>
                        <input type="text" v-model="oneArticle.title" placeholder="Title" class="form-control text-center" required>
                    </div>
                    <div class="form-group" style="color:black">
                        <label class="label">Content</label>
                        <wysiwyg v-model="oneArticle.content" required />
                    </div>
                    <div class="form-group" style="color:black">
                        <label class="label">Tags</label>
                        <tags-input element-id="tags" class="form-control text-center" v-model="oneArticle.tags" v-bind:existing-tags="allTags":typeahead="true"></tags-input>
                    </div>
                    <div class="form-group" style="color:black">
                        <label class="label">Image</label>
                        <input type="file" class="mt-3 form-control text-center" id="file" ref="file" required></input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="Submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    `
})