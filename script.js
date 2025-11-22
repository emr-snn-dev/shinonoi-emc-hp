/* script.js の全コード */

// ==========================================================
// 1. 日付表示機能
// ==========================================================
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        // フォーマットを「YYYY年MM月DD日」に設定
        dateElement.textContent = `${year}年${month}月${day}日`;
    }
}

// ==========================================================
// 2. ページ読み込み時の初期処理 (ニュース読み込みと日付更新)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 日付を更新
    updateDate(); 

    // ニュースコンテンツを読み込むエリア
    const newsContainer = document.getElementById('news-list-container');
    
    if (newsContainer) {
        newsContainer.innerHTML = '<p>最新情報を読み込み中...</p>';
        const newsFileUrl = 'news_content.html'; 

        fetch(newsFileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // 1. 読み込んだHTMLコンテンツをコンテナに挿入
                newsContainer.innerHTML = htmlContent;

                // 2. 挿入された各記事アイテムを取得
                const newsItems = newsContainer.querySelectorAll('.news-item');

                // 3. 各記事アイテムに対し、遅延をつけてアニメーションクラスを付与
                newsItems.forEach((item, index) => {
                    const delay = index * 100; 

                    setTimeout(() => {
                        item.classList.add('is-loaded');
                    }, delay);
                });
            })
            .catch(e => {
                newsContainer.innerHTML = '<p style="color: red;">お知らせの読み込みに失敗しました。</p>';
                console.error("News content loading error:", e);
            });
    }
});