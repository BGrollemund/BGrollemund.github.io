
function calculateStats() {
    let 
        current_speakers = [],
        session_exist = false,
        speaker_exist = false,
        result = {
            'total_hour' : 0,
            'sessions' : [],
            'speakers' : []
        },
        sessionItem_stat;

    for( let i=0; i<schedule.daysInfo.length; i++ ) {
        if( schedule.daysInfo[i] !== undefined ) {
            for( let j=0; j<schedule.daysInfo[i].sessionItems.length; j++ ) {
                let speakers = [];

                for( let k=0; k<schedule.daysInfo[i].sessionItems[j].speakers.length; k++ ) {
                    if( schedule.daysInfo[i].sessionItems[j].speakers[k] !== undefined ) {
                        speakers.push( schedule.daysInfo[i].sessionItems[j].speakers[k].name );
                    }
                }

                sessionItem_stat = {
                    'duration' : schedule.daysInfo[i].sessionItems[j].duration,
                    'session' : schedule.daysInfo[i].sessionItems[j].session.name,
                    'speakers' : speakers
                };

                result.total_hour += sessionItem_stat.duration;

                for( let k=0; k<result.sessions.length; k++ ) {
                    if( result.sessions[k].name === sessionItem_stat.session ) {
                        result.sessions[k].hours += sessionItem_stat.duration;

                        session_exist = true;

                        for( let l=0; l<sessionItem_stat.speakers.length; l++ ) {
                            for( let m=0; m<result.sessions[k].speakers.length; m++ ) {
                                if( result.sessions[k].speakers[m].name === sessionItem_stat.speakers[l] ) {
                                    result.sessions[k].speakers[m].hours += sessionItem_stat.duration;
                                    
                                    speaker_exist = true;
                                }
                            }

                            if( ! speaker_exist ) {
                                result.sessions[k].speakers.push( {
                                    'name' : sessionItem_stat.speakers[l],
                                    'hours' : sessionItem_stat.duration
                                } );
                            }

                            speaker_exist = false;
                        }                        
                    }
                }

                for( let k=0; k<sessionItem_stat.speakers.length; k++ ) {
                    current_speakers.push( {
                        'name' : sessionItem_stat.speakers[k],
                        'hours' : sessionItem_stat.duration
                    } );
                }

                if( ! session_exist ) {
                    result.sessions.push( {
                        'name' : sessionItem_stat.session,
                        'hours' : sessionItem_stat.duration,
                        'speakers' : current_speakers
                    } );
                }

                current_speakers = [];
                session_exist = false;


                for( let k=0; k<schedule.daysInfo[i].sessionItems[j].speakers.length; k++ ) {
                    if( schedule.daysInfo[i].sessionItems[j].speakers[k] !== undefined ) {
                    
                        sessionItem_stat = {
                            'duration' : schedule.daysInfo[i].sessionItems[j].duration,
                            'speaker' : schedule.daysInfo[i].sessionItems[j].speakers[k].name,
                            'session' : schedule.daysInfo[i].sessionItems[j].session.name
                        };

                        for( let l=0; l<result.speakers.length; l++ ) {
                            if( result.speakers[l].name === sessionItem_stat.speaker ) {
                                result.speakers[l].hours +=  schedule.daysInfo[i].sessionItems[j].duration;

                                speaker_exist = true;

                                for( let m=0; m<result.speakers[l].sessions.length; m++ ) {
                                    if( result.speakers[l].sessions[m].name === sessionItem_stat.session ) {
                                        result.speakers[l].sessions[m].hours += sessionItem_stat.duration;
                                            
                                        session_exist = true;
                                    }
                                }
        
                                if( ! session_exist ) {
                                    result.speakers[l].sessions.push( {
                                        'name' : sessionItem_stat.session,
                                        'hours' : sessionItem_stat.duration
                                    } );
                                }
        
                                session_exist = false;
                            }
                        }
                        
                        if( ! speaker_exist ) {
                            result.speakers.push( {
                                'name' : sessionItem_stat.speaker,
                                'hours' : sessionItem_stat.duration,
                                'sessions' : [ { 'name' : sessionItem_stat.session, 'hours' : sessionItem_stat.duration } ]
                            } );       
                        }
    
                        speaker_exist = false;
                    }

                }

            }
            
        };
    }

    // Ajout des heures en demi-groupes
    // TODO: terminer la fonction par groupe et faire les modifications nécessaires

    let group_stat = calculateGroupStats();

    for( let i=0; i<group_stat.sessions_group2.length; i++ ) {
        for( let j=0; j<group_stat.sessions_group2[i].speakers.length; j++ ) {
            for( let k=0; k<result.speakers.length; k++ ) {
                if( group_stat.sessions_group2[i].speakers[j].name === result.speakers[k].name ) {
                    result.speakers[k].hours  += group_stat.sessions_group2[i].speakers[j].hours;
                    speaker_exist = true;

                    for( let m=0; m<result.speakers[k].sessions.length; m++ ) {
                        if( result.speakers[k].sessions[m].name === group_stat.sessions_group2[i].name ) {
                            result.speakers[k].sessions[m].hours += group_stat.sessions_group2[i].speakers[j].hours;
                                
                            session_exist = true;
                        }
                    }

                    if( ! session_exist ) {
                        result.speakers[k].sessions.push( {
                            'name' : group_stat.sessions_group2[i].name,
                            'hours' : group_stat.sessions_group2[i].speakers[j].hours
                        } );
                    }

                    session_exist = false;
                }
            }

            if( ! speaker_exist ) {
                result.speakers.push( {
                    'name' : group_stat.sessions_group2[i].speakers[j].name,
                    'hours' : group_stat.sessions_group2[i].speakers[j].hours,
                    'sessions' : [ {
                        'name' : group_stat.sessions_group2[i].name,
                        'hours' : group_stat.sessions_group2[i].speakers[j].hours
                    } ]
                } );       
            }

            speaker_exist = false;
        }
    }

    // Modif total intervenants 
    for( let i=0; i<schedule.stats_remove.length; i++ ) {
        for( let j=0; j<result.speakers.length; j++ ) {
            for( let k=0; k<result.speakers[j].sessions.length; k++) {
                if( schedule.stats_remove[i] === result.speakers[j].sessions[k].name ) {
                    result.speakers[j].hours -= result.speakers[j].sessions[k].hours;
                }
            }
        }
    }

    return result;
}

