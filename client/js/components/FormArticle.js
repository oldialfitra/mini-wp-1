Vue.component('add-article', {
    props: ['allTags'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput
    },
    data() {
        return {
            article: {
                title: '',
                content: '',
                image: '',
                selectedTags: ''
            }
        }
    },
    methods: {
        addArticle() {
            console.log('masuk ke add article')
            console.log(this.$refs.file.files[0])
            this.article.image = this.$refs.file.files[0]
                // this.image = this.$refs.file.files[0];
            this.$emit('add-new-article', this.article)
            this.article.title = ''
            this.article.content = ''
            this.article.image = ''
            this.article.selectedTags = ''
        }
    },
    template: `
    <div class=" form-wrap modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Article</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="addArticle">
                    <div class="form-group" style="color:black">
                        <label class="label">Title</label>
                        <input type="text" v-model="article.title" placeholder="Title" class="form-control text-center" required>
                    </div>
                    <div class="form-group" style="color:black">
                        <label class="label">Content</label>
                        <wysiwyg v-model="article.content" required />
                    </div>
                    <div class="form-group" style="color:black">
                        <label class="label">Tags</label>
                        <tags-input element-id="tags" class="form-control text-center" v-model="article.selectedTags" v-bind:existing-tags="allTags":typeahead="true"></tags-input>
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