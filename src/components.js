const path = require('path');

//TODO: 分割代入できそう
exports.itemCard = (dirPath, itemInfo) => {
    //TODO: サムネイルが存在しないときの処理
    //TODO: クリックしたときの処理
    return `<div class="col">
    <div class="card">
        <img src="${itemInfo.thumbnail}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${path.basename(dirPath)}</h5>
            <p class="card-text">タグとか並べる？</p>
        </div>
    </div>
</div>`
};
