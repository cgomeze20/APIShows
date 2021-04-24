
const d = document;

$shows = d.getElementById('shows'),
$template = d.getElementById('show-template').content,
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', async e => {
    if(e.target.matches('#search')){
        // console.log(e.key);
        if(e.key === 'Enter'){
            try{
                 $shows.innerHTML = `<h1> Cargando.... </h1>`

            
                let query = e.target.value.toLowerCase(),
               api =  `https://api.tvmaze.com/search/shows?q=${query}`,
               res = await fetch(api),
               json = await res.json();

               console.log(api,res,json);

            if(!res.ok) throw {
                status: res.status, statusText:res.statusText
            }

            if(json.length === 0){
                $shows.innerHTML = `No existe resultados para el criterio de busqueda <mark>${query}</mark>`
            }else{
                json.forEach(el =>{
                    $template.querySelector('h3').textContent = el.show.name
                    $template.querySelector('div').innerHTML = el.show.summary ? el.show.summary : "Sin Descripción"
                    $template.querySelector('img').src = el.show.image ? el.show.image.medium : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                    $template.querySelector('img').alt = el.show.name;
                    $template.querySelector('img').style.maxWidth = "100%";
                    $template.querySelector('a').href = el.show.url ? el.show.url : "#"
                    $template.querySelector('a').target = el.show.url ? "_blank" : "_self"
                    $template.querySelector('a').textContent = el.show.url ? "Ver mas" : ""


                    let $clone = d.importNode($template,true);
                    $fragment.appendChild($clone);
                })
                $shows.innerHTML = "";
                $shows.appendChild($fragment)
            }

           }catch(err) {

            console.log(err);
            let message = err.statustext || "Ocurrió un Error";
            $shows.innerHTML = `<p> Error ${err.status}: ${message}</p>`
            }
        }
    }
})