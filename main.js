window.addEventListener('DOMContentLoaded',()=>{
    const tiles =Array.from(document.querySelectorAll('.tile'));
    const player_display = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board = ['','','','','','','','',''];
    let current_player = 'X';
    let is_Game_active = true;

    const PLAYER_X_WON = 'PLAYER X WON';
    const PLAYER_O_WON = 'PLAYER O WON';
    const TIE = 'TIE'

    const winning_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handle_result_validation(){
        let round_won = false;
        for(let i = 0; i<=7 ; i++){
            const win_condition = winning_conditions[i];
            const a = board[win_condition[0]];
            const b = board[win_condition[1]];
            const c = board[win_condition[2]];

            if(a ===''|| b==='' || c ===''){
                continue;
            }
            if(a ===b && b === c){
                round_won = true;
                break;
            }
        }

        if(round_won){
            announce(current_player ==='X' ? PLAYER_X_WON : PLAYER_O_WON);
            is_Game_active = false;
            return;
        }

        if(!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        
        switch(type){
            case PLAYER_O_WON:
                announcer.innerHTML = 'Player <span class="player_O"> O </span> Won';
                break;
            case PLAYER_X_WON:
                announcer.innerHTML = 'Player <span class="player_X"> X </span> Won';;
                break;
            case TIE:
                announcer.innerText  = TIE;
        }
        announcer.classList.remove('hide');
    }

    const is_valid_action=(tile) => {
        if(tile.innerText === "X" || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const update_bord = (index) =>{
        board[index] = current_player;
    }

    const change_player = () =>{
        player_display.classList.remove(`player_${current_player}`);
        current_player = current_player === "X" ? "O" : "X";
        player_display.innerText = current_player;
        player_display.classList.add(`player_${current_player}`);
    }

    const user_action = (tile, index)=>{
        if(is_valid_action(tile) && is_Game_active){
            tile.innerText = current_player;
            tile.classList.add(`player_${current_player}`);
            update_bord(index);
            handle_result_validation();
            change_player();
        }
    }

    const reset_board = () => {
        board = ['','','','','','','','',''];
        is_Game_active =true;
        announcer.classList.add('hide');
        if(current_player === "O"){
            change_player()
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('player_X');
            tile.classList.remove('player_O');
        });
    }

    tiles.forEach((tile, index)=>{
        tile.addEventListener('click',()=>
            user_action(tile, index)
        );
    })
    resetButton.addEventListener('click',reset_board);
})