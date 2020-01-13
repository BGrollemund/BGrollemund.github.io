// TODO: modification planning par jours et période
// TODO: ajout background hachuré, avec des points etc. dans activités
// TODO: modularité nombre de créneaux par jour et proportionnalité des créneaux en fonction de la durée
// TODO: statistiques cohérentes des cas pathologiques demi-groupes
// TODO: bouton ajouter au groupe (select) dans options activité (statistiques)
// TODO: boutons pour classer manuellement dans option statistiques
// TODO: options d'impression


let
    isHtmlSchedule = false,
    schedule = new Schedule( '', '', '', [], [], [], [], 0, [], [], [], [] );    


initFields();

$paste.addEventListener( 'click', function() {
    if( isHtmlSchedule ) {
        $to_copy_previous.innerText = JSON.stringify(schedule);
    }

    let data = JSON.parse( $to_paste.value );

    for( let i=0; i<data.daysInfo.length; i++ ) {
        if( data.daysInfo[i] === null ) {
            data.daysInfo[i] = undefined;
        }
        else {
            for( let j=0; j<data.daysInfo[i].sessionItems.length; j++ ) {
                for( let k=0; k<data.daysInfo[i].sessionItems[j].speakers.length; k++ ) {
                    if( data.daysInfo[i].sessionItems[j].speakers[k] === null ) {
                        data.daysInfo[i].sessionItems[j].speakers[k] = undefined;
                    }
                }
            }
        }
    }

    for(  let i=0; i<data.group.length; i++ ) {
        for( let j=0; j<data.group[i].speakers.length; j++ ) {
            if( data.group[i].speakers[j] === null ) {
                data.group[i].speakers[j] = undefined;    
            }
        }
    }

    schedule = new Schedule(
        data.name,
        data.start_date,
        data.end_date,
        data.days,
        data.sessions,
        data.speakers,
        data.daysInfo,
        data.total_hour,
        data.group,
        data.stats,
        data.stats_remove,
        data.add_on,
        );    
    
    createHtmlSchedule( schedule.name, schedule.start_date, schedule.end_date, schedule.days );
    createHtmlStats();
    updateSessions();
    updateSpeakers();
    updateHtmlSchedule();

    $schedule_name.value = schedule.name;
    $schedule_start_date.value = schedule.start_date;
    $schedule_end_date.value = schedule.end_date;

    schedule.days.forEach(day => {
        if( day === 'Lundi' ) {
            $schedule_mo.checked = true;
        }    
        if( day === 'Mardi' ) {
            $schedule_tu.checked = true;
        }    
        if( day === 'Mercredi' ) {
            $schedule_we.checked = true;
        }    
        if( day === 'Jeudi' ) {
            $schedule_th.checked = true;
        }    
        if( day === 'Vendredi' ) {
            $schedule_fr.checked = true;
        }    
        if( day === 'Samedi' ) {
            $schedule_sa.checked = true;
        }    
        if( day === 'Dimanche' ) {
            $schedule_su.checked = true;
        }    
    });

    setFieldScheduleEdit();
});

$schedule_create.addEventListener( 'click', function() {
    if( isHtmlSchedule ) {
        $to_copy_previous.innerText = JSON.stringify(schedule);
    }

    schedule.name = $schedule_name.value;
    schedule.start_date = $schedule_start_date.value;
    schedule.end_date = $schedule_end_date.value;
    schedule.daysInfo = [];
    schedule.total_hour = 0;
    schedule.group = [];
    schedule.stats = [];
    schedule.stats_remove = [];
    schedule.add_on = [];

    if( schedule.sessions.length > 0 ) {
        for( let i=0; i<schedule.sessions.length; i++ ) {
            schedule.sessions[i].count_hour = 0;
        }
    }

    if( schedule.speakers.length > 0 ) {
        for( let i=0; i<schedule.speakers.length; i++ ) {
            schedule.speakers[i].count_hour = 0;
        }
    }

    schedule.days = [];
    if( $schedule_mo.checked === true ) {
        schedule.addDay( 'Lundi' )
    }
    if( $schedule_tu.checked === true ) {
        schedule.addDay( 'Mardi' )
    }
    if( $schedule_we.checked === true ) {
        schedule.addDay( 'Mercredi' )
    }
    if( $schedule_th.checked === true ) {
        schedule.addDay( 'Jeudi' )
    }
    if( $schedule_fr.checked === true ) {
        schedule.addDay( 'Vendredi' )
    }
    if( $schedule_sa.checked === true ) {
        schedule.addDay( 'Samedi' )
    }
    if( $schedule_su.checked === true ) {
        schedule.addDay( 'Dimanche' )
    }

    setFieldScheduleEdit();
    updateSessions();
    updateSpeakers();
    createHtmlSchedule( schedule.name, schedule.start_date, schedule.end_date, schedule.days );
    createHtmlStats();
});