function calculateOptionsStats( stats ) {
    let result = [];

    for( let i=0; i<schedule.stats.length; i++ ) {
        result.push( {
            'hours' : 0,
            'sub_hours' : []
        } );

        for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
            for( k=0; k<stats.sessions.length; k++ ) {
                if( schedule.stats[i].sessions[j] === stats.sessions[k].name ) {
                    result[i].hours += stats.sessions[k].hours;
                }
            }
        }

        for( let j=0; j<schedule.stats[i].sub_group.length; j++ ) {
            result[i].sub_hours.push( 0 );

            for( let k=0; k<schedule.stats[i].sub_group[j].sessions.length; k++ ) {
                for( let m=0; m<stats.sessions.length; m++ ) {
                    if( schedule.stats[i].sub_group[j].sessions[k] === stats.sessions[m].name ) {
                        result[i].sub_hours[j] += stats.sessions[m].hours;
                    }
                }
            }
        }
    }

    return result;
}

function findDay( i ) {
    let
        start_date = new Date( schedule.start_date ),
        end_date = new Date( schedule.end_date ),
        col_i,
        row_i,
        table_i,
        height = schedule.days.length,
        width = separeWeeks( start_date, end_date ).length,
        width_last_table = width % 8,
        total_table = Math.ceil( width / 8 ),
        num_cell_table_completed = ( width - width_last_table ) * height,
        i_last_table = i - num_cell_table_completed;


        if( i <= num_cell_table_completed ) {
            col_i = newModulo( i, 8 );
            row_i = newModulo( Math.ceil( i / 8 ) , height );  
            table_i = Math.ceil( i / ( 8 * height ) );          
        }
        else{
            col_i = newModulo( i_last_table, width_last_table );
            row_i = newModulo( Math.ceil( i_last_table / width_last_table ), height );
            table_i = total_table;
        }

        switch( schedule.days[row_i - 1] ) {
            case 'Lundi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 1 ) );
            break;
            case 'Mardi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 2 ) );
            break;
            case 'Mercredi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 3 ) );
            break;
            case 'Jeudi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 4 ) );
            break;
            case 'Vendredi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 5 ) );
            break;
            case 'Samedi':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 6 ) );
            break;
            case 'Dimanche':
                result_date = start_date.setDate( start_date.getDate() + ( col_i - 1 + ( table_i - 1 ) * 8 ) * 7 - ( newGetDay(start_date) - 7 ) );
            break;
                            
        }

        return {
            'day' : schedule.days[ row_i - 1 ],
            'date' : start_date.getDate(),
            'month' : start_date.getMonth() + 1
        };   
}

