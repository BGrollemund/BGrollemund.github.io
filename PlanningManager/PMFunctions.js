
function createHtmlSchedule( name, start_date, end_date, days ) {
    let
        result = '<h2>Les dates ne sont pas bonnes.</h2>',
        count = 1;
        weeks = [];

    if( start_date === '' || end_date === '' ) {
        $main_content.innerHTML = result;
        return '';
    }    
    
    start_date = new Date(start_date);
    end_date = new Date(end_date);

    if( end_date - start_date < 0 ) {
        $main_content.innerHTML = result;
        return '';
    }

    weeks = separeWeeks( start_date, end_date );

    result = '<h3>' + name + '</h3>';

    for( let i=0; i<weeks.length; i++ ) {
        if( i % 8 === 0 ) {
            result += '<table style="margin-top:23px;"><tr><th>Jours</th>';              
        }

        result += '<th>' + weeks[i] + '</th>';

        if( i % 8 === 7 ) {
            result +='</tr>';
            days.forEach(day => {
                result += '<tr><th>' + day + '</th>';
                
                for( let j=0; j<8; j++) {
                    result += '<td id="schedule_day_' + count + '"></td>';
                    count++;    
                }
                
                result += '</tr>';
            });
            result += '</table>';
        }

        if( i === weeks.length - 1 && i % 8 !== 7 ) {
            result +='</tr>';
            days.forEach(day => {
                result += '<tr><th>' + day + '</th>';
                
                for( let j=0; j< ( weeks.length % 8 ) ; j++) {
                    result += '<td id="schedule_day_' + count + '"></td>';
                    count++;    
                }
                
                result += '</tr>';
            });
            result += '</table>';
        }
    }

    isHtmlSchedule = true;

    $to_copy.innerText = JSON.stringify(schedule);
    
    $main_content.innerHTML = result;
    isHtmlSchedule = true;
    setEventListenerInfoDay( count - 1 );

}

function createHtmlStats() {
    let
        result = '<h2>Statistiques</h2>'
        stats = calculateStats();
        sub_total = calculateOptionsStats( stats );    

    result += '<div style="display:flex;">';

    result += '<div style="flex-basis:30%;"><h3>Activités :</h3>';
    result += '<div style="font-weight:700;">Total : '+stats.total_hour+'h</div>';
    
    result += '<div style="margin-top:7px;">';

    for( let i=0; i<stats.sessions.length; i++ ) {
        if( stats.sessions[i].hours !== 0 ) {
            let stats_session = false;

            for( let j=0; j<schedule.stats.length; j++ ) {
                for( let k=0; k<schedule.stats[j].sessions.length; k++ ) {
                    if( schedule.stats[j].sessions[k] === stats.sessions[i].name ) {
                        stats_session = true;
                    }
                }
            }

            if( ! stats_session ) {
                result += '<div>'+stats.sessions[i].name+' : '+stats.sessions[i].hours+'h</div>';

                result += '<div>';
                result += '<input type="button" id="stats_session_'+i+
                    '_show" value="Afficher détails" style="padding:3px;width:120px">';
                result += '<input type="button" id="stats_session_'+i+
                    '_unshow" value="Masquer détails" style="padding:3px;display:none;width:120px;">';
                result += '</div>';

                result += '<div  id="stats_session_'+i+'_details" style="color:blue;display:none;margin-bottom:7px;">';
                for( let j=0; j<stats.sessions[i].speakers.length; j++ ) {
                    result += '<div>'+stats.sessions[i].speakers[j].name+' : '+stats.sessions[i].speakers[j].hours+'h</div>';                
                }
                result += '</div>';
            }
            
            stats_session = false;
        }    
    }

    result += '</div>';

    for( let i=0; i<schedule.stats.length; i++ ) {
        result += '<div style="margin-left:26px;">';

        result += '<h4 style="background:gray;border-radius:5px;margin:7px;padding:3px;'+
            'text-align:center;width:260px;">'+schedule.stats[i].name+' : '+sub_total[i].hours+'h</h4>';

        let stats_session = false;

        for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
            for( let k=0; k<schedule.stats[i].sub_group.length; k++ ) {
                for( let m=0; m<schedule.stats[i].sub_group[k].sessions.length; m++ ) {
                    if( schedule.stats[i].sessions[j] === schedule.stats[i].sub_group[k].sessions[m] ) {
                        stats_session = true;
                    }
                }
            }
    
            if( ! stats_session ) {
                for( let k=0; k<stats.sessions.length; k++ ) {
                    if( stats.sessions[k].name === schedule.stats[i].sessions[j] ) {
                        result += '<div>'+stats.sessions[k].name+' : '+stats.sessions[k].hours+'h</div>';

                        result += '<div>';
                        result += '<input type="button" id="stats_session_'+k+
                            '_show" value="Afficher détails" style="padding:3px;width:120px">';
                        result += '<input type="button" id="stats_session_'+k+
                            '_unshow" value="Masquer détails" style="padding:3px;display:none;width:120px;">';
                        result += '</div>';

                        result += '<div id="stats_session_'+k+
                                '_details" style="color:blue;display:none;margin-bottom:7px;">';
                        for( let m=0; m<stats.sessions[k].speakers.length; m++ ) {
                            result += '<div>'+stats.sessions[k].speakers[m].name+' : '+stats.sessions[k].speakers[m].hours+'h</div>';                
                        }
                        result += '</div>';
                    }
                }  
            }
    
            stats_session = false;
        }

        for( let j=0; j<schedule.stats[i].sub_group.length; j++ ) {
            result += '<div style="margin-left:30px;">';
            result += '<h4 style="background:darkgray;border-radius:5px;margin:7px;padding:3px;'+
                'text-align:center;width:230px;">'+schedule.stats[i].sub_group[j].name+' : '+sub_total[i].sub_hours[j]+'h</h4>';
            
            for( let k=0; k<stats.sessions.length; k++ ) {
                for( let m=0; m<schedule.stats[i].sub_group[j].sessions.length; m++ ) {
                    if( stats.sessions[k].name === schedule.stats[i].sub_group[j].sessions[m] ) {
                        result += '<div>'+stats.sessions[k].name+' : '+stats.sessions[k].hours+'h</div>';
    
                        result += '<div>';
                        result += '<input type="button" id="stats_session_'+k+
                            '_show" value="Afficher détails" style="padding:3px;width:120px">';
                        result += '<input type="button" id="stats_session_'+k+
                            '_unshow" value="Masquer détails" style="padding:3px;display:none;width:120px;">';
                        result += '</div>';
    
                        result += '<div  id="stats_session_'+k+
                                '_details" style="color:blue;display:none;margin-bottom:7px;">';
                        for( let m=0; m<stats.sessions[k].speakers.length; m++ ) {
                            result += '<div>'+stats.sessions[k].speakers[m].name+' : '+stats.sessions[k].speakers[m].hours+'h</div>';                
                        }
                        result += '</div>';
                    }
                }
            }

            result += '</div>';    
        }
        
        result += '</div>';
    }

    result += '</div>';

    result += '<div style="flex-basis:15%;"><h3>Intervenants :</h3>';
    for( let i=0; i<stats.speakers.length; i++ ) {
        result += '<div>'+stats.speakers[i].name+' : '+stats.speakers[i].hours+'h</div>';
        result += '<input type="button" id="stats_speaker_'+i+'_show" value="Afficher détails" style="padding:3px;width:120px">';
        result += '<input type="button" id="stats_speaker_'+i+'_unshow" value="Masquer détails" style="padding:3px;display:none;width:120px;">';
        
        result += '<div  id="stats_speaker_'+i+'_details" style="color:blue;display:none;margin-bottom:7px;">';
            for( let j=0; j<stats.speakers[i].sessions.length; j++ ) {
                result += '<div>'+stats.speakers[i].sessions[j].name+' : '+stats.speakers[i].sessions[j].hours+'h</div>';                
            }
        result += '</div>';

    }
    result += '</div>';

    result += '<div style="flex-basis:30%;"><h3>Options Activités :</h3>';
    result += '<div style="margin-top:7px;">';
    result += '<input type=text id="stats_session_group_name" placeholder="Nom"'+
        ' style="border:1px solid gray;border-radius:5px;padding:3px;width:120px">';
    result += '<input type="button" id="stats_session_group_add" value="Ajouter groupe" style="padding:3px;width:120px"><br>';

    for( let i=0; i<stats.sessions.length; i++ ) {
        if( stats.sessions[i].hours !== 0 ) {
            let stats_session = false;

            for( let j=0; j<schedule.stats.length; j++ ) {
                for( let k=0; k<schedule.stats[j].sessions.length; k++ ) {
                    if( schedule.stats[j].sessions[k] === stats.sessions[i].name ) {
                        stats_session = true;
                    }
                }
            }

            if( ! stats_session ) {
                result += '<input type="checkbox" id="stats_session_'+i+'">'+stats.sessions[i].name+'<br>';
            }
            
            stats_session = false;
        }    
    }
    result += '</div>';

    for( let i=0; i<schedule.stats.length; i++ ) {
        result += '<div style="margin-left:26px;">';

        result += '<h4 style="background:gray;border-radius:5px;margin:7px;padding:3px;'+
            'text-align:center;width:260px;">'+schedule.stats[i].name+'</h4>';
        result += '<input type=text id="stats_session_group_name_'+i+
            '" placeholder="Nom" style="border:1px solid gray;border-radius:5px;padding:3px;width:120px">';
        result += '<input type="button" id="stats_session_group_add_'+i+
            '" value="Ajouter ss-groupe" style="padding:3px;width:120px"><br>';

        let stats_session = false;

        for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
            for( let k=0; k<schedule.stats[i].sub_group.length; k++ ) {
                for( let m=0; m<schedule.stats[i].sub_group[k].sessions.length; m++ ) {
                    if( schedule.stats[i].sessions[j] === schedule.stats[i].sub_group[k].sessions[m] ) {
                        stats_session = true;
                    }
                }
            }
    
            if( ! stats_session ) {
                result += '<input type="checkbox" id="stats_session_'+i+'_'+j+'">'
                    +schedule.stats[i].sessions[j]+'<br>';  
            }
    
            stats_session = false;
        }
    
        result += '<input type="button" id="stats_session_group_delete_'+i+
            '" value="Retirer" style="margin-top:7px;padding:3px;width:120px">';
        result += '<input type="button" id="stats_session_group_destroy_'+i+
            '" value="Suppr. groupe" style="margin-top:7px;padding:3px;width:120px">';

        for( let j=0; j<schedule.stats[i].sub_group.length; j++ ) {
            result += '<div style="margin-left:30px;">';
            result += '<h4 style="background:darkgray;border-radius:5px;margin:7px;padding:3px;'+
                'text-align:center;width:230px;">'+schedule.stats[i].sub_group[j].name+'</h4>';
            
            for( let k=0; k<schedule.stats[i].sub_group[j].sessions.length; k++ ) {
                result += '<input type="checkbox" id="stats_session_'+i+'_'+j+'_'+k+'">'
                    +schedule.stats[i].sub_group[j].sessions[k]+'<br>';
            }
            result += '<input type="button" id="stats_session_group_delete_'+i+'_'+j+
                    '" value="Retirer" style="margin-top:7px;padding:3px;width:120px">';
                result += '<input type="button" id="stats_session_group_destroy_'+i+'_'+j+
                    '" value="Suppr. ss-groupe" style="margin-top:7px;padding:3px;width:120px">';        
            result += '</div>';    
        }
        
        result += '</div>';
    }

    result += '</div>';

    result += '<div style="flex-basis:25%;"><h3>Options Intervenants :</h3>';

    for( let i=0; i<stats.sessions.length; i++ ) {
        if( schedule.stats_remove.includes( stats.sessions[i].name ) ) {
            result += '<input type="checkbox" id="stats_remove_'+i+'" checked="checked">'+stats.sessions[i].name+'<br>';    
        }
        else {
            result += '<input type="checkbox" id="stats_remove_'+i+'">'+stats.sessions[i].name+'<br>';
        } 
    }
    result += '<input type="button" id="stats_remove" value="Retirer du total par intervenants" style="padding:3px;width:200px"><br>';

    result += '</div>'

    result += '</div>';

    $to_copy.innerText = JSON.stringify(schedule);

    $stats_content.innerHTML = result;
    setEventListenerStats( stats );
    setEventListenerStatsOptions( stats );
    setEventListenerStatsRemove( stats );
}

