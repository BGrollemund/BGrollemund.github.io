class Player {
    constructor(name, role, isTarget, isWolf, isDead, availiable) {
        this.name = name;
        this.role = role;
        this.isTarget = isTarget;
        this.isWolf = isWolf;
        this.isDead = isDead;
        this.availiable = availiable;
    }
}

class Role {
    constructor(name, icon, power, info, availiable) {
        this.name = name;
        this.icon = icon;
        this.power = power;
        this.info = info;
        this.availiable = availiable;
    }
}

class Game {
    constructor(players, roles, isUsed, village, victory) {
        this.players = players;
        this.roles = roles;
        this.isUsed = isUsed;
        this.village= village;
        this.victory= victory;

        this.addPlayer = function (name, role, isTarget, isWolf, isDead, availiable) {
            this.players.push(new Player(name, role, isTarget, isWolf, isDead, availiable));
        };

        this.deletePlayer = function(i) {
            this.players.splice( i, 1 );
        }
    }
}

const
    $content = document.getElementById('content'),
    $playersNav = document.getElementById('players-nav'),
    $rolesNav = document.getElementById('roles-nav'),
    $storyNav = document.getElementById('story-nav'),
    $villageNav = document.getElementById('village-nav'),
    noPlayer = new Player(
        'Choisissez',
        new Role( '', '<i class="fas fa-question fa-fw" style="color:lightgray"></i>', '', '', false ),
        '',
        false,
        '<i class="fas fa-skull-crossbones fa-fw" style="color:lightgray"></i>',
        false
    ),
    noRole = new Role(
        'unknown',
        '<i class="fas fa-question fa-fw" style="color:lightgray"></i>',
        '<i class="fas fa-question fa-fw" style="color:lightgray"></i>',
        '',
        false
    ),
    Villageois = new Role(
        'Villageois',
        '<i class="fas fa-user fa-fw"></i>',
        '<i class="fas fa-times fa-fw"></i>',
        '<div class="info-title">Villageois :</div>'+
        '<div>Solide et robuste, il est un véritable éloge à la simplicité.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    LoupGarou = new Role(
        'Loup-Garou',
        '<i class="fab fa-wolf-pack-battalion fa-fw"></i>',
        '<i class="fas fa-times fa-fw"></i>',
        '<div class="info-title">Loup-Garou :</div>'+
        '<div>Camouflé pendant la journée, affamé la nuit tombée.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div class="mb-3"><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div><span id="night-vote" class="info-btn">Vote de la nuit</span></div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les villageois.</div>',
        true
    ),
    LoupGarouInfect = new Role(
        'Loup-Garou Infecté',
        '<i class="fab fa-wolf-pack-battalion fa-fw" style="color:green"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Loup-Garou Infecté :</div>'+
        '<div>Une simple morsure et vous aurez les crocs pour l’éternité.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div class="mb-3"><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div><span id="night-vote" class="info-btn">Vote de la nuit</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Une fois par partie il peut infecter la victime élu par les loups-garous.<br>'+
        'Il ne peut infecter l’ancien et, s’il tente de le faire, il perd son pouvoir.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les villageois.</div>',
        true
    ),
    LoupGarouBlanc = new Role(
        'Loup-Garou Blanc',
        '<i class="fab fa-wolf-pack-battalion fa-fw" style="color:lightgray"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Loup-Garou Blanc :</div>'+
        '<div>Le double maléfique du vilain petit canard meurt ou gagne seul.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div class="mb-3"><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div><span id="night-vote" class="info-btn">Vote de la nuit</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Un tour sur deux (à partir du premier tour) il peut éliminer un loup-garou s’il le désire.<br>'+
        'Si la petite fille est réveillée, il peut également la croquer.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Il doit être le dernier survivant.</div>',
        true
    ),
    EnfantSauvage = new Role(
        'Enfant Sauvage',
        '<i class="fab fa-drupal fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Enfant Sauvage :</div>'+
        '<div>Une véritable groupie, mais attention! Son admiration pour son idole ne sera rien comparer à sa vengeance si elle vient à périr.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>En début de partie il choisit un modèle. Si celui-ci meurt, il se transforme en loup-garou dès le début de la nuit suivante.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous s’il ne s’est pas transformé.<br>'+
        'Mort de tous les villageois s’il s’est transformé.</div>',
        true
    ),
    PetiteFille = new Role(
        'Petite Fille',
        '<i class="fab fa-keybase fa-fw"></i>',
        '<i class="fas fa-eye fa-fw"></i>',
        '<div class="info-title">Petite Fille :</div>'+
        '<div>Espionne les loups-garous, l’agent 007 avec des couettes.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>La petite fille peut se réveiller discrètement pendant la nuit pour tenter de voir les loups-garous.<br>'+
        'Elle peut également se faire passer pour un loup-garou mais, dans ce cas, son vote la nuit ne compte pas, le loup-garou blanc peut en faire sa victime et si elle perd son pouvoir à la mort de l’ancien elle ne pourra plus se réveiller.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Cupidon = new Role(
        'Cupidon',
        '<i class="fas fa-hand-holding-heart fa-fw"></i>',
        '<i class="fas fa-hand-holding-heart fa-fw"></i>',
        '<div class="info-title">Cupidon :</div>'+
        '<div>Fait se rencontrer les âmes sœurs qui seront liées dans la vie, la mort et leur déclaration d’impôts.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>En début de partie il forme un <span id="couple-info" class="info-btn">couple</span>. Si un des amoureux meurt, le second meurt de tristesse.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Ancien = new Role(
        'Ancien',
        '<i class="fas fa-blind fa-fw"></i>',
        '<i class="fas fa-shield-alt fa-fw"></i>',
        '<div class="info-title">Ancien :</div>'+
        '<div>La sagesse attend finalement le nombre des années, un pied de nez au jeunisme de rigueur.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Il est protégé, une fois par partie, du vote des loups-garous. Il ne peut pas être infecté.<br>'+
        'S’il meurt de la main des villageois, ils perdent tous leur pouvoir (cela ne se produit pas s’il est en <span id="couple-info" class="info-btn">couple</span> et que son amoureux meurt).</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    MontreurOurs = new Role(
        'Montreur d’Ours',
        '<i class="fas fa-paw"></i>',
        '<i class="fas fa-paw"></i>',
        '<div class="info-title">Montreur d’Ours :</div>'+
        '<div>Inséparable de son ours il a du faire une croix sur les voyages en avion et les soirées en boîte.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Après l’annonce des morts en début de journée, l’ours grogne si un loup-garou se trouve à côté de son maître ou si ce dernier est infecté. Le village est mis au courant mais ignore qui est le montreur d’ours.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Renard = new Role(
        'Renard',
        '<i class="fab fa-firefox fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Renard :</div>'+
        '<div>Un flair hors du commun, les loups-garous tenteront de s’en débarrasser au plus vite.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Durant la nuit, s’il le désire, il choisit une cible. Si cette dernière ou une personne à ses côtés est un loup-garou, le conteur lui indique discrètement qu’il garde son pouvoir. Dans le cas inverse il le perd.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Salvateur = new Role(
        'Salvateur',
        '<i class="fas fa-shield-alt fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Salvateur :</div>'+
        '<div>Son bouclier brillant est le dernier rempart face à la soif meurtrière des loups-garous.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Au début de la nuit il choisit une personne qui sera protégée des loups-garous jusqu’à l’aube. Il ne peut protéger deux fois de suite la même personne.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Voyante = new Role(
        'Voyante',
        '<i class="fas fa-hamsa"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Voyante :</div>'+
        '<div>Dans ses 7 boules de cristal, elle peut lire l’avenir et le rôle des autres habitants du village.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Avant le vote des loups-garous, elle utilise ses pouvoirs divinatoires pour connaître le rôle d’un des membres du village.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Sorciere = new Role(
        'Sorcière',
        '<i class="fas fa-hat-wizard fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Sorcière :</div>'+
        '<div>Deux potions, la vie, la mort… Le ying et le yang en version liquide.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>La sorcière possède deux potions qu’elle peut utiliser si elle le désire juste après les votes des loups-garous. Une de vie qui permet de sauver une personne, une de mort qui tuera quiconque la boit.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Chasseur = new Role(
        'Chasseur',
        '<i class="fas fa-hat-cowboy-side fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Chasseur :</div>'+
        '<div>Rancunier? Non… mais faut pas le chercher malgré tout.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>S’il vient à mourir il peut tuer la personne de son choix.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Chevalier = new Role(
        'Chevalier',
        '<i class="fab fa-fort-awesome fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Chevalier :</div>'+
        '<div>Sa vie ne servira peut être à rien, mais sa mort aidera sans aucun doute le village.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>S’il meurt, le premier loup-garou à sa gauche le rejoint dans l’au-delà.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Serveur = new Role(
        'Serveur',
        '<i class="fas fa-glass-cheers fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Serveur :</div>'+
        '<div>Servir et protéger telle est sa devise.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Durant la nuit, il sert à boire à une personne de son choix. Celle-ci décuvera tout le lendemain et ne pourra participer au vote ou se présenter comme président. Il ne peut s’enivrer lui-même, ni offrir à boire deux nuits consécutives à la même personne.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    Corbeau = new Role(
        'Corbeau',
        '<i class="fas fa-crow fa-fw"></i>',
        '<i class="fas fa-bullseye fa-fw"></i>',
        '<div class="info-title">Corbeau :</div>'+
        '<div>Passer mettre dans l’art de la calomnie il peut faire passer l’Abbé Pierre pour un vulgaire tricheur aux cartes.</div>'+
        '<div class="info-title">Participe :</div>'+
        '<div class="mb-3"><span id="day-vote" class="info-btn">Vote de la journée</span></div>'+
        '<div><span id="president-vote" class="info-btn">Vote pour le président</span></div>'+
        '<div class="info-title">Pouvoir :</div>'+
        '<div>Lors de la nuit, il choisit, s’il le désire, une personne qui commencera la journée avec deux votes contre lui.</div>'+
        '<div class="info-title">Condition de victoire :</div>'+
        '<div>Mort de tous les loups-garous.</div>',
        true
    ),
    InfoVoteJour = 'Une fois par jour, le village se réunit et vote pour exécuter un de ses membres. Espérons que ce soit vraiment un loup-garou!<br>'+
                    'En cas d’égalité, le président tranche. S’il n’y a pas de président, personne ne meurt.',
    InfoVoteNuit = 'Une fois par nuit, les loups-garous votent pour choisir leur repas.<br>'+
                    'En cas d’égalité, la nuit n’aura pas fait de victime.',
    InfoVotePresident = 'S’il le désire, le village peut élire un président.<br>'+
                    'Celui-ci aura deux voix lors du <span id="day-vote">Vote de la journée</span> et tranchera en cas d’égalité.<br>'+
                    'S’il meurt il transmet dans un dernier soupir le flambeau à la personne de son choix.',
    InfoCouple = 'Si un membre du couple périt, son âme sœur meurt de chagrin.<br>'+
                    'Les amoureux gagnent s’ils sont tous les deux en vie à la fin de la partie.<br>'+
                    'Ainsi, s’ils sont tous les deux villageois (ou loups-garous) ils gagnent avec les villageois (ou les loups-garous respectivement).<br>'+
                    'S’ils sont dans deux camps différents, ils ne pourront gagner qu’en étant les deux derniers survivants.';


