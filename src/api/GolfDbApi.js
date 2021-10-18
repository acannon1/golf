import firebase from 'firebase/app';
import axios from 'axios';

// const baseUrl = 'https://firestore.googleapis.com/v1/projects/golf-40e5a/databases/(default)';

const golfDbApi = {
    async saveGrouping(db, date, grouping) {
        const query = await db.collection('Tournaments')
            .where('date', '==', date).get();
        if (!query.empty) {
            const snapshot = query.docs[0];
            db.collection("Tournaments").doc(snapshot.id)
                .update({
                    foursomes: firebase.firestore.FieldValue.arrayUnion( grouping )
                })
                .then(() =>
                    console.log("done")
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
        } else {
            console.log("document not found")
        }
    },

    async saveScoreRealTime(db, date, player, scoreCard) {
        const query = await db.collection('Tournaments')
            .where('date', '==', date).get();

        if (!query.empty) {
            const snapshot = query.docs[0];
            let updateScores = snapshot.data().scores;
            updateScores[player] = scoreCard;
            db.collection("Tournaments").doc(snapshot.id)
                .update({scores: updateScores})
                .then(() =>
                    console.log("done")
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })

        } else {
            console.log("document not found")
        }
    },

    testAxios() {
        console.log("inside textAxios");
        axios.get('https://us-central1-golf-40e5a.cloudfunctions.net/helloCors')
        // axios.get(baseUrl + `/documents/Golfers`)
          .then(response => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
         
    },

    async saveRound(db, player, score, date) {
        // Make the initial query
        const query = await db.collection('Tournaments')
            .where('date', '==', date).get();

        if (!query.empty) {
            const snapshot = query.docs[0];
            db.collection("Tournaments").doc(snapshot.id)
                .update({[player]: score})
                .then(() =>
                    console.log("done")
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })

        } else {
            console.log("document not found")
        }

        // Make the initial query
        const query2 = await db.collection('Golfers')
            .where('name', '==', player).get();

        if (!query2.empty) {
            const snapshot2 = query2.docs[0];
            db.collection("Golfers").doc(snapshot2.id)
                .update({
                    rounds: firebase.firestore.FieldValue.arrayUnion( date )
                })
                .then(() =>
                    console.log("done")
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })

        } else {
            console.log("document not found")
        }
    },

    createCourse(db, name, location, rating, slope) {
        db.collection('Courses')
            .doc()
            .set({
                name: name,
                location:location,
                rating: rating,
                slope: slope,
                par:[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
            })
            .then(() => {
                console.log("done")
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    },

    createGolfer(db, email, admin, name, handicap, numOfEvents) {
        db.collection('Golfers')
            .doc(email)
            .set({
                admin: admin,
                name: name,
                handicap: handicap,
                numOfEvents: numOfEvents
            })
            .then(() => {
                console.log("done")
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    },

    createTournament(db, date, course) {
        let docID = date.replace(/[ ,.]/g, '') + course.replace(/[ ]/g, '').substring(0,5)

        db.collection('Tournaments').doc(docID).set({
            date: date,
            course: course,
            status: "Sign Up",
            signUpList: [],
            foursomes: [],
            scores: {},
            skins: [],
            birdies: [],
            skinsCount: {},
            birdiesCount: {}
        })
        .then(() => {
            console.log("done")
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    },

    async signUp(db, date, name) {
        
        const snapshot = await db.collection('Tournaments')
            .where("status", "==", "Sign Up")
            .get();

        //Map thru each document
        snapshot.docs.map((doc) => {
            //Find document match to date
            if(doc.data().date === date) {
                let updateScores = doc.data().scores;
                updateScores[name] = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";                

                //Update sign-up list
                db.collection('Tournaments').doc(doc.id)
                    .update({
                        signUpList: firebase.firestore.FieldValue.arrayUnion( name ),
                        scores: updateScores
                    })
                    .then(() => {
                        console.log("done")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        });
    },

    async withDraw(db, date, name) {
        
        const snapshot = await db.collection('Tournaments')
            .where("status", "==", "Sign Up")
            .get();

        //Map thru each document
        snapshot.docs.map((doc) => {
            //Find document match to date
            if(doc.data().date === date) {
                let updateScores = doc.data().scores;
                updateScores = updateScores[name].delete;

                //Update sign-up list
                db.collection('Tournaments').doc(doc.id)
                    .update({
                        signUpList: firebase.firestore.FieldValue.arrayRemove(name),
                        scores: updateScores
                    })
                    .then(() => {
                        console.log("done")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        });
    },

    async startTournament(db, tournament) {               
        const query = await db.collection('Tournaments')
            .where("date", "==", tournament.date)
            .get();

        if (!query.empty) {
            const snapshot = query.docs[0];
            db.collection("Tournaments").doc(snapshot.id)
                .update({status: "In Progress"})
                .then(() =>
                    console.log("done")
                )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })

        } else {
            console.log("document not found")
        }
    },

    async getGolferInfo(db, user){
        const snapshot = await db.collection('Golfers').doc(user).get();
        return(snapshot.data())
    },

    async getGolfers (db) {
        let golfers = [];
        const snapshot = await db.collection('Golfers').get();
        snapshot.docs.map(doc => golfers.push(doc.data()));
        return golfers;
    }, 

    async getCourses(db) {
        let courses = [];
        const snapshot = await db.collection('Courses').get();
        snapshot.docs.map(doc => courses.push(doc.data()));
        return courses;
    }, 

    async getTournaments(db) {
        let tournaments = [];
        const snapshot = await db.collection('Tournaments').get();
        snapshot.docs.map((doc) => {
            tournaments.push(doc.data())
        });
        return tournaments;
    }, 

    async getCurrentTournament(db) {
        let tournament = {};
        const snapshot = await db.collection('Tournaments').get();
        snapshot.docs.map((doc) => {
            if((doc.data().status === "In Progress") ||
               (doc.data().status === "Ready to Start")) {
                tournament = doc.data();
            }
        });
        return tournament;
    },
    
    async getCourse(db, course) {
        let temp = {};

        const snapshot = await db.collection('Courses')
            .where("name","==",course)
            .get();
        snapshot.docs.map((doc) => {
            temp = [...doc.data().par];
        });
        return temp;
    },

    async getFutureTournaments(db) {
        let tournaments = [];
        const snapshot = await db.collection('Tournaments')
            .where("status", "==", "Sign Up")
            .get();
        snapshot.docs.map((doc) => {
            // let temp = doc.data();
            // temp["date"] = doc.id;
            tournaments.push(doc.data())
        });
        return tournaments;
    },

    getUpcomingTournaments2(db) {
        let tournaments = [];
        let ref = db.collection('Tournaments').where("status", "==", "Sign Up");
        ref.onSnapshot((querySnapshot) => {
            querySnapshot.docs.map((doc) => {
                tournaments.push(doc.data())
            });
        }, (error) => {
            console.log(error)
        })
        return tournaments;
    },

    async getPlayerScore(db, date, course, player) {
        const query = await db.collection('Tournaments')
            .where("date", "==", date)
            .get()

        if (!query.empty) {
            const snapshot = query.docs[0];
            return(snapshot.data()[player])
        } else {
            console.log("empty")
        }
        
        return([]);
    },

    async getRealTimeScores(db) {        
        let data = {
            "Course": '',
            "Date": '',
            "Results":{},
            "Par":[]
        };

        const query = await db.collection("Tournaments")
            .where("status", "==", "In Progress")
            .get()

        if(!query.empty) {
            const snapshot = query.docs[0];
            console.log(snapshot.data())
            data.Course = snapshot.data().course;
            data.Date = snapshot.data().date;
            Object.keys(snapshot.data()).forEach(key => {
                if((key !== 'course') && (key !== 'date') && (key !== 'status') &&
                  (key !== 'signUpList') && (key !== 'foursomes') && (key !== 'scores')) {
                    data.Results[key] = snapshot.data()[key];
                }
            });
          
            db.collection("Courses").where("name", "==", snapshot.data().course).get()
            .then(value => {
                data['Par']=value.docs[0].data()['par']
            })
        } else {
            console.log("empty")
        }
        return(data);
    },

    async getLeaderBoard(db) {
        let data = {};     
        
        const query = await db.collection("Tournaments").where("status", "==", "In Progress").get();
        if(query.docs[0] !== undefined) {
            data = query.docs[0].data();
    
            Object.keys(data.scores).map((key) => {
                data.scores[key] = data.scores[key].split(",").map(Number);
            });
            
            const birdieTotals = data.skins.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});                  
    
            const skinTotals = data.skins.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});
    
            data.birdieTotals = birdieTotals;
            data.skinTotals = skinTotals;
        }

        const query2 = await db.collection("Courses").where("name", "==", data.course).get();
        if(query2.docs[0] !== undefined) {
            data.par = query2.docs[0].data().par;
        }

        return(data);
    },

    async getPastResults(db, date, course) {
        let data = {};
        const docID = date.replace(/[ ,.]/g, '') + course.replace(/[ ]/g, '').substring(0,5);
        
        const query = await db.collection('Tournaments').doc(docID).get();

        if (!query.empty) {
            data = query.data();
    
            Object.keys(data.scores).map((key) => {
                data.scores[key] = data.scores[key].split(",").map(Number);
            });
            
            const birdieTotals = data.skins.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});                  
    
            const skinTotals = data.skins.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});
    
            data.birdieTotals = birdieTotals;
            data.skinTotals = skinTotals;
        }

        const query2 = await db.collection("Courses").where("name", "==", data.course).get();
        if(query2.docs[0] !== undefined) {
            data.par = query2.docs[0].data().par;
        }

        return(data);
      }
}

export default golfDbApi;
