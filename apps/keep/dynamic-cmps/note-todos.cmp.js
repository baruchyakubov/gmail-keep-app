export default{
    props: ['note'],
    template: `
    <section class="note-todos">
        <h1>{{ note.info.label }}</h1>
        <div class="todo-list" v-for="todo in note.info.todos">
            <input type="checkbox" />
            <p>{{ todo.txt }}</p>
        </div>
    </section>
    `
}