let game = new Game( [], [], {});

function initGame() {
    game = new Game( [],
            [
                Villageois,
                LoupGarou,
                LoupGarouInfect,
                LoupGarouBlanc,
                EnfantSauvage,
                PetiteFille,
                Cupidon,
                Ancien,
                MontreurOurs,
                Renard,
                Salvateur,
                Voyante,
                Sorciere,
                Chasseur,
                Chevalier,
                Serveur,
                Corbeau
            ],
            {
                'infection' : false,
                'lover': false,
                'model' : false,
                'president' : false,
            },
            [],
            false
    );
}

initGame();

$rolesNav.addEventListener( 'click', setRolesContent );
$playersNav.addEventListener( 'click', setPlayersContent );
$villageNav.addEventListener( 'click', setVillageContent );
$storyNav.addEventListener('click', startGame);

function setRolesContent() {
    let result = '<ul>';
    
    game.roles.forEach( (role, i) => {
        result += '<li>';
        result += '<div class="btn">' + role.icon + "</div>";
        result += '<div class="btn">' + role.power + "</div>";
        result += '<div class="btn" id="role_'+i+'"><i class="fas fa-info-circle"></i></div>';
        result += '<div>' + role.name + "</div>";
        result += '</li>';    
    });
    
    result +='</ul>';
    
    $content.innerHTML = result;

    game.roles.forEach( (role, i, array) => {
        document.getElementById('role_'+i).addEventListener( 'click', function() {
            $content.innerHTML = array[i].info;

            if( document.getElementById('day-vote') !== null ) {
                document.getElementById('day-vote').addEventListener( 'click', function() {
                    $content.innerHTML = InfoVoteJour;
                })
            }

            if( document.getElementById('night-vote') !== null ) {
                document.getElementById('night-vote').addEventListener( 'click', function() {
                    $content.innerHTML = InfoVoteNuit;
                })
            }

            if( document.getElementById('president-vote') !== null ) {
                document.getElementById('president-vote').addEventListener( 'click', function() {
                    $content.innerHTML = InfoVotePresident;
                })
            }

            if( document.getElementById('couple-info') !== null ) {
                document.getElementById('couple-info').addEventListener( 'click', function() {
                    $content.innerHTML = InfoCouple;
                })
            }
        })     
    });    
}

