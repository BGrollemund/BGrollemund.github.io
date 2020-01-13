
class AddOn {
    constructor( day, sessionItem, sessionGroup, value ) {
        this.day = day;
        this.sessionItem = sessionItem;
        this.sessionGroup = sessionGroup;
        this.value = value;  
    }
}

class DayInfo {
    constructor(sessionItems, id) {
        this.sessionItems = sessionItems;
        this.id = id;
    }
}

class Group {
    constructor(day, sessionItem, session, speakers, duration) {
        this.day = day;
        this.sessionItem = sessionItem;
        this.session = session;
        this.speakers = speakers;
        this.duration = duration;
    }
}

class Session {
    constructor(name, alias, color, count_hour) {
        this.name = name;
        this.alias = alias;
        this.color = color;
        this.count_hour = count_hour;
    }
}

const special_sessions = {
    'holy' : new Session( 'Férié', 'Férié', 'darkslategray', 0 ),
    'vacation' : new Session( 'Vacances', 'Vac', 'gray', 0 ),
    'closed' : new Session( 'Fermé', 'Fermé', 'slategray', 0 ),
    'empty' : new Session( '', '', 'white', 0 )
};

class SessionItem {
    constructor(session, speakers, duration) {
        this.session = session;
        this.speakers = speakers;
        this.duration = duration;
    }
}

class Speaker {
    constructor(name, alias, count_hour) {
        this.name = name;
        this.alias = alias;
        this.count_hour = count_hour;
    }
}

class Schedule {
    constructor(name, start_date, end_date, days, sessions, speakers, daysInfo, total_hour, group, stats, stats_remove, add_on) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.days = days;
        this.sessions = sessions;
        this.speakers = speakers;
        this.daysInfo = daysInfo;
        this.total_hour = total_hour;
        this.group = group;
        this.stats = stats;
        this.stats_remove = stats_remove;
        this.add_on = add_on;

        this.addAddOn = function(day, sessionItem, sessionGroup, value) {
            this.add_on.push(new AddOn(day, sessionItem, sessionGroup, value));
        };

        this.deleteAddOn = function(i) {
            this.add_on.splice( i, 1 )
        }

        this.editAddOn = function(value, i) {
            this.add_on[i].value = value;
        }
        
        this.addDay = function( day ) {
            this.days.push( day );
        };

        this.addDayInfo = function( dayInfo, i ) {
            this.daysInfo[i] = dayInfo;
        }

        this.addGroup = function(day, sessionItem, session, speakers, duration) {
            this.group.push(new Group(day, sessionItem, session, speakers, duration));
        };

        this.deleteGroup = function(i) {
            this.group.splice( i, 1 )
        }

        this.editGroup = function(session, speakers, i) {
            this.group[i].session = session;
            this.group[i].speakers = speakers;
        }
        
        this.addSession = function (name, alias, color, count_hour) {
            this.sessions.push(new Session(name, alias, color, count_hour));
        };

        this.deleteSession = function(i) {
            this.sessions.splice( i, 1 );
        }

        this.addSpeaker = function (name, alias, count_hour) {
            this.speakers.push(new Speaker(name, alias, count_hour));
        };

        this.deleteSpeaker = function(i) {
            this.speakers.splice( i, 1 );
        }
    }
}