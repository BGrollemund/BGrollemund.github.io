const
    $content = document.getElementById('content'),
    $playersNav = document.getElementById('players-nav'),
    $rolesNav = document.getElementById('roles-nav');

class Player {
    constructor(name, role, isLover, isPresident, isDead, isWolf, isModel) {
        this.name = name;
        this.role = role;
        this.isLover = isLover;
        this.isPresident = isPresident;
        this.isDead = isDead;
        this.isWolf = isWolf;
        this.isModel = isModel;
    }
}

class Role {
    constructor(name, icon, power) {
        this.name = name;
        this.icon = icon;
        this.power = power;
    }
}

class Game {
    constructor(players, roles, isUsed) {
        this.players = players;
        this.roles = roles;
        this.isUsed = isUsed;

        this.addPlayer = function (name, role, isLover, isPresident, isDead, isWolf, isModel) {
            this.players.push(new Player(name, role, isLover, isPresident, isDead, isWolf, isModel));
        };

        this.deletePlayer = function(i) {
            this.players.splice( i, 1 );
        }

        this.addRole = function (name, icon, power) {
            this.roles.push(new Role(name, icon, power));
        };

        this.deleteRole = function(i) {
            this.roles.splice( i, 1 );
        }
    }
}

let
    game = new Game( [], [], {
        'infection' : false,
        'model' : false,
    }),
    noRole = new Role(
        'unknown',
        '<i class="fas fa-question fa-fw" style="color:lightgray"></i>',
        '<i class="fas fa-question fa-fw" style="color:lightgray"></i>'
    );