function setEventListenerInfoDay( count ) {
    for( let i=1; i<= count; i++ ) {
        const $schedule_day_i = document.getElementById( 'schedule_day_'+i );

        $schedule_day_i.addEventListener( 'click', function() {

            let margin_info_content = Math.max( 13,  window.scrollY - $main.offsetTop + 13 );

            $info_content.innerHTML = setInfoContent( i, margin_info_content );

            const
                $schedule_day_edit_i = document.getElementById( 's'+i+'_edit' ),
                $schedule_group_1_i = document.getElementById( 's'+i+'_1_group' ),
                $schedule_group_1_details_i = document.getElementById( 's'+i+'_1_group_details' ),
                $schedule_group_2_i = document.getElementById( 's'+i+'_2_group' ),
                $schedule_group_2_details_i = document.getElementById( 's'+i+'_2_group_details' );


            $schedule_group_1_i.addEventListener( 'click', function() {
                $schedule_group_1_details_i.style.display = 'block';
            });

            $schedule_group_2_i.addEventListener( 'click', function() {
                $schedule_group_2_details_i.style.display = 'block';
            });
       
            $schedule_day_edit_i.addEventListener( 'click', function() {
                const
                    $add_on_1 = document.getElementById( 'add_on_1' ),
                    $add_on_2 = document.getElementById( 'add_on_2' ),
                    $add_on_group_1 = document.getElementById( 'add_on_group_1' ),
                    $add_on_group_2 = document.getElementById( 'add_on_group_2' ),
                    $s1_hour = document.getElementById( 's1_hour' ),
                    $s2_hour = document.getElementById( 's2_hour' ),
                    $s1_min = document.getElementById( 's1_min' ),
                    $s2_min = document.getElementById( 's2_min' ),
                    $special_day = document.getElementById( 'special_day' );

                let
                    add_on_1 = $add_on_1.value,
                    add_on_2 = $add_on_2.value,
                    add_on_group_1 = $add_on_group_1.value,
                    add_on_group_2 = $add_on_group_2.value,
                    dayInfo = [],
                    session_duration_1 = parseInt($s1_hour.value) + parseFloat($s1_min.value),
                    session_duration_2 = parseInt($s2_hour.value) + parseFloat($s2_min.value),
                    session_1 = '',
                    session_2 = '',
                    speaker1_1 = '',
                    speaker2_1 = '',
                    speaker1_2 = '',
                    speaker2_2 = '',
                    special_day = $special_day.value; 
                
                if( schedule.sessions.length > 0 ) {
                    const
                        $s1_session = document.getElementById( 's1_session' ),
                        $s1_session_group = document.getElementById( 's1_session_group' ),
                        $s2_session = document.getElementById( 's2_session' ),
                        $s2_session_group = document.getElementById( 's2_session_group' );

                    session_1 = $s1_session.value;
                    session_1_group = $s1_session_group.value;
                    session_2 = $s2_session.value;     
                    session_2_group = $s2_session_group.value;     
                }
                
                if( schedule.speakers.length > 0 ) {
                    const
                        $s1_speaker1 = document.getElementById( 's1_speaker1' ),
                        $s1_speaker1_group = document.getElementById( 's1_speaker1_group' ),
                        $s2_speaker1 = document.getElementById( 's2_speaker1' ),
                        $s2_speaker1_group = document.getElementById( 's2_speaker1_group' ),
                        $s1_speaker2 = document.getElementById( 's1_speaker2' ),
                        $s1_speaker2_group = document.getElementById( 's1_speaker2_group' ),
                        $s2_speaker2 = document.getElementById( 's2_speaker2' ); 
                        $s2_speaker2_group = document.getElementById( 's2_speaker2_group' ); 
                    
                    speaker1_1 = $s1_speaker1.value;
                    speaker1_1_group = $s1_speaker1_group.value;
                    speaker2_1 = $s1_speaker2.value;
                    speaker2_1_group = $s1_speaker2_group.value;
                    speaker1_2 = $s2_speaker1.value;
                    speaker1_2_group = $s2_speaker1_group.value;
                    speaker2_2 = $s2_speaker2.value;   
                    speaker2_2_group = $s2_speaker2_group.value;   
                }

                if( special_day === '' ) {

                    if( session_duration_1 !== 0 && session_1 !== '' ) {
                        dayInfo.push(
                            new SessionItem(
                                schedule.sessions[ session_1 ],
                                [ schedule.speakers[ speaker1_1 ], schedule.speakers[ speaker2_1 ] ],
                                session_duration_1
                            )
                        );

                        let group_exist = false;

                        for( let j=0; j<schedule.group.length; j++ ) {
                            if( schedule.group[j].day === i && schedule.group[j].sessionItem === 1 ) {
                                group_exist = true;

                                if( session_1_group === '' ) {
                                    schedule.deleteGroup( j );
                                }
                                else {
                                    schedule.editGroup( schedule.sessions[ session_1_group ],
                                        [ schedule.speakers[ speaker1_1_group ], schedule.speakers[ speaker2_1_group ] ], j );
                                }
                            }
                        }

                        if( ! group_exist ) {
                            if( session_1_group !== '' ) {
                                schedule.addGroup( i, 1, schedule.sessions[ session_1_group ],
                                                [ schedule.speakers[ speaker1_1_group ], schedule.speakers[ speaker2_1_group ] ],
                                                session_duration_1  );
                            }
                        }

                        group_exist = false;
                        
                        let
                            add_on_exist = false,
                            add_on_group_exist = false;

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 1  ) {
                                    add_on_exist = true;

                                    if( add_on_1 === '' ) {
                                        schedule.deleteAddOn( j );
                                    }
                                    else {
                                        schedule.editAddOn( add_on_1, j );
                                    }                   
                            }
                        }

                        if( ! add_on_exist ) {
                            if( add_on_1 !== '' ) {
                                schedule.addAddOn( i, 1, 1, add_on_1 );
                            }
                        }

                        add_on_exist = false;

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 2 ) {
                                    add_on_group_exist = true;

                                    if( add_on_group_1 === '' ) {
                                        schedule.deleteAddOn( j );
                                    }
                                    else {
                                        schedule.editAddOn( add_on_group_1, j );
                                    }
                            }
                        }

                        if( ! add_on_group_exist ) {
                            if( add_on_group_1 !== '' ) {
                                schedule.addAddOn( i, 1, 2, add_on_group_1 );
                            }
                        }

                        add_on_group_exist = false;
                        
                        
                        if( session_duration_2 !== 0 && session_2 !== '' ) {
                            dayInfo.push(
                                new SessionItem(
                                    schedule.sessions[ session_2 ],
                                    [ schedule.speakers[ speaker1_2 ], schedule.speakers[ speaker2_2 ] ],
                                    session_duration_2
                                )        
                            );

                            let group_exist = false;

                            for( let j=0; j<schedule.group.length; j++ ) {
                                if( schedule.group[j].day === i && schedule.group[j].sessionItem === 2 ) {
                                    group_exist = true;

                                    if( session_2_group === '' ) {
                                        schedule.deleteGroup( j );
                                    }
                                    else {
                                        schedule.editGroup( schedule.sessions[ session_2_group ],
                                            [ schedule.speakers[ speaker1_2_group ], schedule.speakers[ speaker2_2_group ] ], j );
                                    }
                                }
                            }

                            if( ! group_exist ) {
                                if( session_2_group !== '' ) {
                                    schedule.addGroup( i, 2, schedule.sessions[ session_2_group ],
                                                [ schedule.speakers[ speaker1_2_group ], schedule.speakers[ speaker2_2_group ] ],
                                                session_duration_2  );
                                }
                            }

                            group_exist = false;

                            let
                                add_on_exist = false,
                                add_on_group_exist = false;

                            for( let j=0; j<schedule.add_on.length; j++ ) {
                                if( schedule.add_on[j].day === i
                                    && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 1  ) {
                                        add_on_exist = true;
    
                                        if( add_on_2 === '' ) {
                                            schedule.deleteAddOn( j );
                                        }
                                        else {
                                            schedule.editAddOn( add_on_2, j );
                                        }                   
                                }
                            }
    
                            if( ! add_on_exist ) {
                                if( add_on_2 !== '' ) {
                                    schedule.addAddOn( i, 2, 1, add_on_2 );
                                }
                            }
    
                            add_on_exist = false;
    
                            for( let j=0; j<schedule.add_on.length; j++ ) {
                                if( schedule.add_on[j].day === i
                                    && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 2 ) {
                                        add_on_group_exist = true;
    
                                        if( add_on_group_2 === '' ) {
                                            schedule.deleteAddOn( j );
                                        }
                                        else {
                                            schedule.editAddOn( add_on_group_2, j );
                                        }
                                }
                            }
    
                            if( ! add_on_group_exist ) {
                                if( add_on_group_2 !== '' ) {
                                    schedule.addAddOn( i, 2, 2, add_on_group_2 );
                                }
                            }
    
                            add_on_group_exist = false;

                        }
                        else {

                            for( let j=0; j<schedule.group.length; j++) {
                                if( schedule.group[j].day === i && schedule.group[j].sessionItem === 2 ) {
                                    schedule.deleteGroup( j );
                                }
                            }

                            for( let j=0; j<schedule.add_on.length; j++ ) {
                                if( schedule.add_on[j].day === i
                                    && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 1  ) {
                                        schedule.deleteAddOn( j );
                                }
                            }

                            for( let j=0; j<schedule.add_on.length; j++ ) {
                                if( schedule.add_on[j].day === i
                                    && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 2  ) {
                                        schedule.deleteAddOn( j );
                                }
                            }
                        }
                        
                    }
                    else {
                        for( let j=0; j<schedule.group.length; j++) {
                            if( schedule.group[j].day === i && schedule.group[j].sessionItem === 1 ) {
                                schedule.deleteGroup( j );
                            }
                        }

                        for( let j=0; j<schedule.group.length; j++) {
                            if( schedule.group[j].day === i && schedule.group[j].sessionItem === 2 ) {
                                schedule.deleteGroup( j );
                            }
                        }

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 1 ) {
                                    schedule.deleteAddOn( j );
                            }
                        }

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 2 ) {
                                    schedule.deleteAddOn( j );
                            }
                        }

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 1 ) {
                                    schedule.deleteAddOn( j );
                            }
                        }

                        for( let j=0; j<schedule.add_on.length; j++ ) {
                            if( schedule.add_on[j].day === i
                                && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 2 ) {
                                    schedule.deleteAddOn( j );
                            }
                        }
                    }
                }
                else {
                    dayInfo.push( new SessionItem( special_sessions[special_day], [], 0 ) );

                    for( let j=0; j<schedule.group.length; j++) {
                        if( schedule.group[j].day === i && schedule.group[j].sessionItem === 1 ) {
                            schedule.deleteGroup( j );
                        }
                    }

                    for( let j=0; j<schedule.group.length; j++) {
                        if( schedule.group[j].day === i && schedule.group[j].sessionItem === 2 ) {
                            schedule.deleteGroup( j );
                        }
                    }

                    for( let j=0; j<schedule.add_on.length; j++ ) {
                        if( schedule.add_on[j].day === i
                            && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 1 ) {
                                schedule.deleteAddOn( j );
                        }
                    }

                    for( let j=0; j<schedule.add_on.length; j++ ) {
                        if( schedule.add_on[j].day === i
                            && schedule.add_on[j].sessionItem === 1 && schedule.add_on[j].sessionGroup === 2 ) {
                                schedule.deleteAddOn( j );
                        }
                    }

                    for( let j=0; j<schedule.add_on.length; j++ ) {
                        if( schedule.add_on[j].day === i
                            && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 1 ) {
                                schedule.deleteAddOn( j );
                        }
                    }

                    for( let j=0; j<schedule.add_on.length; j++ ) {
                        if( schedule.add_on[j].day === i
                            && schedule.add_on[j].sessionItem === 2 && schedule.add_on[j].sessionGroup === 2 ) {
                                schedule.deleteAddOn( j );
                        }
                    }
                }

                dayInfo = new DayInfo( dayInfo, 'schedule_day_'+i )
            
                schedule.addDayInfo( dayInfo, i );

                $info_content.innerHTML = '';

                updateHtmlSchedule();
                updateHtmlStats();
            });
        });
    }
}

