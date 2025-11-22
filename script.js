// --- 日付表示機能 ---
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        // 日本語の日付フォーマット
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const today = new Date().toLocaleDateString('ja-JP', options);
        dateElement.textContent = today;
    }
}

// --- ニュースコンテンツの動的ロードと履歴機能 ---
const newsData = {
    // 過去のニュースデータを追加してください (新しい日付が上に来るように)
    '2025-11-20': { 
        title: '2026年度大会車両の設計開始', 
        content: '来シーズンの車両コンセプトが決定し、基礎設計フェーズに入りました。特に空力性能に注力します。' 
    },
    '2025-11-10': { 
        title: 'OB/OGによる技術指導会を開催', 
        content: '卒業生エンジニアを招き、ECUチューニングに関する特別講義を実施しました。' 
    },
    '2025-10-25': { 
        title: 'スポンサー様とのミーティング実施', 
        content: '〇〇株式会社様との新年度の技術支援に関する打ち合わせを実施しました。' 
    }
};

function renderNews(newsList) {
    const container = document.getElementById('news-list-container');
    if (!container) return;

    container.innerHTML = ''; // 既存の内容をクリア

    // 最新のニュースを上に表示するために、キーを逆順にする
    const dates = Object.keys(newsList).sort().reverse();

    if (dates.length === 0) {
        container.innerHTML = '<p>現在、新しいお知らせはありません。</p>';
        return;
    }

    dates.forEach((date) => {
        const item = newsList[date];
        const article = document.createElement('article');
        article.className = 'news-item';
        
        article.innerHTML = `
            <h3>${item.title}</h3>
            <p><small style="color: #666;">掲載日: ${date}</small></p>
            <p>${item.content}</p>
        `;
        container.appendChild(article);
        
        // アニメーションを適用
        setTimeout(() => {
            article.classList.add('is-loaded');
        }, 50);
    });
}

// --- スムーズスクロール機能 ---
function applySmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // ページジャンプのデフォルト動作をキャンセル
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // アンカーリンクでない場合は無視
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // 動作をスムーズに指定
                });
            }
        });
    });
}


// --- 実行 ---
document.addEventListener('DOMContentLoaded', () => {
    // 日付表示
    displayCurrentDate();

    // ニュース表示 (ここでは全履歴を表示)
    renderNews(newsData);
    
    // スムーズスクロール適用
    applySmoothScroll();
});

// access_control.js の内容は、時間制限機能を使わないためここでは含みません