import { lp, api } from '../lib.js';

const tempDetail = (m, onDelete) => lp.html `
<section id="meme-details">
    <h1>Meme Title: ${m.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${m.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${m.description}</p>
            ${m._ownerId == sessionStorage.getItem('id')
        ? lp.html`
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/edit/${m._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : ''}
        </div>
    </div>
</section>`;

export async function pageDetails(ctx) {
    const memId = ctx.params.id;
    const mem = await api.data.getAMemeById(memId)
    ctx.render(tempDetail(mem, onDelete));

    async function onDelete() {
        await api.data.deleteMem(memId)
        lp.page.redirect('')
    }
}