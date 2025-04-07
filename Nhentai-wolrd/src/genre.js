load('config.js');
// ...existing code...

function execute() {
    const doc = fetch(`${BASE_URL}/the-loai-genres`).html();
    const el = doc.select(".genres a");
    const data = [];
    for (let i = 0; i < el.size(); i++) {
        const e = el.get(i);
        data.push({
           title: e.text(),
           input: e.attr('href'),
           script: 'gen.js'
        });
    }
    return Response.success(data);
}

// ...existing code...