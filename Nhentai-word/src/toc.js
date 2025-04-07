load('config.js');

function execute(url) {
    var doc = fetch(url + '/ajax/chapters/', {
        method: "POST"
    }).html();

    var el = doc.select("ul.version-chap > li > a");
    const list = [];
    el.forEach(e => {
        list.push({
            name: e.text(),
            url: e.attr("href"),
            host: BASE_URL
        });
    });

    return Response.success(list.reverse());
}