function isSelected( string_start, string_end, value, value_checked ) {
    if( value === value_checked ){
        return string_start + ' selected' + string_end;
    }

    return string_start + string_end;
}

function initFields() {
    $schedule_name.value = '';
    $schedule_start_date.value = '';
    $schedule_end_date.value = '';
    $schedule_mo.checked = false;
    $schedule_tu.checked = false;
    $schedule_we.checked = false;
    $schedule_th.checked = false;
    $schedule_fr.checked = false;
    $schedule_sa.checked = false;
    $schedule_su.checked = false;
}

function newGetDay( date ) {
    if( date.getDay() === 0 ) {
        return 7;
    }
    else {
        return date.getDay();
    }
}

function newModulo( number, modulo ) {
    if( number % modulo === 0 ) {
        return modulo;
    }
    else {
        return number % modulo;
    }
}

function separeWeeks( start_date, end_date ) {
    let
        monday = new Date( start_date ),
        sunday = new Date( start_date ),
        result = [];

    monday.setDate( monday.getDate() - ( newGetDay( monday ) - 1 ) );
    sunday.setDate( sunday.getDate() + ( 7 - newGetDay( sunday ) ) );

    result.push( monday.getDate() + '/' + ( monday.getMonth() + 1 ) + '-' + sunday.getDate() + '/' + ( sunday.getMonth() + 1 ) );

    while( sunday - end_date < 0 ) {
        monday.setDate( monday.getDate() + 7 );
        sunday.setDate( sunday.getDate() + 7 );

        result.push( monday.getDate() + '/' + ( monday.getMonth() + 1 ) + '-' + sunday.getDate() + '/' + ( sunday.getMonth() + 1 ) );
    }

    return result;
}

function setFieldScheduleEdit() {
    $info_schedule_create.style.display = 'none';
    $info_schedule_edit.style.display = 'block';

    $schedule_start_date.disabled = true;
    $schedule_end_date.disabled = true;
    $schedule_mo.disabled = true;
    $schedule_tu.disabled = true;
    $schedule_we.disabled = true;
    $schedule_th.disabled = true;
    $schedule_fr.disabled = true;
    $schedule_sa.disabled = true;
    $schedule_su.disabled = true;
}

function setFieldScheduleCreate() {
    $info_schedule_create.style.display = 'block';
    $schedule_back.style.display = 'inline';
    $info_schedule_edit.style.display = 'none';

    $schedule_start_date.disabled = false;
    $schedule_end_date.disabled = false;
    $schedule_mo.disabled = false;
    $schedule_tu.disabled = false;
    $schedule_we.disabled = false;
    $schedule_th.disabled = false;
    $schedule_fr.disabled = false;
    $schedule_sa.disabled = false;
    $schedule_su.disabled = false; 
}

// TODO: statistiques séparées pour les deux groupes dans le menu cours
// Fonction incomplète pour cet objectif
// Fonction conservée pour statistiques Intervenant
// A compléter (donc!)

