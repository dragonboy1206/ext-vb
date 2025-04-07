function execute(url) {
    // Lấy HTML từ url
    const doc = fetch(url).html();

    // Chọn tất cả ảnh bên trong vùng hiển thị trang truyện (thay đổi selector tùy theo cấu trúc)
    const el = doc.select('.reading-content .page-break img');

    const data = [];
    for (let i = 0; i < el.size(); i++) {
        const e = el.get(i);
        data.push(e.attr('src'));
    }

    return Response.success(data);
}