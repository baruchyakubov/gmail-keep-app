import noteImg from "../dynamic-cmps/note-img.cmp.js"
import noteTxt from "../dynamic-cmps/note-txt.cmp.js"
import noteTodos from "../dynamic-cmps/note-todos.cmp.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
        <section @click="editNote" @mouseleave="isHover=false" @mouseover="isHover=true" :style="{ 'background-color': note.style.backgroundColor }" v-if="note" class="note-preview">
            <component :is="note.type" :note="note"></component>
            <div :class="{visible: isHover}" class="note-action-btn">
                 <img class="delete-icon" @click.stop="deleteEmail" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682443/pndv8blj1ovmewptmwox.png" alt="" />
                 <img class="pin-icon" @click.stop="pinNote" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674696952/d9qvmjsngtjgfeylqwfr.png" alt="" />
            </div>
        </section>
    `,
    data() {
        return {
            isHover: false
        }
    },
    methods:{
        editNote(){
            this.$router.push(`/keep-app/edit/${this.note.id}`)
        },
        deleteEmail(){
            eventBus.emit('deleteEmail' , this.note.id)
        },
        pinNote(){
            const note = {...this.note}
            note.isPinned = !note.isPinned 
            eventBus.emit('edit' , note)
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos
    }
}