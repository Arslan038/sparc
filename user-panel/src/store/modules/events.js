const state = {
    events: [],
    participants: [],
    participated: null,
    selectedEvent: [],
};

const getters = {
    getEvents: state => state.events,
    getParticipants: state => state.participants,
    getParticipated: (state) => {
        return state.participated
    },
    getSelectedEvent: state => state.selectedEvent
};

const actions = {
    createEvent({commit}, payload) {
        console.log("Before " + payload.event_image.name);

        var storageRef = firebase.storage().ref('event_images/'+payload.event_image.name);
        let uploadTask = storageRef.put(payload.event_image);

        uploadTask.on('state_changed', snapshot => {
        
        }, function(err){
            console.log(err.message);
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                payload.event_image = downloadURL;
                console.log("After " + payload.event_image);
            }).then(() => {
                if(payload.event_video != null) {
                    var videoRef = firebase.storage().ref('event_videos/'+payload.event_video.name);
                    let uploadVideo = videoRef.put(payload.event_video);

                    uploadVideo.on('state_changed', snapshot => {
                    }, function(err){
                        console.log(err.message);
                    }, function() {
                            uploadVideo.snapshot.ref.getDownloadURL().then(downloadURL => {
                            payload.event_video = downloadURL;
                            console.log("After " + payload.event_video);
                        }).then(() => {
                            firebase.database().ref('events').push(payload).then(event => {
                                const key = event.key;
                                firebase.auth().onAuthStateChanged(user => {
                                    if(user) {
                                        firebase.database().ref('users').child(user.uid).child('events_hosted').push(key)
                                        .then(() => {
                                            console.log('Event Registered')
                                        })
                                    }
                                })
                                
                            }).catch(err => console.log(err.message));
                        })
                    })
                }
                else {
                    firebase.database().ref('events').push(payload).then(event => {
                        const key = event.key;
                        firebase.auth().onAuthStateChanged(user => {
                            if(user) {
                                firebase.database().ref('users').child(user.uid).child('events_hosted').push(key)
                                .then(() => {
                                    console.log('Event Registered')
                                })
                            }
                        })
                    }).catch(err => console.log(err.message));
                }
            })
        })  
    },

    async fetchEventById({commit}, eventObj) {
        commit('unSetSelectedEvent');
        await firebase.database().ref('events').child(eventObj.id).on('value', snapshot => {
            //console.log(snapshot.val())
            commit('setSelectedEvent', snapshot.val())
        })
    },

    fetchEvents({commit}) {
        commit('unSetEvents');
        firebase.database().ref('events').on('child_added', snapshot => {
            commit('setEvents', {
                ...snapshot.val(),
                id: snapshot.key
            })
        })
    },

    async eventParticipant({commit}, eventObj) {
        await firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref('events').child(eventObj.id).child('users_attending').push(user.uid)
                .then(() => {
                    firebase.database().ref('users').child(user.uid).child('events_attended').push(eventObj.id)
                    .then(() => {
                        commit('unSetSelectedEvent');
                        commit('setParticipated', 'success')
                        firebase.database().ref('events').child(eventObj.id).on('child_added', snapshot => {
                            commit('setSelectedEvent', snapshot.val())
                        })
                    }).catch(err => {
                        console.log(err)
                        commit('setParticipated', 'failed')
                    })
                }).catch(err => {
                    console.log(err)
                    commit('setParticipated', 'failed')
                })
            }
            else {
                commit('setParticipated', 'failed')
            }
        })
    },

    fetchParticipants({commit}, eventId) {
        console.log('ID')
        console.log(eventId.id)
        commit('unSetParticipants');
        firebase.database().ref('events').child(eventId.id).child('users_attending').on('child_added', snapshot => {
            commit('setParticipants', snapshot.val())
        })
    }
};

const mutations = {
    setEvents: (state, payload) => (state.events.push(payload)),
    unSetEvents: (state) => state.events = [],
    setSelectedEvent: (state, payload) => (state.selectedEvent.push(payload)),
    unSetSelectedEvent: state => state.selectedEvent = [],
    unSetParticipants: (state) => state.participants = [],
    setParticipants: (state, payload) => (state.participants.push(payload)),
    setParticipated: (state, payload) => {
        state.participated = payload
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}