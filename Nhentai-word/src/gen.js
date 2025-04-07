load('config.js');
// ...existing code...

function execute(url, page) {
    if (!page) page = '1';
    
    // Lấy nội dung HTML, ghép thêm query ?page để tương tự cấu trúc mới
    const doc = fetch(url + "/?page=" + page).html();
    
    // Tìm link trang kế tiếp
    // Ở đây, lấy link có aria-label="next" rồi trích số trang từ href
    const nextLink = doc.select('a[aria-label="next"]').attr("href");
    let next = null;
    if (nextLink) {
        const match = nextLink.match(/page=(\d+)/);
        if (match) {
            next = match[1];
        }
    }

    // Lấy danh sách nội dung trong các thẻ div.relative.mb-1...
    const el = doc.select('div.relative.mb-1');
    const data = [];
    
    for (let i = 0; i < el.size(); i++) {
        const e = el.get(i);
        const linkEl = e.select('a.block').first();

        // Lấy tên
        const name = linkEl.select('.line-clamp-2').text();

        // Lấy link
        const link = linkEl.attr('href');

        // Lấy cover
        const cover = linkEl.select('img').attr('src');

        // Lấy mô tả (ở đây tạm thời lấy luôn text trong dòng chapter, nếu muốn)
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

    // Trả về dữ liệu thu thập, kèm trang tiếp theo
    return Response.success(data, next);
}

// ...existing code...