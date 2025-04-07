load('config.js');
// ...existing code...

function execute(url) {
    const doc = fetch(url).html();

    // Tuỳ chỉnh selector sao cho khớp với trang thực tế
    return Response.success({
        name: doc.select("h1").text().trim(),
        cover: doc.select(".summary_image img").first().attr("src"),
        author: doc.select(".author-content").first().text(),
        description: doc.select(".manga-excerpt").text(),
        detail: doc.select("div.post-status").html(),
        host: BASE_URL
    });
}

// ...existing code...