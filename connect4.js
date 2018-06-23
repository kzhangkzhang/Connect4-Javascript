class Connect4 {
    constructor(selector) {
        this.ROWS       = 6;
        this.COLS       = 7;
        this.player     = 'red';
        this.selector   = selector;

        this.createGrid();
        this.setupEventListeners();
    }

    createGrid() {

        const $board = $(this.selector);
        console.log($board);

        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>').addClass('row');

            for (let col = 0; col < this.COLS; col++) {
                 const $col = $('<div>').addClass('col empty').attr('data-col', col).attr('data-row', row);
                 $row.append($col);
            }

            $board.append($row);
        }
        // console.log($board.html());
    }

    setupEventListeners() {

        const $board    = $(this.selector);
        const that      = this;

        function findlastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`);

            for (let i = cells.length - 1; i>= 0; i-- ) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }

        $board.on('mouseenter', '.col.empty', function() {
            console.log('mouse enter ==>  ', this);

            const col = $(this).data('col');

            const $lastEmptyCell = findlastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
            
        });
        
        $board.on('mouseleave', '.col', function() {
            $('.col').removeClass(`next-${that.player}`);
        })
        
        $board.on('click', '.col.empty', function() {
            const col = $(this).data('col');
            const $lastEmptyCell = findlastEmptyCell(col);
            $lastEmptyCell.removeClass('empty next-${that.player}').addClass(that.player);
            that.player = (that.player === 'red') ? 'black' : 'red';
            $(this).trigger('mouseenter');


        })
    }
}