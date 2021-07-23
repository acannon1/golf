// import moment from 'moment';
import firebase from 'firebase/app';

const golfDbApi = {
    saveRound(db, player, score, date) {      
        db.collection('Tournaments').doc(date)
            .update({
                [player]: score
            })
            .then(() => {
                console.log("done")
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
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
        db.collection('Tournaments')
            .doc(date)
            .set({
                course: course,
                played: false,
                signUp: []
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
            let temp = doc.data();
            temp["date"] = doc.id;
            tournaments.push(temp)
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

        db.collection('Tournaments').doc(date).get()
            .then((doc) => {
                if (doc.exists) {
                    Object.keys(doc.data()).forEach(key => {
                        if((key !== 'course') && (key !== 'played') && (key !== 'signUp')) {
                            data.Results[key] = doc.data()[key];
                        }
                    });
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        return(data);
    },

    async getUpcomingTournaments(db) {
        let tournaments = [];
        const snapshot = await db.collection('Tournaments')
            .where("played", "==", false)
            .get();
        snapshot.docs.map((doc) => {
            let temp = doc.data();
            temp["date"] = doc.id;
            tournaments.push(temp)
        });
        return tournaments;
    },

    async signUp(db, date, name) {        
        console.log("handleSignUp")   
        db.collection('Tournaments').doc(date)
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
}

export default golfDbApi;