function calculateGroupStats() {
    let
        current_speakers = [],
        session_exist = false,
        speaker_exist = false,
        speaker_double = false,
        result = {
            'sessions_group1' : [],
            'sessions_group2' : [],
            'speakers' : []
        },
        sessionItem_stat;

    for( let i=0; i<schedule.group.length; i++ ) {
        let speakers = [];
        
        for( let j=0; j<schedule.group[i].speakers.length; j++ ) {
            if( schedule.group[i].speakers[j] !== undefined ) {
                speakers.push( schedule.group[i].speakers[j].name )                 
            }
        }

        sessionItem_stat = {
            'duration' : schedule.group[i].duration,
            'session_group1' : schedule.daysInfo[ schedule.group[i].day ].sessionItems[ schedule.group[i].sessionItem - 1 ],
            'session_group2' : schedule.group[i].session.name,
            'speakers' : speakers
        };

        for( let j=0; j<result.sessions_group1.length; j++ ) {
            if( result.sessions_group1[j].name === sessionItem_stat.session_group1 ) {
                
                // A revoir avec dernier changement
                result.sessions_group1[j].hours += sessionItem_stat.duration;
                session_exist = true;  
            }
        }

        if( ! session_exist ) {
            result.sessions_group1.push( sessionItem_stat.session_group1 );
        }

        session_exist = false;

        for( let j=0; j<result.sessions_group2.length; j++ ) {
            if( result.sessions_group2[j].name === sessionItem_stat.session_group2 ) {
                result.sessions_group2[j].hours += sessionItem_stat.duration;
                session_exist = true;
                
                for( let k=0; k<sessionItem_stat.speakers.length; k++ ) {
                    for( let l=0; l<result.sessions_group2[j].speakers.length; l++ ) {

                        let current_day_speakers = schedule.daysInfo[ schedule.group[i].day ].
                                                    sessionItems[ schedule.group[i].sessionItem - 1 ].speakers;

                        for( let m=0; m<current_day_speakers.length; m++ ) {
                            if( current_day_speakers[m] !== undefined ) {
                                if( sessionItem_stat.speakers[k] === current_day_speakers[m].name ) {
                                    speaker_double = true;
                                }
                            }    
                        }

                        if( ! speaker_double ) {
                            if( result.sessions_group2[j].speakers[l].name === sessionItem_stat.speakers[k] ) {
                                result.sessions_group2[j].speakers[l].hours += sessionItem_stat.duration;
                                speaker_exist = true;
                            }
                        }       
                    }

                    if( ! speaker_double && ! speaker_exist ) {
                        if( ! speaker_exist ) {
                            result.sessions_group2[j].speakers.push( {
                                'name' : sessionItem_stat.speakers[k],
                                'hours' : sessionItem_stat.duration
                            } );
                        }
                    }
                    speaker_exist = false;
                    speaker_double = false;
                }
            }    
        }

        for( let l=0; l<sessionItem_stat.speakers.length; l++ ) {
            let current_day_speakers = schedule.daysInfo[ schedule.group[i].day ].
                                        sessionItems[ schedule.group[i].sessionItem - 1 ].speakers;

            for( let m=0; m<current_day_speakers.length; m++ ) {
                if( current_day_speakers[m] !== undefined ) {
                    if( sessionItem_stat.speakers[l] === current_day_speakers[m].name ) {
                        speaker_double = true;
                    }
                }
            }
                
            if( ! speaker_double ) {
                current_speakers.push( {
                    'name' : sessionItem_stat.speakers[l],
                    'hours' : sessionItem_stat.duration
                } );
            }

            speaker_double = false;
        }

        if( ! session_exist ) {
            result.sessions_group2.push( {
                'name' : sessionItem_stat.session_group2,
                'hours' : sessionItem_stat.duration,
                'speakers' : current_speakers
            } );
        }

        session_exist = false;
        current_speakers = [];
    }

    return result;
}