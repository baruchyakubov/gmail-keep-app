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
                 <img @click.stop="deleteEmail" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682443/pndv8blj1ovmewptmwox.png" alt="" />
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
            this.$router.push(`/keep-app/${this.note.id}`)
        },
        deleteEmail(){
            eventBus.emit('deleteEmail' , this.note.id)
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos
    }
}