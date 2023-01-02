export default {
    props:['note'],
    template: `
        <section class="note-todos-edit" v-if="note">
            <div v-for="todo in note.info.todos" :key="todo.doneAt" >
                <input type="text" :value="todo.txt" />
            </div>
        </section>
    `
}