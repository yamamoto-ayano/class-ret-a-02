var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

function renderNextBlock() {
    if (typeof nextShape === 'undefined' || nextShape === null) return;
    var shape = shapes[nextShape];
    var color = colors[nextShape];
    var offsetX = 0.2, offsetY = 0.2; // 余白
    var miniBlock = Math.min(BLOCK_W, BLOCK_H) * 0.5;
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            var i = 4 * y + x;
            if (typeof shape[i] !== 'undefined' && shape[i]) {
                ctx.fillStyle = color;
                ctx.strokeStyle = 'black';
                ctx.fillRect(offsetX * BLOCK_W + x * miniBlock, offsetY * BLOCK_H + y * miniBlock, miniBlock - 1, miniBlock - 1);
                ctx.strokeRect(offsetX * BLOCK_W + x * miniBlock, offsetY * BLOCK_H + y * miniBlock, miniBlock - 1, miniBlock - 1);
            }
        }
    }
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('NEXT', offsetX * BLOCK_W, 0.9 * BLOCK_H);
}

// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, W, H );
    renderNextBlock();

    ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            var isClearing = (typeof clearingRows !== 'undefined' && clearingRows.indexOf(y) !== -1);
            if ( board[ y ][ x ] ) {
                if (isClearing) {
                    // 点滅アニメーション: フレームごとに透明/白/元色を切り替え
                    if (clearAnimFrame % 2 === 0) {
                        ctx.fillStyle = 'white';
                    } else {
                        ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                    }
                } else {
                    ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                }
                drawBlock( x, y );
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }
}