$schedule_back.addEventListener( 'click', function() {
    $schedule_name.value = schedule.name;
    $schedule_start_date.value = schedule.start_date;
    $schedule_end_date.value = schedule.end_date;

    schedule.days.forEach(day => {
        if( day === 'Lundi' ) {
            $schedule_mo.checked = true;
        }    
        if( day === 'Mardi' ) {
            $schedule_tu.checked = true;
        }    
        if( day === 'Mercredi' ) {
            $schedule_we.checked = true;
        }    
        if( day === 'Jeudi' ) {
            $schedule_th.checked = true;
        }    
        if( day === 'Vendredi' ) {
            $schedule_fr.checked = true;
        }    
        if( day === 'Samedi' ) {
            $schedule_sa.checked = true;
        }    
        if( day === 'Dimanche' ) {
            $schedule_su.checked = true;
        }    
    });

    setFieldScheduleEdit();   
});

$schedule_edit.addEventListener( 'click', function() {
    schedule.name = $schedule_name.value;
    schedule.start_date = $schedule_start_date.value;
    schedule.end_date = $schedule_end_date.value;

    schedule.days = [];
    if( $schedule_mo.checked === true ) {
        schedule.addDay( 'Lundi' )
    }
    if( $schedule_tu.checked === true ) {
        schedule.addDay( 'Mardi' )
    }
    if( $schedule_we.checked === true ) {
        schedule.addDay( 'Mercredi' )
    }
    if( $schedule_th.checked === true ) {
        schedule.addDay( 'Jeudi' )
    }
    if( $schedule_fr.checked === true ) {
        schedule.addDay( 'Vendredi' )
    }
    if( $schedule_sa.checked === true ) {
        schedule.addDay( 'Samedi' )
    }
    if( $schedule_su.checked === true ) {
        schedule.addDay( 'Dimanche' )
    }

    setFieldScheduleEdit();
    createHtmlSchedule( schedule.name, schedule.start_date, schedule.end_date, schedule.days )
    createHtmlStats();
    updateHtmlSchedule();
});

$schedule_new.addEventListener( 'click', function() {
    setFieldScheduleCreate();   
    initFields();
});

$session_add.addEventListener( 'click', function() {
    let session_error = false;

    schedule.sessions.forEach(session =>  {
        if( session.name === $session_name.value ) {
            session_error = true;
        }
    });

    if( session_error ) {
        $session_error.innerText = 'Le nom est déjà utilisé';
    }
    else {
        $session_error.innerText = '';

        schedule.addSession( $session_name.value, $session_alias.value, $session_color.value, 0 );

        $session_name.value = '';
        $session_alias.value = '';
        $session_color.value = 'white';

        updateSessions();   
    }
});

$speaker_add.addEventListener( 'click', function() {
    let speaker_error = false;

    schedule.speakers.forEach(speaker =>  {
        if( speaker.name === $speaker_name.value ) {
            speaker_error = true;
        }
    });

    if( speaker_error ) {
        $speaker_error.innerText = 'Le nom est déjà utilisé';
    }
    else {
        $speaker_error.innerText = '';
        
        schedule.addSpeaker( $speaker_name.value, $speaker_alias.value, 0 );

        $speaker_name.value = '';
        $speaker_alias.value = '';

        updateSpeakers()
    }
});