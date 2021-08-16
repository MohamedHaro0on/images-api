


let links = document.getElementsByClassName("nav-link"),
    searchInp = document.getElementById("searchInp") ,
    Photos ,
    url,
    req = window.XMLHttpRequest ? new XMLHttpRequest() :new ActiveXObject("Microsoft.XMLHTTP")

// old browsers doesn't support XMLHttpRequest such as IE ;


searchInp.addEventListener("keyup", function () {
    getPhotos(searchInp.value);
})

links = [...links]; // converting the html collection to an array  ;

links.forEach(element => {
    element.addEventListener("click",  ({target:{innerHTML}})=> {
        getPhotos(innerHTML);
    })
});

const getPhotos = (query) => {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    req.open("GET", url)

    req.onreadystatechange =  ()=> {
        if (req.status == 200 && req.readyState == 4) {
            Photos = JSON.parse(req.response);
            Photos = Photos.photos.photo ;
            displayPhotos();
        }
    }
    req.send();

}
const displayPhotos = () => {
    let temp = "";
    let view = Photos.forEach(image=>{
        url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`;
        temp += `<div class="col-md-4 col-sm-6 list-item" ><img src=${url} alt=${image.title} /></div>` ;
    })
    document.getElementById("PhotosRow").innerHTML = temp;
}
getPhotos("Spring")