function setPlayersContent() {
    let result = '<div>';

    result += '<input type="text" id="player-name" placeholder="Nom" value="">';
    result += '<input type="submit" id="add-player" value="Ajouter"></div>';

    if( game.players.length > 0 ) {
        result += '<ul>';

        game.players.forEach( (player, i) => {
            result += '<li>';
            result += '<div class="btn" id="delete_'+i+'"><i class="fas fa-trash-alt fa-fw"></i></div>';
            result += '<div class="width-lg">'+
                        player.isTarget+
                        player.name+
                        "</div>";
            result += '<div class="btn" id="role_'+i+'">' + player.role.icon + '</div>';
            result += '<div class="btn" id="power_'+i+'">' + player.role.power + '</div>';
            result += '<div class="btn">' + player.isDead + '</div>';
            result += '</li>';     
        });
        result +='</ul>';
    }

    $content.innerHTML = result;

    document.getElementById( 'add-player' ).addEventListener( 'click', function() {
        let playerName = document.getElementById( 'player-name' ).value;
        
        if( playerName !== '' ) {
            game.addPlayer(
                playerName,
                noRole,
                '',
                false,
                '<i class="fas fa-skull-crossbones fa-fw" style="color:lightgray"></i>',
                true
            )
            game.village.push( noPlayer );
        }

        setPlayersContent();
    });

    setEventListenerPlayers();
}