function setEventListenerStats( stats ) {
    for( let i=0; i<stats.sessions.length; i++ ) {
        if( stats.sessions[i].hours !== 0 ) {
            const
                $stats_session_i_show = document.getElementById( 'stats_session_'+i+'_show' ),
                $stats_session_i_unshow = document.getElementById( 'stats_session_'+i+'_unshow' ),
                $stats_session_i_details = document.getElementById( 'stats_session_'+i+'_details' );

            $stats_session_i_show.addEventListener( 'click', function() {
                $stats_session_i_details.style.display = 'block';
                $stats_session_i_show.style.display = 'none';
                $stats_session_i_unshow.style.display = 'inline';
            });

            $stats_session_i_unshow.addEventListener( 'click', function() {
                $stats_session_i_details.style.display = 'none';
                $stats_session_i_unshow.style.display = 'none';
                $stats_session_i_show.style.display = 'inline';
            });

        }   
    }
    
    for( let i=0; i<stats.speakers.length; i++ ) {
        if( stats.speakers[i].hours !== 0 ) {
            const
                $stats_speaker_i_show = document.getElementById( 'stats_speaker_'+i+'_show' ),
                $stats_speaker_i_unshow = document.getElementById( 'stats_speaker_'+i+'_unshow' ),
                $stats_speaker_i_details = document.getElementById( 'stats_speaker_'+i+'_details' );

            $stats_speaker_i_show.addEventListener( 'click', function() {
                $stats_speaker_i_details.style.display = 'block';
                $stats_speaker_i_show.style.display = 'none';
                $stats_speaker_i_unshow.style.display = 'inline';
            });

            $stats_speaker_i_unshow.addEventListener( 'click', function() {
                $stats_speaker_i_details.style.display = 'none';
                $stats_speaker_i_unshow.style.display = 'none';
                $stats_speaker_i_show.style.display = 'inline';
            });

        }   
    }
}

