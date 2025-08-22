document.addEventListener( 'DOMContentLoaded', function() {

    const
        boardPiecesElement = {
            'wr1' : document.getElementById( 'wr1'),
            'wr2' : document.getElementById( 'wr2'),
            'wn1' : document.getElementById( 'wn1'),
            'wn2' : document.getElementById( 'wn2'),
            'wb1' : document.getElementById( 'wb1'),
            'wb2' : document.getElementById( 'wb2'),
            'wq1' : document.getElementById( 'wq1'),
            'wk1' : document.getElementById( 'wk1'),
            'wp1' : document.getElementById( 'wp1'),
            'wp2' : document.getElementById( 'wp2'),
            'wp3' : document.getElementById( 'wp3'),
            'wp4' : document.getElementById( 'wp4'),
            'wp5' : document.getElementById( 'wp5'),
            'wp6' : document.getElementById( 'wp6'),
            'wp7' : document.getElementById( 'wp7'),
            'wp8' : document.getElementById( 'wp8'),
            'br1' : document.getElementById( 'br1'),
            'br2' : document.getElementById( 'br2'),
            'bn1' : document.getElementById( 'bn1'),
            'bn2' : document.getElementById( 'bn2'),
            'bb1' : document.getElementById( 'bb1'),
            'bb2' : document.getElementById( 'bb2'),
            'bq1' : document.getElementById( 'bq1'),
            'bk1' : document.getElementById( 'bk1'),
            'bp1' : document.getElementById( 'bp1'),
            'bp2' : document.getElementById( 'bp2'),
            'bp3' : document.getElementById( 'bp3'),
            'bp4' : document.getElementById( 'bp4'),
            'bp5' : document.getElementById( 'bp5'),
            'bp6' : document.getElementById( 'bp6'),
            'bp7' : document.getElementById( 'bp7'),
            'bp8' : document.getElementById( 'bp8')
        },
        boardPiecesInit = {
            'wr1' : 'a1', 'wr2' : 'h1', 'wn1' : 'b1', 'wn2' : 'g1', 'wb1' : 'c1', 'wb2' : 'f1', 'wq1' : 'd1', 'wk1' : 'e1',
            'wp1' : 'a2', 'wp2' : 'b2', 'wp3' : 'c2', 'wp4' : 'd2', 'wp5' : 'e2', 'wp6' : 'f2', 'wp7' : 'g2', 'wp8' : 'h2',
            'br1' : 'a8', 'br2' : 'h8', 'bn1' : 'b8', 'bn2' : 'g8', 'bb1' : 'c8', 'bb2' : 'f8', 'bq1' : 'd8', 'bk1' : 'e8',
            'bp1' : 'a7', 'bp2' : 'b7', 'bp3' : 'c7', 'bp4' : 'd7', 'bp5' : 'e7', 'bp6' : 'f7', 'bp7' : 'g7', 'bp8' : 'h7'
        },
        boardPart = document.getElementsByClassName('board-part'),
        chessPieces =  document.getElementsByClassName('chess-piece'),
        coords = {
        'a1' : [ 0, 87.5 ], 'b1' : [ 12.5, 87.5 ], 'c1' : [ 25, 87.5 ], 'd1' : [ 37.5, 87.5 ], 'e1' : [ 50, 87.5 ], 'f1' : [ 62.5, 87.5 ], 'g1' : [ 75, 87.5 ], 'h1' : [ 87.5, 87.5 ],
        'a2' : [ 0, 75 ], 'b2' : [ 12.5, 75 ], 'c2' : [ 25, 75 ], 'd2' : [ 37.5, 75 ], 'e2' : [ 50, 75 ], 'f2' : [ 62.5, 75 ], 'g2' : [ 75, 75 ], 'h2' : [ 87.5, 75 ],
        'a3' : [ 0, 62.5 ], 'b3' : [ 12.5, 62.5 ], 'c3' : [ 25, 62.5 ], 'd3' : [ 37.5, 62.5 ], 'e3' : [ 50, 62.5 ], 'f3' : [ 62.5, 62.5 ], 'g3' : [ 75, 62.5 ], 'h3' : [ 87.5, 62.5 ],
        'a4' : [ 0, 50 ], 'b4' : [ 12.5, 50 ], 'c4' : [ 25, 50 ], 'd4' : [ 37.5, 50 ], 'e4' : [ 50, 50 ], 'f4' : [ 62.5, 50 ], 'g4' : [ 75, 50 ], 'h4' : [ 87.5, 50 ],
        'a5' : [ 0, 37.5 ], 'b5' : [ 12.5, 37.5 ], 'c5' : [ 25, 37.5 ], 'd5' : [ 37.5, 37.5 ], 'e5' : [ 50, 37.5 ], 'f5' : [ 62.5, 37.5 ], 'g5' : [ 75, 37.5 ], 'h5' : [ 87.5, 37.5 ],
        'a6' : [ 0, 25 ], 'b6' : [ 12.5, 25 ], 'c6' : [ 25, 25 ], 'd6' : [ 37.5, 25 ], 'e6' : [ 50, 25 ], 'f6' : [ 62.5, 25 ], 'g6' : [ 75, 25 ], 'h6' : [ 87.5, 25 ],
        'a7' : [ 0, 12.5 ], 'b7' : [ 12.5, 12.5 ], 'c7' : [ 25, 12.5 ], 'd7' : [ 37.5, 12.5 ], 'e7' : [ 50, 12.5 ], 'f7' : [ 62.5, 12.5 ], 'g7' : [ 75, 12.5 ], 'h7' : [ 87.5, 12.5 ],
        'a8' : [ 0, 0 ], 'b8' : [ 12.5, 0 ], 'c8' : [ 25, 0 ], 'd8' : [ 37.5, 0 ], 'e8' : [ 50, 0 ], 'f8' : [ 62.5, 0 ], 'g8' : [ 75, 0 ], 'h8' : [ 87.5, 0 ]
    },
        coordPiecesInit = {
        'a1' : 'wr1', 'b1' : 'wn1', 'c1' : 'wb1', 'd1' : 'wq1', 'e1' : 'wk1', 'f1' : 'wb2', 'g1' : 'wn2', 'h1' : 'wr2',
        'a2' : 'wp1', 'b2' : 'wp2', 'c2' : 'wp3', 'd2' : 'wp4', 'e2' : 'wp5', 'f2' : 'wp6', 'g2' : 'wp7', 'h2' : 'wp8',
        'a3' : '', 'b3' : '', 'c3' : '', 'd3' : '', 'e3' : '', 'f3' : '', 'g3' : '', 'h3' : '',
        'a4' : '', 'b4' : '', 'c4' : '', 'd4' : '', 'e4' : '', 'f4' : '', 'g4' : '', 'h4' : '',
        'a5' : '', 'b5' : '', 'c5' : '', 'd5' : '', 'e5' : '', 'f5' : '', 'g5' : '', 'h5' : '',
        'a6' : '', 'b6' : '', 'c6' : '', 'd6' : '', 'e6' : '', 'f6' : '', 'g6' : '', 'h6' : '',
        'a7' : 'bp1', 'b7' : 'bp2', 'c7' : 'bp3', 'd7' : 'bp4', 'e7' : 'bp5', 'f7' : 'bp6', 'g7' : 'bp7', 'h7' : 'bp8',
        'a8' : 'br1', 'b8' : 'bn1', 'c8' : 'bb1', 'd8' : 'bq1', 'e8' : 'bk1', 'f8' : 'bb2', 'g8' : 'bn2', 'h8' : 'br2'
    },
        coordBoardPart = [
            [ 'a8', 'b8', 'c8', 'd8', 'a7', 'b7', 'c7', 'd7', 'a6', 'b6', 'c6', 'd6', 'a5', 'b5', 'c5', 'd5'],
            [ 'e8', 'f8', 'g8', 'h8', 'e7', 'f7', 'g7', 'h7', 'e6', 'f6', 'g6', 'h6', 'e5', 'f5', 'g5', 'h5'],
            [ 'a4', 'b4', 'c4', 'd4', 'a3', 'b3', 'c3', 'd3', 'a2', 'b2', 'c2', 'd2', 'a1', 'b1', 'c1', 'd1'],
            [ 'e4', 'f4', 'g4', 'h4', 'e3', 'f3', 'g3', 'h3', 'e2', 'f2', 'g2', 'h2', 'e1', 'f1', 'g1', 'h1']
        ],
        games = [
            [
                ['d2', 'd4'], ['g8', 'f6'], ['c1', 'g5'], ['f6', 'e4'], ['g5', 'f4'], ['c7', 'c5'], ['f2', 'f3'], ['d8', 'a5'],
                ['c2', 'c3'], ['e4', 'f6'], ['b1', 'd2'], ['c5', 'd4'], ['d2', 'b3'], ['a5', 'f5'], ['f4', 'b8'], ['a8', 'b8'],
                ['d1', 'd4'], ['b7', 'b6'], ['e2', 'e4'], ['f5', 'f4'], ['g1', 'h3'], ['f4', 'c7'], ['e4', 'e5'], ['f6', 'g8'],
                ['h3', 'g5'], ['f7', 'f6'], ['e5', 'f6'], ['g8', 'f6'], ['f1', 'c4'], ['e7', 'e6'], ['c4', 'b5'], ['e8', 'e7'],
                ['d4', 'b4'], ['e7', 'e8'], ['b4', 'd4'], ['e8', 'e7'], ['0-0-0', 'w'], ['a7', 'a6'], ['d4', 'b4'], ['d7', 'd6'],
                ['b5', 'd3'], ['h7', 'h6'], ['b4', 'h4'], ['h8', 'g8'], ['g5', 'e4'], ['g7', 'g5'], ['h4', 'g3'], ['f8', 'g7'],
                ['h2', 'h4'], ['f6', 'e4'], ['d3', 'e4'], ['g7', 'e5'], ['g3', 'f2'], ['d6', 'd5'], ['e4', 'c2'], ['g5', 'h4'],
                ['f2', 'h4'], ['e5', 'f6'], ['h4', 'e1'], ['c7', 'e5'], ['e1', 'e5'], ['f6', 'e5'], ['g2', 'g4'], ['c8', 'd7'],
                ['c1', 'b1'], ['e5', 'f4'], ['b3', 'd4'], ['b8', 'f8'], ['c2', 'd3'], ['a6', 'a5'], ['d4', 'e2'], ['f4', 'g5'],
                ['d1', 'f1'], ['e6', 'e5'], ['e2', 'g3'], ['e7', 'd6'], ['g3', 'f5'], ['d7', 'f5'], ['d3', 'f5'], ['d6', 'c5'],
                ['f1', 'd1'], ['f8', 'd8'], ['h1', 'h2'], ['g8', 'f8'], ['b2', 'b3'], ['b6', 'b5'], ['a2', 'a4'], ['b5', 'a4'],
                ['h2', 'a2'], ['d8', 'b8'], ['a2', 'a4'], ['b8', 'b3'], ['b1', 'c2'], ['f8', 'b8'], ['a4', 'a5'], ['b8', 'b5'],
                ['a5', 'b5'], ['b3', 'b5'], ['d1', 'a1'], ['c5', 'b6'], ['a1', 'a8'], ['b5', 'a5'], ['a8', 'a5'], ['b6', 'a5'],
                ['f5', 'e6'], ['a5', 'b5'], ['e6', 'd5'], ['b5', 'c5'], ['d5', 'f7'], ['g5', 'f4'], ['c2', 'd3'], ['f4', 'g5'],
                ['d3', 'e4'], ['g5', 'f4'], ['e4', 'f5'], ['f4', 'g3'], ['f5', 'g6'], ['g3', 'f4'], ['g6', 'f6'], ['f4', 'g3'],
                ['f6', 'e7'], ['g3', 'f4'], ['e7', 'd7'], ['f4', 'g3'], ['c3', 'c4'], ['g3', 'f4'], ['f7', 'd5'], ['f4', 'g3'], ['d7','e6']
                
            ],
            [
                ['e2', 'e4'], ['c7', 'c5'], ['g1', 'f3'], ['b8', 'c6'], ['f1', 'b5'], ['g8', 'f6'], ['b5', 'c6'], ['d7', 'c6'],
                ['d2', 'd3'], ['f6', 'd7'], ['c1', 'f4'], ['g7', 'g6'], ['d1', 'c1'], ['h7', 'h6'], ['0-0', 'w'], ['f8', 'g7'],
                ['h2', 'h3'], ['d7', 'f8'], ['b1', 'd2'], ['f8', 'e6'], ['f4', 'e5'], ['g7', 'e5'], ['f3', 'e5'], ['e6', 'f4'],
                ['f1', 'e1'], ['f7', 'f6'], ['e5', 'c4'], ['e7', 'e5'], ['a2', 'a3'], ['b7', 'b5'], ['c4', 'e3'], ['c8', 'e6'],
                ['d2', 'f3'], ['0-0', 'b'], ['b2', 'b4'], ['c5', 'b4'], ['a3', 'b4'], ['a7', 'a5'], ['b4', 'a5'], ['a8', 'a5'],
                ['c1', 'd2'], ['a5', 'a1'], ['e1', 'a1'], ['c6', 'c5'], ['d2', 'a5'], ['c5', 'c4'], ['d3', 'c4'], ['b5', 'c4'],
                ['a5', 'c5'], ['f8', 'f7'], ['a1', 'a6'], ['g8', 'g7'], ['g1', 'h2'], ['f7', 'c7'], ['c5', 'a5'], ['d8', 'e7'], ['g2', 'g3']
            ],
            [
                ['e2', 'e4'], ['c7', 'c6'], ['d2', 'd4'], ['d7', 'd5'], ['e4', 'e5'], ['c6', 'c5'], ['d4', 'c5'], ['e7', 'e6'],
                ['a2', 'a3'], ['b8', 'c6'], ['g1', 'f3'], ['f8', 'c5'], ['b2', 'b4'], ['c5', 'b6'], ['f1', 'd3'], ['f7', 'f6'],
                ['b4', 'b5'], ['c6', 'e5'], ['f3', 'e5'], ['f6', 'e5'], ['d1', 'h5'], ['e8', 'd7'], ['0-0', 'w'], ['e5', 'e4'],
                ['d3', 'e4'], ['g8', 'f6'], ['h5', 'g5'], ['f6', 'e4'], ['g5', 'g7'], ['d8', 'e7'], ['g7', 'h8'], ['e4', 'f2'],
                ['c1', 'b2'], ['e6', 'e5'], ['f1', 'f2'], ['e7', 'f7'], ['b1', 'd2'], ['f7', 'f2'], ['g1', 'h1'], ['f2', 'd2'],
                ['h8', 'g7'], ['d7', 'd6'], ['g7', 'f8'], ['d6', 'e6'], ['f8', 'e8'], ['e6', 'd6'], ['e8', 'f8'], ['d6', 'e6'],
                ['a1', 'f1'], ['d2', 'g5'], ['f8', 'f7'], ['e6', 'd6'], ['f1', 'f6'], ['d6', 'c5'], ['f7', 'e7'], ['c5', 'c4'], ['e7', 'b4']
            ]
        ],
        asideLSmH = document.getElementById('aside-left-sm-h2'),
        asideLSmShow = document.getElementById('aside-left-sm-show'),
        asideLSmHide = document.getElementById('aside-left-sm-hide'),
        asideLSmDetails = document.getElementById('aside-left-sm-details'),
        asideLSmHBis = document.getElementById('aside-left-sm-h2-bis'),
        asideLSmShowBis = document.getElementById('aside-left-sm-show-bis'),
        asideLSmHideBis = document.getElementById('aside-left-sm-hide-bis'),
        asideLSmDetailsBis = document.getElementById('aside-left-sm-details-bis'),
        asideLSmHTer = document.getElementById('aside-left-sm-h2-ter'),
        asideLSmShowTer = document.getElementById('aside-left-sm-show-ter'),
        asideLSmHideTer = document.getElementById('aside-left-sm-hide-ter'),
        asideLSmDetailsTer = document.getElementById('aside-left-sm-details-ter'),
        asideRSmH = document.getElementById('aside-right-sm-h2'),
        asideRSmShow = document.getElementById('aside-right-sm-show'),
        asideRSmHide = document.getElementById('aside-right-sm-hide'),
        asideRSmDetails = document.getElementById('aside-right-sm-details'),
        asideRSmHBis = document.getElementById('aside-right-sm-h2-bis'),
        asideRSmShowBis = document.getElementById('aside-right-sm-show-bis'),
        asideRSmHideBis = document.getElementById('aside-right-sm-hide-bis'),
        asideRSmDetailsBis = document.getElementById('aside-right-sm-details-bis'),
        asideRSmHTer = document.getElementById('aside-right-sm-h2-ter'),
        asideRSmShowTer = document.getElementById('aside-right-sm-show-ter'),
        asideRSmHideTer = document.getElementById('aside-right-sm-hide-ter'),
        asideRSmDetailsTer = document.getElementById('aside-right-sm-details-ter'),
        initHidden = document.getElementsByClassName('init-hidden'),
        navMenu = document.getElementsByClassName('nav-menu'),
        ulMain = document.getElementsByClassName('ul-main'),
        viewAnim = document.getElementById( 'view-anim'),
        viewGames = document.getElementById( 'view-games'),
        viewGamesSm = document.getElementById( 'container-games-sm'),
        viewGamesCancel = document.getElementById( 'view-games-cancel');


    let
        animInProgress = false,
        boardPieces = clone( boardPiecesInit ),
        boardPartHidden = -1,
        coordPieces = clone( coordPiecesInit ),
        gameMoves,
        intervalId = null,
        moveId = 0,
        title1 = 'développeur'.split(''),
        title2 = '.fullstack'.split(''),
        titleC1 = '',
        titleC2 = '',
        titleL1 = title1.length,
        titleL2 = title2.length,
        letterId = 0;

    function clone( object ) {
        return JSON.parse( JSON.stringify(object) )
    }

    function initBoardPieces() {
        for(let i=0; i<4; i++) {
            for( let piece in boardPiecesElement ) {
                boardPiecesElement[piece].classList.remove('hidden');
                boardPiecesElement[piece].style.left = coords[ boardPiecesInit[piece] ][0]+"%";
                boardPiecesElement[piece].style.top = coords[ boardPiecesInit[piece] ][1]+"%";

                if ( boardPartHidden !== -1 ) {
                    if( isInBoardPart( boardPiecesInit[piece], boardPartHidden ) ) {
                        boardPiecesElement[piece].classList.add('rotate');
                    }
                    else {
                        boardPiecesElement[piece].classList.remove('rotate');
                    }
                }
            }
        }
    }

    function isInBoardPart( coord, i ) {
        for( let el of coordBoardPart[i-1] ) {
            if( coord === el ) {
                return true;
            }
        }
        return false;
    }

    function intro1() {
        if( letterId < titleL1 + titleL2 ) {
            if( letterId < titleL1 ) {
                titleC1 += title1[letterId];
                document.getElementById('title-1').innerText = titleC1 + '|';   
            }
            else if(letterId === titleL1) {
                document.getElementById('title-1').innerText = titleC1;
                titleC2 += title2[ (letterId - titleL1) ];
                document.getElementById('title-2').innerText = titleC2 + '|';
            }
            else {
                if( letterId < (titleL1 + titleL2) ) {
                    titleC2 += title2[ (letterId - titleL1) ];
                    if( letterId < (titleL1 + titleL2 - 1) ) {
                        document.getElementById('title-2').innerText = titleC2 + '|';   
                    }
                    else {    
                        document.getElementById('title-2').innerText = titleC2;
                    }
                }
            }
            letterId ++;
        }
        else {
            clearInterval(intervalId);
        }
    }

    function intro2() {
        document.getElementById('aside-left').classList.add('transform');
        document.getElementById('aside-left-sm').classList.add('transform');
        document.getElementById('aside-left-sm-bis').classList.add('transform');
        document.getElementById('aside-left-sm-ter').classList.add('transform');
        document.getElementById('aside-right').classList.add('transform');
        document.getElementById('aside-right-sm').classList.add('transform');
        document.getElementById('aside-right-sm-bis').classList.add('transform');
        document.getElementById('aside-right-sm-ter').classList.add('transform');
        document.getElementById('main').classList.add('transform');
    }

    function intro3() {
        document.getElementById('ul-main-1').classList.add('transform');
        document.getElementById('ul-main-2').classList.add('transform');
        document.getElementById('ul-main-3').classList.add('transform');
        document.getElementById('ul-main-4').classList.add('transform');
        document.getElementById('nav-menu').classList.add('transform');
    }

    function intro4() {
        document.getElementById('view-anim').classList.add('transform');
    }

    function move() {
        if( gameMoves.length === moveId )  {
            clearInterval(intervalId);
            setTimeout( playGameRandom, 2000);
        }
        else if( gameMoves[moveId][0] === '0-0') {
            if(gameMoves[moveId][1] === 'w') {
                boardPiecesElement[ coordPieces[ 'e1' ] ].style.left = coords['g1'][0]+"%";
                boardPiecesElement[ coordPieces[ 'e1' ] ].style.top = coords['g1'][1]+"%";
                boardPiecesElement[ coordPieces[ 'h1' ] ].style.left = coords['f1'][0]+"%";
                boardPiecesElement[ coordPieces[ 'h1' ] ].style.top = coords['f1'][1]+"%";

                coordPieces['g1'] = 'wk1';
                coordPieces['e1'] = '';
                boardPieces['wk1'] = 'g1';

                coordPieces['f1'] = 'wr2';
                coordPieces['h1'] = '';
                boardPieces['wr2'] = 'f1';
            }
            else {
                boardPiecesElement[ coordPieces[ 'e8' ] ].style.left = coords['g8'][0]+"%";
                boardPiecesElement[ coordPieces[ 'e8' ] ].style.top = coords['g8'][1]+"%";
                boardPiecesElement[ coordPieces[ 'h8' ] ].style.left = coords['f8'][0]+"%";
                boardPiecesElement[ coordPieces[ 'h8' ] ].style.top = coords['f8'][1]+"%";

                coordPieces['g8'] = 'bk1';
                coordPieces['e8'] = '';
                boardPieces['bk1'] = 'g8';

                coordPieces['f8'] = 'br2';
                coordPieces['h8'] = '';
                boardPieces['br2'] = 'f8';
            }
        }
        else if( gameMoves[moveId][0] === '0-0-0') {
            if(gameMoves[moveId][1] === 'w') {

                if( boardPartHidden === 3 ) { boardPiecesElement[ coordPieces[ 'e1' ] ].classList.add('rotate'); }
                if( boardPartHidden === 4 ) { boardPiecesElement[ coordPieces[ 'e1' ] ].classList.remove('rotate'); }

                boardPiecesElement[ coordPieces[ 'e1' ] ].style.left = coords['c1'][0]+"%";
                boardPiecesElement[ coordPieces[ 'e1' ] ].style.top = coords['c1'][1]+"%";
                boardPiecesElement[ coordPieces[ 'a1' ] ].style.left = coords['d1'][0]+"%";
                boardPiecesElement[ coordPieces[ 'a1' ] ].style.top = coords['d1'][1]+"%";

                coordPieces['c1'] = 'wk1';
                coordPieces['e1'] = '';
                boardPieces['wk1'] = 'c1';

                coordPieces['d1'] = 'wr1';
                coordPieces['a1'] = '';
                boardPieces['wr1'] = 'd1';

            }
            else {

                if( boardPartHidden === 1 ) { boardPiecesElement[ coordPieces[ 'e8' ] ].classList.add('rotate'); }
                if( boardPartHidden === 2 ) { boardPiecesElement[ coordPieces[ 'e8' ] ].classList.remove('rotate'); }

                boardPiecesElement[ coordPieces[ 'e8' ] ].style.left = coords['c8'][0]+"%";
                boardPiecesElement[ coordPieces[ 'e8' ] ].style.top = coords['c8'][1]+"%";
                boardPiecesElement[ coordPieces[ 'a8' ] ].style.left = coords['d8'][0]+"%";
                boardPiecesElement[ coordPieces[ 'e8' ] ].style.top = coords['d8'][1]+"%";

                coordPieces['c8'] = 'bk1';
                coordPieces['e8'] = '';
                boardPieces['bk1'] = 'c8';

                coordPieces['d8'] = 'br1';
                coordPieces['a8'] = '';
                boardPieces['br1'] = 'f8';
            }
        }
        else {
            if ( boardPartHidden !== -1 ) {
                if( isInBoardPart( gameMoves[moveId][0], boardPartHidden ) && ( ! isInBoardPart( gameMoves[moveId][1], boardPartHidden ) ) ) {
                    boardPiecesElement[ coordPieces[ gameMoves[moveId][0] ] ].classList.remove('rotate');
                }
                if( isInBoardPart( gameMoves[moveId][1], boardPartHidden ) && ( ! isInBoardPart( gameMoves[moveId][0], boardPartHidden ) ) ) {
                    boardPiecesElement[ coordPieces[ gameMoves[moveId][0] ] ].classList.add('rotate');
                }
            }

            boardPiecesElement[ coordPieces[ gameMoves[moveId][0] ] ].style.left = coords[gameMoves[moveId][1]][0]+"%";
            boardPiecesElement[ coordPieces[ gameMoves[moveId][0] ] ].style.top = coords[gameMoves[moveId][1]][1]+"%";

            if( coordPieces[gameMoves[moveId][1]] !== '') {
                boardPiecesElement[ coordPieces[ gameMoves[moveId][1] ] ].classList.add('hidden');
                boardPieces[ coordPieces[ gameMoves[moveId][1] ] ] = '';
            }

            if( gameMoves[moveId][2] === 'ep' ) {
                boardPiecesElement[ coordPieces[ gameMoves[moveId][3] ] ].classList.add('hidden');
                boardPieces[ coordPieces[ gameMoves[moveId][3] ] ] = '';
                coordPieces[ gameMoves[moveId][3] ] = '';
            }

            coordPieces[gameMoves[moveId][1]] = coordPieces[gameMoves[moveId][0]];
            coordPieces[gameMoves[moveId][0]] = '';
            boardPieces[ coordPieces[ gameMoves[moveId][1] ] ] = gameMoves[moveId][1];
        }

        moveId ++;
    }

    function playGame(i) {
        clearInterval(intervalId);
        moveId = 0;
        initBoardPieces();
        coordPieces = clone( coordPiecesInit );
        boardPieces = clone( boardPiecesInit );
        gameMoves = clone( games )[ i-1 ];

        intervalId = setInterval(move, 750);
    }

    function playGameRandom() {
        let
            gameRand = Math.floor(Math.random() * Math.floor(3)) + 1,
            game = document.getElementById( 'game-'+gameRand ),
            gameSm = document.getElementById( 'game-'+gameRand+'-sm' );

        playGame( gameRand );

        game.classList.add( 'red-background', 'red-color' );
        gameSm.classList.add( 'red-background', 'red-color' );

        for(let j=1; j<4; j++) {
            if (gameRand !== j) {
                const gameR = document.getElementById('game-' + j);
                const gameRSm = document.getElementById('game-' + j+'-sm');

                gameR.classList.remove('red-background', 'red-color');
                gameRSm.classList.remove('red-background', 'red-color');
            }
        }


    }

    function playIntroduction() {
        intervalId = setInterval(intro1, 200);
        initBoardPieces();
        setTimeout(intro2, 3000);
        setTimeout(intro3, 4000);
        setTimeout(intro4, 5000);
    }

    function toggleHamburgerL() {
        asideLSmShow.classList.toggle( 'hidden' );
        asideLSmHide.classList.toggle( 'hidden' );
        asideLSmDetails.classList.toggle( 'hidden' );
    }

    function toggleHamburgerLBis() {
        asideLSmShowBis.classList.toggle( 'hidden' );
        asideLSmHideBis.classList.toggle( 'hidden' );
        asideLSmDetailsBis.classList.toggle( 'hidden' );
    }

    function toggleHamburgerLTer() {
        asideLSmShowTer.classList.toggle( 'hidden' );
        asideLSmHideTer.classList.toggle( 'hidden' );
        asideLSmDetailsTer.classList.toggle( 'hidden' );
    }

    function toggleHamburgerR() {
        asideRSmShow.classList.toggle( 'hidden' );
        asideRSmHide.classList.toggle( 'hidden' );
        asideRSmDetails.classList.toggle( 'hidden' );
    }

    function toggleHamburgerRBis() {
        asideRSmShowBis.classList.toggle( 'hidden' );
        asideRSmHideBis.classList.toggle( 'hidden' );
        asideRSmDetailsBis.classList.toggle( 'hidden' );
    }

    function toggleHamburgerRTer() {
        asideRSmShowTer.classList.toggle( 'hidden' );
        asideRSmHideTer.classList.toggle( 'hidden' );
        asideRSmDetailsTer.classList.toggle( 'hidden' );
    }

    function viewAnimation() {
        viewAnim.classList.toggle( 'hidden' );
        viewGames.classList.toggle( 'hidden' );
        viewGamesSm.classList.toggle( 'hidden' );
        for( let el of initHidden ) { el.classList.toggle('hidden'); }
        for( let el of navMenu ) { el.classList.remove('red-color'); }
        for( let el of ulMain ) { el.classList.remove('red-background'); }

        animInProgress = ! animInProgress;

        if( animInProgress ) {
            for( let el of boardPart ) { el.classList.remove('rotate'); }
            for( let el of chessPieces ) { el.classList.remove('rotate'); }

            setTimeout( playGameRandom, 2000);
        }
        else {
            initBoardPieces();

            for( let el of boardPart ) { el.classList.add('rotate'); }
            for( let el of chessPieces ) { el.classList.add('rotate'); }

            clearInterval(intervalId);
            moveId = 0;
            boardPartHidden = -1;

            for(let i=1; i<4; i++) {
                const gameR = document.getElementById('game-' + i);
                gameR.classList.remove('red-background', 'red-color');
            }

            for(let i=1; i<4; i++) {
                const gameR = document.getElementById('game-' + i + '-sm');
                gameR.classList.remove('red-background', 'red-color');
            }
        }
    }

    playIntroduction();

    asideLSmH.addEventListener( 'click', toggleHamburgerL );
    asideLSmHBis.addEventListener( 'click', toggleHamburgerLBis );
    asideLSmHTer.addEventListener( 'click', toggleHamburgerLTer );
    asideRSmH.addEventListener( 'click', toggleHamburgerR );
    asideRSmHBis.addEventListener( 'click', toggleHamburgerRBis );
    asideRSmHTer.addEventListener( 'click', toggleHamburgerRTer );

    viewAnim.addEventListener( 'click', viewAnimation);
    viewGames.addEventListener( 'click', viewAnimation);
    viewGamesCancel.addEventListener( 'click', viewAnimation);

    for(let i=1; i<5; i++) {
        const
            nav = document.getElementById( 'nav-menu-'+i ),
            ul = document.getElementById( 'ul-main-'+i ),
            boardPart = document.getElementById( 'board-part-'+i );

        nav.addEventListener( 'mouseenter', function() { ul.classList.add( 'red-border' ); });
        nav.addEventListener( 'mouseleave', function() { ul.classList.remove( 'red-border' ); });

        nav.addEventListener( 'click', function() {
            this.classList.toggle('red-color');
            ul.classList.toggle( 'red-background' );

            if( animInProgress ) {
                boardPart.classList.toggle('rotate');

                for( let piece in boardPieces ) {
                    if( isInBoardPart( boardPieces[piece], i ) )
                        boardPiecesElement[piece].classList.toggle('rotate');
                }

                if( boardPartHidden === i ) {
                    boardPartHidden = -1;
                }
                else {
                    boardPartHidden = i;
                }

            }

            for(let j=1; j<5; j++) {
                if (i !== j) {
                    const
                        navR = document.getElementById( 'nav-menu-'+j ),
                        ulR = document.getElementById( 'ul-main-'+j ),
                        boardPartR = document.getElementById( 'board-part-'+j );

                    navR.classList.remove('red-color');
                    ulR.classList.remove('red-background');

                    if( animInProgress ) {
                        boardPartR.classList.remove('rotate');

                        for( let piece in boardPieces ) {
                            if( isInBoardPart( boardPieces[piece], j ) )
                                boardPiecesElement[piece].classList.remove('rotate');
                        }
                    }
                }
            }
        });

    }

    for(let i=1; i<4; i++) {
        const game = document.getElementById( 'game-'+i );

        game.addEventListener( 'click', function() {
            this.classList.add( 'red-background', 'red-color' );

            for(let j=1; j<4; j++) {
                if (i !== j) {
                    const gameR = document.getElementById('game-' + j);

                    gameR.classList.remove('red-background', 'red-color');
                }
            }

            playGame(i);
        });
    }

    for(let i=1; i<4; i++) {
        const gameSm = document.getElementById( 'game-'+i+'-sm' );

        gameSm.addEventListener( 'click', function() {
            this.classList.add( 'red-background', 'red-color' );

            for(let j=1; j<4; j++) {
                if (i !== j) {
                    const gameR = document.getElementById('game-' + j +'-sm');

                    gameR.classList.remove('red-background', 'red-color');
                }
            }

            playGame(i);
        });
    }


});