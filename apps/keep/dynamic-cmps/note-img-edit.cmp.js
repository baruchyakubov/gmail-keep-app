export default {
    props: ['note'],
    template: `
    <section class="note-img-edit" v-if="note">
        <div>
            <p>Title:</p>
           <input type="text" :value="note.info.title" />
        </div>
        <div>
           <p>Image url:</p>
           <input type="text" :value="note.info.url" />
        </div>
    </section>
    `
}