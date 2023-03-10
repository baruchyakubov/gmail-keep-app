import { keepService } from "../../../services/keep-app.service.js"
import noteTxtEdit from "../dynamic-cmps/note-txt-edit.cmp.js"
import noteImgEdit from "../dynamic-cmps/note-img-edit.cmp.js"
import noteTodosEdit from "../dynamic-cmps/note-todos-edit.cmp.js"
import colorPicker from "../cmps/color-picker.cmp.js"
import noteVideoEdit from "../dynamic-cmps/note-video-edit.cmp.js"
import { eventBus, showErrorMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <div @click="$router.push('/keep-app')" v-if="note" class="opacity-wrapper"></div>
        <section v-if="note" :style="{ 'background-color': note.style.backgroundColor }" class="edit-modal">
            <div v-if="!note.id" class="note-type-choose-container">
                <img @click="setNoteType('noteTxt')" v-if="note.type!=='noteTxt'" title="Add txt" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674826944/kkr2yjq0lot8vuodcdfo.png" alt="" />
                <img @click="setNoteType('noteTodos')" v-if="note.type!=='noteTodos'" title="Add todos" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674826939/efpblcjlz0yf6czggcdh.png" alt="" />
                <img @click="setNoteType('noteImg')" v-if="note.type!=='noteImg'" title="Add image" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674826920/bfzkdfg6l2olf9vuo8n1.png" alt="" />
                <img @click="setNoteType('noteVideo')" v-if="note.type!=='noteVideo'" title="Add image" src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674961572/yaaadkj26va6ysghfhmb.png" alt="" />
            </div>
            <color-picker @setNoteColor="setNoteColor"></color-picker>
           <component @setForm="setForm" :is="note.type + 'Edit'" :note="note"></component>
           <button class="edit-btn" @click="edit">Edit</button>
        </section>
    `,
    data() {
        return {
            note: null,
            form: null
        }
    },
    created() {
        const id = this.$route.params.id
        if (!id) {
            this.note = keepService.getEmptyNote('noteTxt')
            return
        }
        keepService.get(id)
            .then(note => {
                this.note = note
            })
    },
    methods: {
        setForm(form) {
            this.form = form
        },
        setNoteColor(color) {
            if (!this.note.id) {
                this.note.style.backgroundColor = color
            } else
                eventBus.emit('setNoteColor', { note: this.note, color })
        },
        edit() {
            if (this.note.type === 'noteVideo') var isValid = this.validateYoutubeUrl()
            if (!isValid) {
                showErrorMsg('not valid url')
                return
            }
            const note = { ...this.note }
            note.info = this.form
            eventBus.emit('edit', note)
            this.$router.push('/keep-app')
        },
        validateYoutubeUrl() {
            const watchUrl = this.form.url.split('watch?v=');
            const embedUrl = this.form.url.split('embed/');
            if (!watchUrl[1]) {
                if (!embedUrl[1]) {
                    return false
                }
            }
            if (watchUrl[0] !== 'https://www.youtube.com/') {
                if (embedUrl[0] !== 'https://www.youtube.com/') {
                    return false
                } else return true
            } else {
                this.form.url = `https://www.youtube.com/embed/${watchUrl[1]}`
                return true
            }
        },
        setNoteType(noteType) {
            this.note = keepService.getEmptyNote(noteType)
        }
    },
    components: {
        noteTxtEdit,
        noteImgEdit,
        noteTodosEdit,
        colorPicker,
        noteVideoEdit
    }
}