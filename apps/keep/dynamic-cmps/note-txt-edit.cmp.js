export default {
    props:['note'],
    template: `
        <section class="note-txt-edit" v-if="note">
           <input @input="$emit('setForm' , form)" type="text" v-model="form.txt" />
        </section>
    `,
    data(){
        return {
            form:{
                txt: this.note.info.txt
            }
        }
    }
}