function setEventListenerPlayers() {
    game.players.forEach( (player, i) => {
        document.getElementById( 'role_'+i ).addEventListener( 'click', function() {
            let result = '<ul class="choose-content">';

            game.roles.forEach( (role,j) => {
                if( role.availiable ) {
                    result += '<li>';
                    result += '<div class="btn-lg" id="role_add_'+j+'">' + role.icon + '</div>';
                    result += '</li>';
                }    
            });

            result +='</ul>';
    
            $content.innerHTML = result;
            
            game.roles.forEach( (role,j) => {
                if( role.availiable ) {
                    document.getElementById( 'role_add_'+j ).addEventListener( 'click', function() {
                        game.roles.forEach( (role,j) => {
                            if( game.players[i].role.name === game.roles[j].name ) {
                                game.roles[j].availiable = true;
                            }
                        });
          
                        game.players[i].isWolf = false;
                        game.players[i].role = game.roles[j];

                        if( game.roles[j].name !== 'Villageois' && game.roles[j].name !== 'Loup-Garou' ) {
                            game.roles[j].availiable = false;
                        }
        
                        if( game.roles[j].name === 'Loup-Garou' || game.roles[j].name === 'Loup-Garou Infecté' || game.roles[j].name === 'Loup-Garou Blanc' ) {
                            game.players[i].isWolf = true; 
                        }
                        
                        setPlayersContent();
                    });
                }    
            });
        });

        document.getElementById('delete_'+i).addEventListener( 'click', function() {
            game.roles.forEach( (role,j) => {
                if( game.players[i].role.name === game.roles[j].name ) {
                    game.roles[j].availiable = true;
                }
            });

            if( ! game.players[i].availiable ) {
                for( let j=0; j<game.village.length; j++ ) {
                    if( game.village[j] === game.players[i] ) {
                        game.village.splice(j,1);
                        break;
                    }
                }
            }
            else {
                for( let j=0; j<game.village.length; j++ ) {
                    if( game.village[j] === noPlayer ) {
                        game.village.splice(j,1);
                        break;
                    }
                }
            }

            game.deletePlayer(i);

            setPlayersContent();
        });
    });
}