function initGame() {
    game.addRole('Villageois', '<i class="fas fa-user fa-fw"></i>', '<i class="fas fa-times fa-fw"></i>');
    game.addRole('Loup-Garou', '<i class="fab fa-wolf-pack-battalion fa-fw"></i>', '<i class="fas fa-times fa-fw"></i>');
    game.addRole('Loup-Garou Infecté', '<i class="fab fa-wolf-pack-battalion fa-fw" style="color:green"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Loup-Garou Blanc', '<i class="fab fa-wolf-pack-battalion fa-fw" style="color:lightgray"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Enfant Sauvage', '<i class="fab fa-drupal fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Petite Fille', '<i class="fab fa-keybase fa-fw"></i>', '<i class="fas fa-eye fa-fw"></i>' );
    game.addRole('Cupidon', '<i class="fas fa-hand-holding-heart fa-fw"></i>', '<i class="fas fa-hand-holding-heart fa-fw"></i>');
    game.addRole('Ancien', '<i class="fas fa-blind fa-fw"></i>', '<i class="fas fa-shield-alt fa-fw"></i>');
    game.addRole('Montreur d\'Ours', '<i class="fas fa-paw"></i>', '<i class="fas fa-paw"></i>');
    game.addRole('Salvateur', '<i class="fas fa-shield-alt fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Voyante', '<i class="fas fa-hamsa"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Sorcière', '<i class="fas fa-hat-wizard fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Chasseur', '<i class="fas fa-hat-cowboy-side fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Chevalier', '<i class="fab fa-fort-awesome fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Serveur', '<i class="fas fa-glass-cheers fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
    game.addRole('Corbeau', '<i class="fas fa-crow fa-fw"></i>', '<i class="fas fa-bullseye fa-fw"></i>');
}

// '<i class="fas fa-flask fa-fw" style="color:green"></i>'
// '<i class="fas fa-heart fa-fw"></i>'
// <i class="fas fa-medal fa-fw"></i>
// <i class="fas fa-info-circle"></i>
// <i class="fab fa-firefox-browser"></i>

initGame();

$rolesNav.addEventListener( 'click', setRolesContent );

$playersNav.addEventListener( 'click', setPlayersContent );

function setRolesContent() {
    let result = '<ul>';

    game.roles.forEach(role => {
        result += '<li>';
        result += '<div class="btn">' + role.icon + "</div>";
        result += '<div class="btn">' + role.power + "</div>";
        result += '<div>' + role.name + "</div>";
        result += '</li>';    
    });

    result +='</ul>';

    $content.innerHTML = result;    
}

function setPlayersContent() {
    let result = '<div>';

    result += '<input type="text" id="player-name" placeholder="Nom" value="">';
    result += '<input type="submit" id="add-player" value="Ajouter"></div>';

    if( game.players.length > 0 ) {
        result += '<ul>';

        game.players.forEach( (player, i) => {
            result += '<li>';
            result += '<div class="width-lg">'+
                        player.isLover+
                        player.isPresident+
                        player.isModel+
                        player.name+
                        "</div>";
            result += '<div class="btn" id="role_'+i+'">' + player.role.icon + "</div>";
            result += '<div class="btn" id="power_'+i+'">' + player.role.power + "</div>";
            result += '<div class="btn">' + player.isDead + "</div>";
            result += '</li>';     
        });
        result +='</ul>';
    }

    $content.innerHTML = result;

    if( game.players.length > 0 ) {
        game.players.forEach( (player, i) => {
            setEventListenerPlayers(i);    
        });    
    }

    let
        $addPlayer = document.getElementById( 'add-player' ),
        $playerName = document.getElementById( 'player-name' );

    $addPlayer.addEventListener( 'click', function() {
        let playerName = $playerName.value;
        
        if( playerName !== '' ) {
            game.addPlayer(
                playerName,
                noRole,
                '',
                '',
                '<i class="fas fa-skull-crossbones fa-fw" style="color:lightgray"></i>',
                false,
                ''
            )
        }

        setPlayersContent();
    });
}

function setEventListenerPlayers(i) {
    let
        $power_i = document.getElementById( 'power_'+i ),
        $role_i = document.getElementById( 'role_'+i );

    $role_i.addEventListener( 'click', function() {
        let result = '<ul class="choose-content">';

        game.roles.forEach( (role,j) => {
            result += '<li>';
            result += '<div class="btn-lg" id="role_add_'+j+'">' + role.icon + "</div>";
            result += '</li>';    
        });

        result +='</ul>';
    
        $content.innerHTML = result;

        game.roles.forEach( (role,j) => {
            let
                $role_add_j = document.getElementById( 'role_add_'+j );
            
            $role_add_j.addEventListener( 'click', function() {
                game.players[i].role = game.roles[j];

                if( game.roles[j].name === 'Loup-Garou' || game.roles[j].name === 'Loup-Garou Infecté' || game.roles[j].name === 'Loup-Garou Blanc' ) {
                    game.players[i].isWolf = true; 
                }
                
                setPlayersContent();
            });    
        });
        
    });

    $power_i.addEventListener( 'click', function() {
        getPowerResult(i);
    })
}

function getPowerResult(i) {
    let result = '';

    if( game.players[i].isDead === '<i class="fas fa-skull-crossbones fa-fw"></i>') {
        result += '<div class="power-content">';
        result += 'Ce joueur est mort.<br>';
        result += '</div>';

        $content.innerHTML = result;
        return;   
    }

    if( game.players[i].role.name === 'Villageois' ) {
        result += '<div class="power-content">';
        result += 'Les villageois n\'ont pas de pouvoir...<br>';
        result += 'A part le vote!<br>';
        result += '</div>';

        $content.innerHTML = result;
        return;
    }

    if( game.players[i].role.name === 'Loup-Garou' ) {
        result += '<div class="power-content">';
        result += 'Les loups-garous n\'ont pas de pouvoir...<br>';
        result += 'A part le vote!<br>'
        result += '</div>';

        $content.innerHTML = result;
        return;
    }

    if( game.players[i].role.name === 'Loup-Garou Infecté' ) {
        if( game.isUsed.infection ) {
            result += '<div class="power-content">';
            result += 'L\'infection a déjà eu lieu.<br>';
            result += '</div>';
            
            $content.innerHTML = result;
            return;
        }
        
        result += '<div class="power-content">';
        result += 'Le loup-garou infecté ne peut infecté qu\'une seule fois par partie.<br>';
        result += 'L\'ancien ne peut pas être infecté (le pouvoir est utilisé malgré tout).<br>';
        result += '</div>';
        
        result += '<ul class="choose-content">';

        game.players.forEach( (player,j) => {
            if( i !== j && ! player.isWolf && player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                result += '<li>';
                result += '<div class="btn-long" id="player_'+j+'">' + player.name + "</div>";
                result += '</li>';  
            }       
        });

        result +='</ul>';
        $content.innerHTML = result;

        game.players.forEach( (player,j) => {
            if( i !== j && ! player.isWolf && player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                let $player_j = document.getElementById( 'player_'+j );
                    
                $player_j.addEventListener( 'click', function() {
                    if( game.players[j].role.name === 'Ancien' ) {
                        game.players[i].role.power = '<i class="fas fa-times fa-fw"></i>';
                        game.isUsed.infection = true;    
                    }
                    else {
                        game.players[j].name = '<i class="fab fa-wolf-pack-battalion fa-fw" style="color:green"></i>'+
                                            game.players[j].name;

                        game.players[i].role.power = '<i class="fas fa-times fa-fw"></i>';
                        game.players[j].isWolf = true;
                        game.isUsed.infection = true;
                    }
                        
                    setPlayersContent();
                });  
            }
        });

        return;
    }

    if( game.players[i].role.name === 'Loup-Garou Blanc' ) {
        result += '<div class="power-content">';
        result += 'Le loup-garou blanc peut tuer un autre loup un tour sur deux.<br>';
        result += 'Vérifier que ce soit bien le cas.<br>';
        result += '</div>';

        result += '<ul class="choose-content">';

        game.players.forEach( (player,j) => {
            if( i !== j && player.isWolf && player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                result += '<li>';
                result += '<div class="btn-long" id="player_'+j+'">' + player.name + "</div>";
                result += '</li>';  
            }       
        });

        result +='</ul>';
    
        $content.innerHTML = result;

        game.players.forEach( (player,j) => {
            if( i !== j && player.isWolf && player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                let $player_j = document.getElementById( 'player_'+j );
                    
                $player_j.addEventListener( 'click', function() {
                    game.players[j].isDead = '<i class="fas fa-skull-crossbones fa-fw"></i>';
                        
                    setPlayersContent();
                });  
            }
        }); 
        
        return;
    }  
    
    if( game.players[i].role.name === 'Enfant Sauvage' ) {
        if( game.isUsed.model ) {
            result += '<div class="power-content">';
            result += 'L\'Enfant Sauvage a déjà choisi un modèle.<br>';
            result += '</div>';
            
            $content.innerHTML = result;
            return;
        } 
        
        result += '<div class="power-content">';
        result += 'L\'Enfant Sauvage choisit un modèle.<br>';
        result += 'Si le modèle meurt, l\'Enfant Sauvage se transforme en loup-garou.<br>';
        result += '</div>';
        
        result += '<ul class="choose-content">';

        game.players.forEach( (player,j) => {
            if( i !== j & player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                result += '<li>';
                result += '<div class="btn-long" id="player_'+j+'">' + player.name + "</div>";
                result += '</li>';  
            }       
        });

        result +='</ul>';
        $content.innerHTML = result;

        game.players.forEach( (player,j) => {
            if( i !== j & player.isDead !== '<i class="fas fa-skull-crossbones fa-fw"></i>' ) {
                let $player_j = document.getElementById( 'player_'+j );
                    
                $player_j.addEventListener( 'click', function() {
                    game.players[i].role.power = '<i class="fas fa-times fa-fw"></i>';
                    game.players[j].isModel = '<i class="fab fa-drupal fa-fw"></i>';
                    game.isUsed.model = true;
                        
                    setPlayersContent();
                });  
            }
        }); 
        
        return;
    }

}