const hostname = "journal.davidmiles.blog"

fetch(`https://webmention.io/api/links.jf2?target=${encodeURIComponent(`https://${hostname}${location.pathname}`)}`)
  .then((response) => response.json())
  .then((data) => {
    data.children.forEach(function(m){
        if (m["wm-property"] != "like-of") return;

        document.querySelector("#avatar").innerHTML += `<a href="${m.author.url}"><abbr title="${m.author.name}"><img src="${m.author.photo}" alt="${m.author.name}" class="avatar"></abbr></a>`
        document.querySelector("#people").innerHTML = `${data.children.length} ${data.children.length > 1 ? "people" : "person"} liked this journal entry`
    })
  });
fetch(`https://wmlookup.davidmiles.blog/?path=${encodeURIComponent(location.pathname)}`)  
.then((response) => response.json())
.then((data) => {
if (!data.success) document.querySelector("#tweet").innerHTML = "Failed to load tweet.";
 document.querySelector("#tweet").innerHTML = `If you want to like this post, like <a href="${data.url}">this tweet</a> :)`
});