function setEventListenerStatsOptions( stats ) {
    const
        $stats_session_group_add = document.getElementById( 'stats_session_group_add' ),
        $stats_session_group_name = document.getElementById( 'stats_session_group_name' );

    $stats_session_group_add.addEventListener( 'click', function() {
        let sessions_checked = [];

        for( let i=0; i<stats.sessions.length; i++ ) {
            if( stats.sessions[i].hours !== 0 ) {
                let stats_session = false;

                for( let j=0; j<schedule.stats.length; j++ ) {
                    for( let k=0; k<schedule.stats[j].sessions.length; k++ ) {
                        if( schedule.stats[j].sessions[k] === stats.sessions[i].name ) {
                            stats_session = true;
                        }
                    }
                }

                if( ! stats_session ) {
                    const $stats_session_i = document.getElementById( 'stats_session_'+i );

                    if( $stats_session_i.checked === true ) {
                        sessions_checked.push( stats.sessions[i].name );
                    }
                }
            
                stats_session = false;
            }
        }

        schedule.stats.push( {
            'name' : $stats_session_group_name.value,
            'sessions' : sessions_checked,
            'sub_group' : []
        } );

        updateHtmlStats();
    });
    
    for( let i=0;i<schedule.stats.length; i++ ) {
        const
            $stats_session_group_add_i = document.getElementById( 'stats_session_group_add_'+i ),    
            $stats_session_group_delete_i = document.getElementById( 'stats_session_group_delete_'+i ),    
            $stats_session_group_destroy_i = document.getElementById( 'stats_session_group_destroy_'+i ),    
            $stats_session_group_name_i = document.getElementById( 'stats_session_group_name_'+i );

        $stats_session_group_add_i.addEventListener( 'click', function() {
            let
                sessions_checked = [],
                stats_session = false;

            for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
                for( let k=0; k<schedule.stats[i].sub_group.length; k++ ) {
                    for( let m=0; m<schedule.stats[i].sub_group[k].sessions.length; m++ ) {
                        if( schedule.stats[i].sessions[j] === schedule.stats[i].sub_group[k].sessions[m] ) {
                            stats_session = true;
                        }
                    }
                }

                if( ! stats_session ) {
                    const $stats_session_i_j = document.getElementById( 'stats_session_'+i+'_'+j );
    
                    if( $stats_session_i_j.checked === true ) {
                        sessions_checked.push( schedule.stats[i].sessions[j] );
                    }
                }
            
                stats_session = false;
            }

            schedule.stats[i].sub_group.push( {
                'name' : $stats_session_group_name_i.value,
                'sessions' : sessions_checked
            } );

            updateHtmlStats();            
        });

        $stats_session_group_delete_i.addEventListener( 'click', function() {
            let
                stats_session = false,
                to_delete = [],
                result = [];

            for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
                for( let k=0; k<schedule.stats[i].sub_group.length; k++ ) {
                    for( let m=0; m<schedule.stats[i].sub_group[k].sessions.length; m++ ) {
                        if( schedule.stats[i].sessions[j] === schedule.stats[i].sub_group[k].sessions[m] ) {
                            stats_session = true;
                        }
                    }
                }

                if( ! stats_session ) {
                    const $stats_session_i_j = document.getElementById( 'stats_session_'+i+'_'+j );

                    if( $stats_session_i_j.checked === true ) {
                        to_delete.push( j );
                    }
                }

                stats_session = false;
            }

            for( let j=0; j<schedule.stats[i].sessions.length; j++ ) {
                if( ! to_delete.includes( j ) ) {
                    result.push( schedule.stats[i].sessions[j] );   
                }
            }

            schedule.stats[i].sessions = result;
            
            updateHtmlStats();
        });

        $stats_session_group_destroy_i.addEventListener( 'click', function() {
            schedule.stats.splice( i, 1 );

            updateHtmlStats();
        });

        for( let j=0; j<schedule.stats[i].sub_group.length; j++ ) {
            const
                $stats_session_group_delete_i_j = document.getElementById( 'stats_session_group_delete_'+i+'_'+j ),    
                $stats_session_group_destroy_i_j = document.getElementById( 'stats_session_group_destroy_'+i+'_'+j );
                
            $stats_session_group_delete_i_j.addEventListener( 'click', function() {
                let
                    to_delete = [],
                    result = [];

                for( let k=0; k<schedule.stats[i].sub_group[j].sessions.length; k++ ) {
                    const $stats_session_i_j_k = document.getElementById( 'stats_session_'+i+'_'+j+'_'+k );

                    if( $stats_session_i_j_k.checked === true ) {
                            to_delete.push( k );
                    }
                }

                for( let k=0; k<schedule.stats[i].sub_group[j].sessions.length; k++ ) {
                    if( ! to_delete.includes( k ) ) {
                        result.push( schedule.stats[i].sub_group[j].sessions[k] );   
                    }    
                }
            
                schedule.stats[i].sub_group[j].sessions = result;
                
                updateHtmlStats();
            });

            $stats_session_group_destroy_i_j.addEventListener( 'click', function() {
                schedule.stats[i].sub_group.splice( j, 1 );

                updateHtmlStats();
            });
        }
    
    }
}

