export default {
    props:['note'],
    template: `
        <section class="note-txt-edit" v-if="note">
           <input type="text" :value="note.info.txt" />
        </section>
    `
}