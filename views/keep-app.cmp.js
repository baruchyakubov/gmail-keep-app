import { keepService } from "../services/keep-app.service.js"
import noteList from "../apps/keep/cmps/note-list.cmp.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="notes" class="keep-app main-layout">
            <h1>keep-app</h1>
            <note-list :notes="Notes"></note-list>
            <router-view></router-view>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                this.notes = notes
            })
        eventBus.on('setNoteColor', this.setNoteColor)
        eventBus.on('deleteEmail', this.deleteEmail)
    },
    methods: {
        setNoteColor({ note, color }) {
            let Note = { ...note }
            Note.style.backgroundColor = color
            keepService.save(Note)
                .then(updatedNote => {
                    const idx = this.notes.findIndex(note => {
                        return note.id === updatedNote.id
                    })
                    this.notes[idx].style.backgroundColor = color
                })
        },
        deleteEmail(noteId){
            keepService.remove(noteId)
            .then(noteId => {
                const idx = this.notes.findIndex(note => {
                    return note.id === noteId
                })
                this.notes.splice(idx, 1)
            })
        }
    },
    computed: {
        Notes() {
            return this.notes
        }
    },
    components: {
        noteList
    }
}