function setEventListenerStatsRemove( stats ) {
    const $stats_remove = document.getElementById( 'stats_remove' );
    
    $stats_remove.addEventListener( 'click', function() {
        schedule.stats_remove = [];

        for( let i=0; i<stats.sessions.length; i++ ) {
            const $stats_remove_i = document.getElementById( 'stats_remove_'+i );

            if( $stats_remove_i.checked === true ) {
                schedule.stats_remove.push( stats.sessions[i].name );
            }
        }

        updateHtmlStats();
    });
}

function setInfoContent( schedule_day, margin_top ) {
    let
        date = findDay( schedule_day ),
        result = '';

    result += '<hr style="margin-top:'+margin_top+'px">';
    result += '<h4 style="text-align:center;">' + date.day + ' ' + date.date + '/' + date.month + '</h4><hr>';

    for( let i=1; i<3; i++) {
        result += 'Créneau '+i+' :<br>';
        result += '<select id="s'+i+'_hour">';

        if( schedule.daysInfo[ schedule_day ] !== undefined
            && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ] !== undefined ) {
                
                result += isSelected( '<option value="0"', '>0h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 0 );
                result += isSelected( '<option value="1"', '>1h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 1 );
                result += isSelected( '<option value="2"', '>2h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 2 );
                result += isSelected( '<option value="3"', '>3h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 3 );
                result += isSelected( '<option value="4"', '>4h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 4 );
                result += isSelected( '<option value="5"', '>5h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 5 );
                result += isSelected( '<option value="6"', '>6h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 6 );
                result += isSelected( '<option value="7"', '>7h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 7 );
                result += isSelected( '<option value="8"', '>8h</option>',
                    Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 8 );

                result += '</select>';
                result += '<select id="s'+i+'_min">';
                
                result += isSelected( '<option value="0"', '>0min</option>',
                    schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration.toFixed(2) - Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 0 );
                result += isSelected( '<option value="0.25"', '>15min</option>',
                    schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration.toFixed(2) - Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 0.25 );
                result += isSelected( '<option value="0.5"', '>30min</option>',
                    schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration.toFixed(2) - Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 0.5 );
                result += isSelected( '<option value="0.75"', '>45min</option>',
                    schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration.toFixed(2) - Math.trunc( schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].duration ), 0.75 );
        }
        else {
            result += '<option value="0">0h</option>';
            result += '<option value="1">1h</option>';
            result += '<option value="2">2h</option>';
            result += '<option value="3">3h</option>';
            result += '<option value="4">4h</option>';
            result += '<option value="5">5h</option>';
            result += '<option value="6">6h</option>';
            result += '<option value="7">7h</option>';
            result += '<option value="8">8h</option>';
            result += '</select>';
            result += '<select id="s'+i+'_min">';
            result += '<option value="0">0min</option>';
            result += '<option value="0.25">15min</option>';
            result += '<option value="0.5">30min</option>';
            result += '<option value="0.75">45min</option>';
        }

        result += '</select><br>';
        
        if( schedule.sessions.length > 0 ) {
            result += '<select id="s'+i+'_session">';
            result += '<option value="">Cours</option>'
            for( let j=0; j<schedule.sessions.length; j++ ) {
                if( schedule.daysInfo[ schedule_day ] !== undefined
                    && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ] !== undefined ) {
                    
                    result += '<option value="' + j + '"' + isSelected( '', '>',
                    schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].session.name, schedule.sessions[j].name );
                    result += schedule.sessions[j].alias+'</option>';
                }
                else {
                    result += '<option value="'+j+'">'+schedule.sessions[j].alias+'</option>';
                }
            }
            result += '</select>';
        }

        if( schedule.speakers.length > 0 ) {
            result += '<select id="s'+i+'_speaker1">';
            result += '<option value="">Int 1</option>';

            for( let j=0; j<schedule.speakers.length; j++ ) {
                if( schedule.daysInfo[ schedule_day ] !== undefined
                    && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ] !== undefined
                    && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].speakers[0] !== undefined ) {
                    
                    result += '<option value="' + j + '"' + isSelected( '', '>',
                        schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].speakers[0].name, schedule.speakers[j].name );
                    result += schedule.speakers[j].alias+'</option>';
                }
                else {
                    result += '<option value="'+j+'">'+schedule.speakers[j].alias+'</option>';
                }
            }

            result += '</select>';
            result += '<select id="s'+i+'_speaker2">';
            result += '<option value="">Int 2</option>';

            for( let j=0; j<schedule.speakers.length; j++ ) {
                if( schedule.daysInfo[ schedule_day ] !== undefined
                    && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ] !== undefined
                    && schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].speakers[1] !== undefined ) {
                    
                    result += '<option value="' + j + '"' + isSelected( '', '>',
                        schedule.daysInfo[ schedule_day ].sessionItems[ i - 1 ].speakers[1].name, schedule.speakers[j].name );
                    result += schedule.speakers[j].alias+'</option>';
                }
                else {
                    result += '<option value="'+j+'">'+schedule.speakers[j].alias+'</option>';
                }
            }

            result += '</select><br>';
        }

        let value_add_on = '';

        for( let j=0; j<schedule.add_on.length; j++ ) {
            if( schedule.add_on[j].day === schedule_day
                && schedule.add_on[j].sessionItem === i && schedule.add_on[j].sessionGroup ===  1 ) {
                    value_add_on = schedule.add_on[j].value;
                }
        }

        result += '<div style="margin-top:13px;">';
        result += '<input type="text" id="add_on_'+i+
            '" placeholder="Mention" style="border:1px solid gray;border-radius:5px;padding:3px;width:200px"'+
            'value="'+value_add_on+'">';
        result += '</div>';

        result += '<div style="display:flex;justify-content:center;margin-bottom:0;margin-top:13px;">';
        result += '<input type="button" id="s'+schedule_day+'_'+i+'_group" value="Séparer en demi-groupes" style="padding:3px;width:200px">';
        result += '</div>';  

        result += '<div  id="s'+schedule_day+'_'+i+'_group_details" style="display:none;">';
        if( schedule.sessions.length > 0 ) {
            result += '<select id="s'+i+'_session_group">';
            result += '<option value="">Cours</option>'
            for( let j=0; j<schedule.sessions.length; j++ ) {
                let selected = false;

                for( let k=0; k<schedule.group.length; k++ ) {
                    if( schedule.group[k].sessionItem === i
                        && schedule.group[k].day === schedule_day
                        && schedule.group[k].session.name === schedule.sessions[j].name ) {
                            selected = true;
                        }
                }

                if( selected ) {
                    result += '<option value="'+j+'" selected>'+schedule.sessions[j].alias+'</option>';  
                }
                else {
                    result += '<option value="'+j+'">'+schedule.sessions[j].alias+'</option>';
                }
            }
            result += '</select>';
        }

        if( schedule.speakers.length > 0 ) {
            result += '<select id="s'+i+'_speaker1_group">';
            result += '<option value="">Int 1</option>';

            for( let j=0; j<schedule.speakers.length; j++ ) {
                let selected = false;

                for( let k=0; k<schedule.group.length; k++ ) {
                    if( schedule.group[k].sessionItem === i
                        && schedule.group[k].day === schedule_day
                        && schedule.group[k].speakers[0] !== undefined
                        && schedule.group[k].speakers[0].name === schedule.speakers[j].name ) {
                            selected = true;
                        }    
                }

                if( selected ) {
                    result += '<option value="'+j+'" selected>'+schedule.speakers[j].alias+'</option>';
                }
                else {
                    result += '<option value="'+j+'">'+schedule.speakers[j].alias+'</option>';
                }
            }

            result += '</select>';
            result += '<select id="s'+i+'_speaker2_group">';
            result += '<option value="">Int 2</option>';

            for( let j=0; j<schedule.speakers.length; j++ ) {
                let selected = false;

                for( let k=0; k<schedule.group.length; k++ ) {
                    if( schedule.group[k].sessionItem === i
                        && schedule.group[k].day === schedule_day
                        && schedule.group[k].speakers[1] !== undefined
                        && schedule.group[k].speakers[1].name === schedule.speakers[j].name ) {
                            selected = true;
                        }    
                }

                if( selected ) {
                    result += '<option value="'+j+'" selected>'+schedule.speakers[j].alias+'</option>';
                }
                else {
                    result += '<option value="'+j+'">'+schedule.speakers[j].alias+'</option>';
                }
            }

            result += '</select>';
        }

        let value_add_on_group = '';

        for( let j=0; j<schedule.add_on.length; j++ ) {
            if( schedule.add_on[j].day === schedule_day
                && schedule.add_on[j].sessionItem === i && schedule.add_on[j].sessionGroup ===  2 ) {
                    value_add_on_group = schedule.add_on[j].value;
                }
        }

        result += '<div style="margin-top:13px;">';
        result += '<input type="text" id="add_on_group_'+i+
            '" placeholder="Mention" style="border:1px solid gray;border-radius:5px;padding:3px;width:200px"'+
            'value="'+value_add_on_group+'">';
        result += '</div>';

        result += '</div>';

        result += '<hr>';
    }

    result += 'Fermeture :'
    result += '<select id="special_day">';
    result += '<option value=""></option>';
    result += '<option value="holy">Férié</option>';
    result += '<option value="vacation">Vacances</option>';
    result += '<option value="closed">Fermé</option>';
    result += '</select><br><hr>'; 

    result += '<input type="button" id="s'+schedule_day+'_edit" value="Modifier">';

    return result;
}

