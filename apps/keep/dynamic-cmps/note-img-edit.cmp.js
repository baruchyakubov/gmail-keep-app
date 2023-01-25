export default {
    props: ['note'],
    template: `
    <section class="note-img-edit" v-if="note">
        <div>
            <p>Title:</p>
           <input @input="$emit('setForm' , form)" type="text" v-model="form.title" />
        </div>
        <div>
           <p>Image url:</p>
           <input @input="$emit('setForm' , form)" type="text" v-model="form.url" />
        </div>
    </section>
    `,
        data() {
            return {
                form: {
                    url: this.note.info.url,
                    title: this.note.info.title
                }
            }
        }
}