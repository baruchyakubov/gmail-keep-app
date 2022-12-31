import noteImg from "../dynamic-cmps/note-img.cmp.js"
import noteTxt from "../dynamic-cmps/note-txt.cmp.js"
import noteTodos from "../dynamic-cmps/note-todos.cmp.js"

export default {
    props: ['note'],
    template: `
        <section @mouseleave="isHover=false" @mouseover="isHover=true" :style="{ 'background-color': note.style.backgroundColor }" v-if="note" class="note-preview">
            <component :is="note.type" :note="note"></component>
            <div :class="{visible: isHover}" class="note-action-btn">
                 <img src="../../assets/img/delete.png" alt="" />
            </div>
        </section>
    `,
    data() {
        return {
            isHover: false
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos
    }
}