function setInfoDay( day ) {
    let
        height = '100%',
        result = '';
        
    if( day.sessionItems.length === 0 ) {
        return result;   
    }

    if( day.sessionItems.length === 2 ) {
        height = '50%';
    }

    if( day.sessionItems[0].session !== undefined ) {
        result += '<div style="background:'+day.sessionItems[0].session.color+
            ';border:1px solid white;font-weight:700;height:'+height+
            ';position:relative;text-align:center;z-index:1;">';

        result += '<div style="position:relative;z-index:2;">';    
        result += day.sessionItems[0].session.alias +'<br>';
        
        
        if( day.sessionItems[0].speakers[0] !== undefined ) {
            result += day.sessionItems[0].speakers[0].alias;
        }
        
        if( day.sessionItems[0].speakers[1] !== undefined ) {
            result += ' - ' + day.sessionItems[0].speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 1 ) {
                    result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                        'position:absolute;z-index:1;font-size:20px;'+
                        'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                    result += schedule.add_on[i].value;
                    result += '</div>';
                }
        }

        result += '</div>';
    }
    else {
        return result;
    }

    if( day.sessionItems.length === 2 ) {
        if( day.sessionItems[1].session !== undefined ) {
            result += '<div style="background:'+day.sessionItems[1].session.color+
                ';border:1px solid white;font-weight:700;height:'+height+
                ';position:relative;text-align:center;z-index:1;">';

            result += '<div style="position:relative;z-index:2;">';
            result += day.sessionItems[1].session.alias +'<br>';
        
            if( day.sessionItems[1].speakers[0] !== undefined ) {
                result += day.sessionItems[1].speakers[0].alias;
            }
        
            if( day.sessionItems[1].speakers[1] !== undefined ) {
                result += ' - ' + day.sessionItems[1].speakers[1].alias;
            }
            result += '</div>';

            for( let i=0; i<schedule.add_on.length; i++ ) {
                if( 'schedule_day_'+schedule.add_on[i].day === day.id
                    && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 1 ) {
                    result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                        'position:absolute;z-index:1;font-size:20px;'+
                        'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                    result += schedule.add_on[i].value;
                    result += '</div>';
                }
            }

            result += '</div>';
        }
        else {
            return result;    
        }   
    }

    return result;
}

function updateByGroup( day, group ) {
    let
        height = '100%',
        result = '';
        
    if( day.sessionItems.length === 0 ) {
        return result;   
    }

    if( day.sessionItems.length === 2 ) {
        height = '50%';
    }

    if( group.sessionItem === 1 ) {

        result += '<div style="display:flex;height:'+height+';">';

        result += '<div style="background:'+day.sessionItems[0].session.color+
                ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';
        
        result += '<div style="position:relative;z-index:2;">';        
        result += day.sessionItems[0].session.alias +'<br>';
        
        if( day.sessionItems[0].speakers[0] !== undefined ) {
            result += day.sessionItems[0].speakers[0].alias;
        }
        
        if( day.sessionItems[0].speakers[1] !== undefined ) {
            result += ' - ' + day.sessionItems[0].speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 1 ) {
                    result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                        'position:absolute;z-index:1;font-size:20px;'+
                        'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                        result += schedule.add_on[i].value;
                        result += '</div>';
            }
        }

        result += '</div>';

        result += '<div style="background:'+group.session.color+
            ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

        result += '<div style="position:relative;z-index:2;">';    
        result += group.session.alias+'<br>';

        if( group.speakers[0] !== undefined ) {
                result += group.speakers[0].alias;
        }
        
        if( group.speakers[1] !== undefined ) {
                result += ' - ' + group.speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 2 ) {
                    result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                        'position:absolute;z-index:1;font-size:20px;'+
                        'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                        result += schedule.add_on[i].value;
                        result += '</div>';
            }
        }

        result += '</div>';

        result += '</div>';

        if( day.sessionItems.length === 2 ) {
            if( day.sessionItems[1].session !== undefined ) {
                result += '<div style="background:'+day.sessionItems[1].session.color+
                        ';border:1px solid white;font-weight:700;height:'+height+';text-align:center;position:relative;z-index:1;">';
                
                result += '<div style="position:relative;z-index:2;">';
                result += day.sessionItems[1].session.alias +'<br>';
            
                if( day.sessionItems[1].speakers[0] !== undefined ) {
                    result += day.sessionItems[1].speakers[0].alias;
                }
            
                if( day.sessionItems[1].speakers[1] !== undefined ) {
                    result += ' - ' + day.sessionItems[1].speakers[1].alias;
                }
                result += '</div>';

                for( let i=0; i<schedule.add_on.length; i++ ) {
                    if( 'schedule_day_'+schedule.add_on[i].day === day.id
                        && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 1 ) {
                        result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                            'position:absolute;z-index:1;font-size:20px;'+
                            'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                        result += schedule.add_on[i].value;
                        result += '</div>';
                    }
                }
    
                result += '</div>';
            }
            else {
                return result;    
            }   
        }
    }

    if( group.sessionItem === 2 ) {
        
        result += '<div style="background:'+day.sessionItems[0].session.color+
                ';border:1px solid white;font-weight:700;height:'+height+';text-align:center;position:relative;z-index:1;">';

        result += '<div style="position:relative;z-index:2;">';        
        result += day.sessionItems[0].session.alias +'<br>';
        
        if( day.sessionItems[0].speakers[0] !== undefined ) {
            result += day.sessionItems[0].speakers[0].alias;
        }
        
        if( day.sessionItems[0].speakers[1] !== undefined ) {
            result += ' - ' + day.sessionItems[0].speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 1 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
        }

        result += '</div>';

        result += '<div style="display:flex;height:'+height+';">';

        result += '<div style="background:'+day.sessionItems[1].session.color+
            ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';
        
        result += '<div style="position:relative;z-index:2;">';    
        result += day.sessionItems[1].session.alias +'<br>';
        
        if( day.sessionItems[1].speakers[0] !== undefined ) {
            result += day.sessionItems[1].speakers[0].alias;
        }
        
        if( day.sessionItems[1].speakers[1] !== undefined ) {
            result += ' - ' + day.sessionItems[1].speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 1 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
        }

        result += '</div>';

        result += '<div style="background:'+group.session.color+
            ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

        result += '<div style="position:relative;z-index:2;">';    
        result += group.session.alias +'<br>';

        if( group.speakers[0] !== undefined ) {
                result += group.speakers[0].alias;
        }
        
        if( group.speakers[1] !== undefined ) {
                result += ' - ' + group.speakers[1].alias;
        }
        result += '</div>';

        for( let i=0; i<schedule.add_on.length; i++ ) {
            if( 'schedule_day_'+schedule.add_on[i].day === day.id
                && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 2 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
        }

        result += '</div>';

        result += '</div>';
    }

    return result;    
}

