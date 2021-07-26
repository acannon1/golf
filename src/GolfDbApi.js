import firebase from 'firebase/app';

const golfDbApi = {
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
        db.collection('Tournaments').add({
            date: date,
            course: course,
            status: "Sign Up",
            signUpList: []
        })
        .then(() => {
            console.log("done")
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    },

    async getGolferInfo(db, user){
        let temp = {};
        // db.collection('Golfers').doc(user)
        //     .get()
        //         .then((doc) => {
        //             if (doc.exists) {
        //                 temp = { ...doc.data()}
        //             } else {
        //                 console.log("No such document!");
        //             }
        //         }).catch((error) => {
        //             console.log("Error getting document:", error);
        //         });

            const snapshot = await db.collection('Golfers').doc(user).get();
            return(snapshot.data())
        // const snapshot = await db.collection('Golfers')
        //     .where("userInfo","==",user.uid)
        //     .get();
        //     console.log(doc.data())
        // snapshot.docs.map((doc) => {
        //     temp = [...doc.data().par];
        // });
        // return temp;
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
            // let temp = doc.data();
            // temp["date"] = doc.id;
            tournaments.push(doc.data())
        });
        return tournaments;
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

    async getTournament(db, date, course) {
        let data = {
            "Course": course,
            "Date": date,
            "Results":{}
        };

        const snapshot = await db.collection('Tournaments')
            .where("date", "==", date)
            .get();

        snapshot.docs.map((doc) => {
            Object.keys(doc.data()).forEach(key => {
                if((key !== 'course') && (key !== 'date') &&(key !== 'status') && (key !== 'signUpList')) {
                    data.Results[key] = doc.data()[key];
                }
            });
        });

        return(data);
    },

    async getUpcomingTournaments(db) {
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
        // = await db.collection('Tournaments')
        //     .where("status", "==", "Sign Up")
        //     .get();
        // snapshot.docs.map((doc) => {
        //     // let temp = doc.data();
        //     // temp["date"] = doc.id;
        //     tournaments.push(doc.data())
        // });
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

    async signUp(db, date, name) {
        const snapshot = await db.collection('Tournaments')
            .where("status", "==", "Sign Up")
            .get();

            //Map thru each document
        snapshot.docs.map((doc) => {
            //Find document match to date
            if(doc.data().date === date) {
                console.log(doc.data())
                console.log(doc.id)
                //Update sign-up list
                db.collection('Tournaments').doc(doc.id)
                    .update({
                        signUpList: firebase.firestore.FieldValue.arrayUnion( name )
                    })
                    .then(() => {
                        console.log("done")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        });
    }
}

export default golfDbApi;
