import { _user } from '../api/utility.js';
import { api, lp } from '../lib.js';

const tempHome = (data) => lp.html `   
${_user.getUserData()
  ?lp.html`
     <div class="shoes">
                 ${renderData(data)}
     </div>`
  :lp.html`
    <div class="container">
        <div class="about-us">
            <div>
                <img src="../public/shoes.jpg" alt="">
                <img src="../public/shoes2.jpg" alt="">
            </div> 
            <p>
                <a href="/register">Register Now</a> and Try it! 
            </p> 
        </div>
    </div>`
}  `;


function renderData(data){
    console.log(data);
    if(data.length==0){
        return lp.html``;
    }

    return data
    .sort((a,b)=>b.bought-a.bought)
    .map(d=>lp.html`
<div class="shoe">
         <img  src="${d.img}">
         <h3>${d.brand} ${d.name}</h3>
        <a href="/details/${d._id}">Buy it for $${d.price.toFixed(2)}</a>
</div>`)
}


export async function pageHome(ctx) {
   
    const data = await api.data.getAllItems();
    ctx.render(tempHome(data));
}