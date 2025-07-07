/// ホーム画面用スクリプト
"use strict";

// プレゼンテーションデータ
const presentations = [
  {
    id: "2025-07-tiktok",
    title: "TikTokのこれまでとこれから",
    date: "2025-07-10",
    description:
      "短尺動画アプリTikTokの誕生から現在までの歴史、社会への影響、そして未来への展望について解説します。",
    path: "presentations/2025-07-tiktok/index.html",
  },
];

/// DOMの読み込み完了後に実行
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

/// ページの初期化
function initializePage() {
  showLoading();
  // 実際の環境では API から取得する想定
  setTimeout(() => {
    renderPresentations();
    hideLoading();
  }, 500);
}

/// ローディング表示
function showLoading() {
  const container = document.getElementById("presentations-container");
  container.innerHTML = '<div class="loading">読み込み中...</div>';
}

/// ローディング非表示
function hideLoading() {
  const loadingElement = document.querySelector(".loading");
  if (loadingElement) {
    loadingElement.remove();
  }
}

/// プレゼンテーション一覧を描画
function renderPresentations() {
  const container = document.getElementById("presentations-container");

  if (presentations.length === 0) {
    container.innerHTML =
      '<div class="error">プレゼンテーションが見つかりません。</div>';
    return;
  }

  // プレゼンテーションカードを生成
  const cardsHTML = presentations
    .map((presentation) => createPresentationCard(presentation))
    .join("");

  container.innerHTML = cardsHTML;

  // イベントリスナーを設定
  setupEventListeners();
}

/// プレゼンテーションカードのHTML生成
function createPresentationCard(presentation) {
  const formattedDate = formatDate(presentation.date);

  return `
        <div class="presentation-card" data-id="${presentation.id}">
            <h3>${escapeHtml(presentation.title)}</h3>
            <div class="date">${formattedDate}</div>
            <div class="description">${escapeHtml(
              presentation.description
            )}</div>
            <button class="view-button" onclick="viewPresentation('${
              presentation.path
            }')">
                プレゼンテーションを見る
            </button>
        </div>
    `;
}

/// 日付をフォーマット
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/// HTMLエスケープ
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/// イベントリスナーの設定
function setupEventListeners() {
  // カードクリック時の処理
  document.querySelectorAll(".presentation-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // ボタンクリック時は除外
      if (e.target.classList.contains("view-button")) {
        return;
      }

      const presentationId = this.dataset.id;
      const presentation = presentations.find((p) => p.id === presentationId);
      if (presentation) {
        viewPresentation(presentation.path);
      }
    });
  });
}

/// プレゼンテーションを開く
function viewPresentation(path) {
  try {
    // 新しいタブでプレゼンテーションを開く
    window.open(path, "_blank");
  } catch (error) {
    console.error("プレゼンテーションを開くときにエラーが発生しました:", error);
    alert("プレゼンテーションを開くことができませんでした。");
  }
}

/// エラーハンドリング
window.addEventListener("error", function (e) {
  console.error("エラーが発生しました:", e.error);

  const container = document.getElementById("presentations-container");
  if (container && container.innerHTML.includes("loading")) {
    container.innerHTML =
      '<div class="error">データの読み込みに失敗しました。</div>';
  }
});

/// 未処理のPromise拒否をキャッチ
window.addEventListener("unhandledrejection", function (e) {
  console.error("未処理のPromise拒否:", e.reason);
  e.preventDefault();
});
