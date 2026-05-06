"use strict";

function annotate(mutationList, observer) {
    for (const mutation of mutationList) {
        for (const addedNode of mutation.addedNodes) {
            if (!(addedNode instanceof Element)) {
                continue;
            }
            for (const node of addedNode.querySelectorAll(".slider-item")) {
                const div = document.createElement("div");
                div.classList.add("review-stream");
                const title = node.querySelector(".fallback-text").textContent;
                const pairs = [["IMDb", `https://www.imdb.com/find/?q=${title}`],
                               ["Metacritic", `https://www.metacritic.com/search/${title}/`],
                               ["Rotten Tomatoes", `https://www.rottentomatoes.com/search?search=${title}`]];
                for (const [reviewer, url] of pairs) {
                    const anchor = document.createElement("a"); anchor.classList.add("review-stream");
                    anchor.setAttribute("href", URL.parse(url).href);
                    anchor.textContent = reviewer;
                    div.appendChild(anchor);
                }
                node.appendChild(div);
            }
        }
    }
}

const observer = new MutationObserver(annotate);
observer.observe(document,
                 {childList: true, subtree: true});
