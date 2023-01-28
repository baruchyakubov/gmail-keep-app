export default {
    props: ['note'],
    template: `
    <section class="note-img">
        <h1>{{ note.info.title }}</h1>
        <img :src="note.info.url" loading="lazy" decoding="async"/>
    </section>
    `
}

