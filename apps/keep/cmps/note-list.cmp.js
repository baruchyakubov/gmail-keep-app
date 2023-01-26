import notePreview from "./note-preview.cmp.js"

export default {
    props: ['notes'],
    template: `
        <section v-if="notes" class="note-container">
            <ul class="note-list" droptable="true">
                <li v-for="note in notes" :key="note.id">
                    <note-preview :note="note"></note-preview>
                </li>
            </ul>
        </section>
    `,
    components: {
        notePreview
    }
}