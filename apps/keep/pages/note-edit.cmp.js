import { keepService } from "../../../services/keep-app.service.js"
import noteTxtEdit from "../dynamic-cmps/note-txt-edit.cmp.js"
import noteImgEdit from "../dynamic-cmps/note-img-edit.cmp.js"
import noteTodosEdit from "../dynamic-cmps/note-todos-edit.cmp.js"
import colorPicker from "../cmps/color-picker.cmp.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <div @click="$router.push('/keep-app')" v-if="note" class="opacity-wrapper"></div>
        <section v-if="note" :style="{ 'background-color': note.style.backgroundColor }" class="edit-modal">
            <color-picker @setNoteColor="setNoteColor"></color-picker>
           <component :is="note.type + 'Edit'" :note="note"></component>
        </section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        const id = this.$route.params.id
        keepService.get(id)
            .then(note => {
                this.note = note
            })
    },
    methods:{
        setNoteColor(color){
            eventBus.emit('setNoteColor' , {note: this.note, color})
        }
    },
    components:{
        noteTxtEdit,
        noteImgEdit,
        noteTodosEdit,
        colorPicker
    }
}