function updateByGroupDouble( day, group1, group2 ) {
    let
        height = '50%',
        result = '';
        
    if( day.sessionItems.length === 0 ) {
        return result;   
    }

    result += '<div style="display:flex;height:'+height+';">';

    result += '<div style="background:'+day.sessionItems[0].session.color+
            ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

    result += '<div style="position:relative;z-index:2;">';        
    result += day.sessionItems[0].session.alias +'<br>';
        
    if( day.sessionItems[0].speakers[0] !== undefined ) {
        result += day.sessionItems[0].speakers[0].alias;
    }
        
    if( day.sessionItems[0].speakers[1] !== undefined ) {
        result += ' - ' + day.sessionItems[0].speakers[1].alias;
    }
    result += '</div>';

    for( let i=0; i<schedule.add_on.length; i++ ) {
        if( 'schedule_day_'+schedule.add_on[i].day === day.id
            && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 1 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
    }

    result += '</div>';

    result += '<div style="background:'+group1.session.color+
        ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

    result += '<div style="position:relative;z-index:2;">';
    result += group1.session.alias+'<br>';

    if( group1.speakers[0] !== undefined ) {
        result += group1.speakers[0].alias;
    }
        
    if( group1.speakers[1] !== undefined ) {
        result += ' - ' + group1.speakers[1].alias;
    }
    result += '</div>';

    for( let i=0; i<schedule.add_on.length; i++ ) {
        if( 'schedule_day_'+schedule.add_on[i].day === day.id
            && schedule.add_on[i].sessionItem === 1 && schedule.add_on[i].sessionGroup === 2 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
    }

    result += '</div>';

    result += '</div>';

    result += '<div style="display:flex;height:'+height+';">';

    result += '<div style="background:'+day.sessionItems[1].session.color+
        ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

    result += '<div style="position:relative;z-index:2;">';    
    result += day.sessionItems[1].session.alias +'<br>';
        
    if( day.sessionItems[1].speakers[0] !== undefined ) {
        result += day.sessionItems[1].speakers[0].alias;
    }
        
    if( day.sessionItems[1].speakers[1] !== undefined ) {
        result += ' - ' + day.sessionItems[1].speakers[1].alias;
    }
    result += '</div>';

    for( let i=0; i<schedule.add_on.length; i++ ) {
        if( 'schedule_day_'+schedule.add_on[i].day === day.id
            && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 1 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
    }

    result += '</div>';

    result += '<div style="background:'+group2.session.color+
        ';border:1px solid white;font-weight:700;text-align:center;width:50%;position:relative;z-index:1;">';

    result += '<div style="position:relative;z-index:2;">';
    result += group2.session.alias +'<br>';

    if( group2.speakers[0] !== undefined ) {
        result += group2.speakers[0].alias;
    }
        
    if( group2.speakers[1] !== undefined ) {
        result += ' - ' + group2.speakers[1].alias;
    }
    result += '</div>';

    for( let i=0; i<schedule.add_on.length; i++ ) {
        if( 'schedule_day_'+schedule.add_on[i].day === day.id
            && schedule.add_on[i].sessionItem === 2 && schedule.add_on[i].sessionGroup === 2 ) {
                result += '<div style="color:white;left:50%;top:50%;transform:translateX(-50%) translateY(-50%) rotate(-45deg);'+
                    'position:absolute;z-index:1;font-size:20px;'+
                    'text-shadow: black 1px 1px, black -1px 1px, black -1px -1px, black 1px -1px;opacity:0.4;">';
                result += schedule.add_on[i].value;
                result += '</div>';
            }
    }

    result += '</div>';

    result += '</div>';

    return result;    
}

function updateHtmlSchedule() {
    if( isHtmlSchedule ) {
        schedule.daysInfo.forEach(day =>  {
            if( day !== undefined ) {
                document.getElementById( day.id ).innerHTML = setInfoDay( day );
            }           
        });

        for( let i=0; i<schedule.group.length; i++ ) {
            let twoGroups = false;

            for( let j=0; j<schedule.group.length; j++ ) {
                if( j !== i && schedule.group[i].day === schedule.group[j].day ) {
                    if( schedule.group[i].sessionItem === 1 ) {
                        document.getElementById( 'schedule_day_'+schedule.group[i].day ).innerHTML = 
                            updateByGroupDouble( schedule.daysInfo[ schedule.group[i].day ], schedule.group[i], schedule.group[j] );    
                    }
                    else {
                        document.getElementById( 'schedule_day_'+schedule.group[i].day ).innerHTML = 
                            updateByGroupDouble( schedule.daysInfo[ schedule.group[i].day ], schedule.group[j], schedule.group[i] );
                    }                  
                    twoGroups = true;
                }
            }

            if( ! twoGroups ) {
                document.getElementById( 'schedule_day_'+schedule.group[i].day ).innerHTML = 
                    updateByGroup( schedule.daysInfo[ schedule.group[i].day ], schedule.group[i] );    
            }
        }
    }

    $to_copy.innerText = JSON.stringify(schedule);
}

function updateHtmlStats() {
    if( isHtmlSchedule ) {
        createHtmlStats();  
    }    
}

function updateSessions() {
    let session_list_html = '';
    
    if( schedule.sessions.length > 0 ) {
 
        for( let i=0; i<schedule.sessions.length; i++ ) {
            session_list_html += '<div><input type="text" id="session_name_' + i + '" value="' + schedule.sessions[i].name + '">';
            session_list_html += '<input type="text" id="session_alias_' + i + '" value="' + schedule.sessions[i].alias + '">';
            session_list_html += '<select id="session_color_' + i + '">';
            session_list_html += isSelected( '<option value="white"', '>Blanc</option>', schedule.sessions[i].color, 'white' );
            session_list_html += isSelected( '<option value="ivory"', '>Ivoire</option>', schedule.sessions[i].color, 'ivory' );
            session_list_html += isSelected( '<option value="red"', '>Rouge</option>', schedule.sessions[i].color, 'red' );
            session_list_html += isSelected( '<option value="tomato"', '>Rouge clair</option>', schedule.sessions[i].color, 'tomato' );
            session_list_html += isSelected( '<option value="blue"', '>Bleu</option>', schedule.sessions[i].color, 'blue' );
            session_list_html += isSelected( '<option value="deepskyblue"', '>Bleu clair</option>', schedule.sessions[i].color, 'deepskyblue' );
            session_list_html += isSelected( '<option value="green"', '>Vert</option>', schedule.sessions[i].color, 'green' );
            session_list_html += isSelected( '<option value="palegreen"', '>Vert clair</option>', schedule.sessions[i].color, 'palegreen' );
            session_list_html += isSelected( '<option value="yellow"', '>Jaune</option>', schedule.sessions[i].color, 'yellow' );
            session_list_html += isSelected( '<option value="khaki"', '>Jaune clair</option>', schedule.sessions[i].color, 'khaki' );
            session_list_html += isSelected( '<option value="orange"', '>Orange</option>', schedule.sessions[i].color, 'orange' );
            session_list_html += isSelected( '<option value="salmon"', '>Saumon</option>', schedule.sessions[i].color, 'salmon' );
            session_list_html += isSelected( '<option value="purple"', '>Violet</option>', schedule.sessions[i].color, 'purple' );
            session_list_html += isSelected( '<option value="orchid"', '>Violet clair</option>', schedule.sessions[i].color, 'orchid' );
            session_list_html += isSelected( '<option value="violet"', '>Rose</option>', schedule.sessions[i].color, 'violet' );
            session_list_html += isSelected( '<option value="pink"', '>Rose clair</option>', schedule.sessions[i].color, 'pink' );
            session_list_html += isSelected( '<option value="maroon"', '>Marron</option>', schedule.sessions[i].color, 'maroon' );
            session_list_html += isSelected( '<option value="sienna"', '>Marron clair</option>', schedule.sessions[i].color, 'sienna' );
            session_list_html += '</select>';
            session_list_html += '<input type="button" id="session_edit_' + i + '" value="Modifier">';
            session_list_html += '<input type="button" id="session_delete_' + i + '" value="Supprimer"></div>';
        }
    
        $session_list.innerHTML = session_list_html;
    
        for( let i=0; i<schedule.sessions.length; i++ ) { 
            const
                $session_name_i = document.getElementById( 'session_name_' + i ),
                $session_alias_i = document.getElementById( 'session_alias_' + i ),
                $session_color_i = document.getElementById( 'session_color_' + i ),
                $session_edit_i = document.getElementById( 'session_edit_' + i ),
                $session_delete_i = document.getElementById( 'session_delete_' + i );
    
            $session_edit_i.addEventListener( 'click', function() {
                if( isHtmlSchedule ) {
                    for( let l=0; l<schedule.daysInfo.length; l++ ) {
                        if( schedule.daysInfo[l] !== undefined ) {
                            for( let j=0; j<schedule.daysInfo[l].sessionItems.length; j++ ) {
                                if( schedule.daysInfo[l].sessionItems[j].session.name === schedule.sessions[i].name ) {
                                    schedule.daysInfo[l].sessionItems[j].session.name = $session_name_i.value;
                                    schedule.daysInfo[l].sessionItems[j].session.alias = $session_alias_i.value;
                                    schedule.daysInfo[l].sessionItems[j].session.color = $session_color_i.value;
                                }
                            }
                        }
                    }
                }

                for( let l=0; l<schedule.group.length; l++ ) {
                    if( schedule.group[l].session.name === schedule.sessions[i].name ) {
                        schedule.group[l].session.name = $session_name_i.value;
                        schedule.group[l].session.alias = $session_alias_i.value;
                        schedule.group[l].session.color = $session_color_i.value;
                    }
                }

                schedule.sessions[i].name = $session_name_i.value;
                schedule.sessions[i].alias = $session_alias_i.value;
                schedule.sessions[i].color = $session_color_i.value;

                updateHtmlSchedule();
                updateHtmlStats();
            });
    
            $session_delete_i.addEventListener( 'click', function() {
                schedule.deleteSession(i);

                updateSessions();
            });
        }
    }
    else {
        $session_list.innerHTML = session_list_html;    
    }

    $to_copy.innerText = JSON.stringify(schedule);
}
    
function updateSpeakers() {
    let speaker_list_html = '';
    
    if( schedule.speakers.length > 0 ) {
            
        for( let i=0; i<schedule.speakers.length; i++ ) {
            speaker_list_html += '<div><input type="text" id="speaker_name_' + i + '" value="' + schedule.speakers[i].name + '">';
            speaker_list_html += '<input type="text" id="speaker_alias_' + i + '" value="' + schedule.speakers[i].alias + '">';
            speaker_list_html += '<input type="button" id="speaker_edit_' + i + '" value="Modifier">';
            speaker_list_html += '<input type="button" id="speaker_delete_' + i + '" value="Supprimer"></div>';
        }
    
        $speaker_list.innerHTML = speaker_list_html;
    
        for( let i=0; i<schedule.speakers.length; i++ ) { 
            const
                $speaker_name_i = document.getElementById( 'speaker_name_' + i ),
                $speaker_alias_i = document.getElementById( 'speaker_alias_' + i ),
                $speaker_edit_i = document.getElementById( 'speaker_edit_' + i ),
                $speaker_delete_i = document.getElementById( 'speaker_delete_' + i );
    
            $speaker_edit_i.addEventListener( 'click', function() {
                if( isHtmlSchedule ) {
                    for( let l=0; l<schedule.daysInfo.length; l++ ) {
                        if( schedule.daysInfo[l] !== undefined ) {
                            for( let j=0; j<schedule.daysInfo[l].sessionItems.length; j++ ) {
                                for( let k=0; k<schedule.daysInfo[l].sessionItems[j].speakers.length; k++ ) {
                                    if( schedule.daysInfo[l].sessionItems[j].speakers[k] !== undefined
                                        && schedule.daysInfo[l].sessionItems[j].speakers[k].name === schedule.speakers[i].name ) {
                                            schedule.daysInfo[l].sessionItems[j].speakers[k].name = $speaker_name_i.value;     
                                            schedule.daysInfo[l].sessionItems[j].speakers[k].alias = $speaker_alias_i.value;     
                                    }
                                }
                            }
                        }
                    }
                }

                for( let l=0; l<schedule.group.length; l++ ) {
                    for( let j=0; j<schedule.group[l].speakers.length; j++ ) {
                        if( schedule.group[l].speakers[j] !== undefined
                            && schedule.group[l].speakers[j].name === schedule.speakers[i].name ) {
                                schedule.group[l].speakers[j].name = $speaker_name_i.value;
                                schedule.group[l].speakers[j].alias = $speaker_alias_i.value;   
                        }
                    }
                }

                schedule.speakers[i].name = $speaker_name_i.value;
                schedule.speakers[i].alias = $speaker_alias_i.value;

                updateHtmlSchedule();
                updateHtmlStats();
            });
    
            $speaker_delete_i.addEventListener( 'click', function() {
                schedule.deleteSpeaker(i);

                updateSpeakers();
            });
        }
    }
    else {
        $speaker_list.innerHTML = speaker_list_html;
    }

    $to_copy.innerText = JSON.stringify(schedule);
}