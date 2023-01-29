export default {
    props: ['note'],
    template: `
    <section class="note-video">
        <h1>{{ note.info.title }}</h1>
        <iframe style="width:100%; aspect-ratio:1/1;" :src="note.info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
    </section>
    `
}