function setVillageContent() {
    let result = '<div class="d-flex">';

    result +='<ul class="basis-40">';
    for( let i=0; i<Math.ceil(game.village.length / 2); i++ ) {
        result += '<li>';
        result += '<div class="width-lg">'+game.village[i].name+'</div>';
        result += '</li>';
        result += '<li class="center">';
        if( game.village[i].isDead !== '<i class="fas fa-skull-crossbones fa-fw" style="color:lightgray"></i>' ) {
            result += '<div class="btn-lg" id="village_'+i+'">' + game.village[i].isDead + '</div>';    
        }
        else {
            result += '<div class="btn-lg" id="village_'+i+'">' + game.village[i].role.icon + '</div>';
        }
        result += '</li>';
    }
    result += '</ul>';

    result +='<ul class="basis-40">';
    for( let i=Math.ceil(game.village.length / 2); i<game.village.length; i++ ) {
        result += '<li>';
        result += '<div class="width-lg">'+game.village[i].name+'</div>';
        result += '</li>';
        result += '<li class="center">';
        if( game.village[i].isDead !== '<i class="fas fa-skull-crossbones fa-fw" style="color:lightgray"></i>' ) {
            result += '<div class="btn-lg" id="village_'+i+'">' + game.village[i].isDead + '</div>';    
        }
        else {
            result += '<div class="btn-lg" id="village_'+i+'">' + game.village[i].role.icon + '</div>';
        }
        result += '</li>';
    }
    result += '</ul>';

    result += '</div>';

    $content.innerHTML = result;

    setEventListenerVillage();
}

function setEventListenerVillage() {
    game.village.forEach( (place, i) => {
        document.getElementById('village_'+i).addEventListener( 'click', function() {
            let result = '<ul class="choose-content">';

            game.players.forEach( (player,j) => {
                if( player.availiable ) {
                    result += '<li>';
                    result += '<div class="btn-long" id="player_'+j+'">' + player.name + "</div>";
                    result += '</li>';
                }    
            });

            result +='</ul>';
    
            $content.innerHTML = result;

            game.players.forEach( (player,j) => {
                if( player.availiable ) {
                    document.getElementById( 'player_'+j ).addEventListener( 'click', function() {
                        if( game.village[i] !== noPlayer ) {
                            game.players.forEach( (player,k) => {
                                if( player === game.village[i] ) {
                                    game.players[k].availiable = true;
                                }
                            });
                        }

                        game.village[i] = game.players[j];
                        game.players[j].availiable = false;

                        setVillageContent();
                    });
                }
            });
        });    
    });
}

function startGame() {
        let i = 1;
        startNight(i);
        startDay(i);
        i++;
}

const
    GameSentence = {
        'nightBegin' : ['La nuit tombe sur le village...'],
        'cupidon' : ['Cupidon se réveille et forme un couple.']
    };

function startNight(i) {
    let result = '<div>'+GameSentence.nightBegin[0]+'</div>';
    result += '<div>Nuit '+i+' :</div>';
    result += '<div id="game-content"></div>';

    $content.innerHTML = result;

    if( i === 1) {
        contentCupidon();
    }


}

function startDay(i) {

}

function contentCupidon() {
    let result = '<div>'+GameSentence.cupidon[0]+'</div>';
    result += '<ul class="choose-content">';
    result += '<li>';
    result += '<div class="btn-long-xl" id="no-player">Pas de Cupidon</div>';
    result += '</li>';
    result += '</ul>';

    result += '<ul class="choose-content">';
    game.players.forEach( (player,j) => {
            result += '<li>';
            result += '<div class="btn-long" id="player_'+j+'">' + player.name + "</div>";
            result += '</li>';
    });
    result += '</ul>';

    document.getElementById('game-content').innerHTML = result;


}
