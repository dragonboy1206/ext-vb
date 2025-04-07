load('config.js');
// ...existing code...

function execute(key, page) {
    if (!page) page = '1';

    // Tạo URL tìm kiếm
    const url = BASE_URL + '/?page=' + page + '&s=' + key;
    const doc = fetch(url).html();

    // Tìm link trang tiếp theo
    const nextLink = doc.select('a[aria-label="next"]').attr("href");
    let next = null;
    if (nextLink) {
        const match = nextLink.match(/page=(\d+)/);
        if (match) next = match[1];
    }

    // Lấy danh sách kết quả trong các thẻ .relative.mb-1
    const el = doc.select('div.relative.mb-1');
    const data = [];
    for (let i = 0; i < el.size(); i++) {
        const e = el.get(i);
        const linkEl = e.select('a.block').first();

        // Lấy thông tin
        const name = linkEl.select('.line-clamp-2').text();
        const link = linkEl.attr('href');
        const cover = linkEl.select('img').attr('src');

        let description = "";
        const chapterSpan = linkEl.select('.md\\:text-base span').first();
        if (chapterSpan) {
            description = chapterSpan.text();
        }

        data.push({
            name: name,
            link: link,
            cover: cover,
            description: description,
            host: BASE_URL
        });
    }

    return Response.success(data, next);
}

// ...existing code...