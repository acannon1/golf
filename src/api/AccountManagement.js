const accountManagement = {

    async registerUser(auth, email, password) {
      let result = false
      console.log('register user')
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          result = true;
        })
        .catch((error) => {
          console.log(error.message)
        })
        return(result);
    },
  
    async logIn(auth, email, password) {
      const snapshot = await auth.signInWithEmailAndPassword(email, password)
      return(snapshot);
    },

    async logOut(auth) {
      await auth.signOut()
    },
  
    handleAuth(auth) {
      console.log("handle auth");
      const user = auth.currentUser();
      console.log("current user = " + user);
      if(user) {
        auth.signOut(user)
          .then((result) => {
            console.log(result)
          })
          .catch((error) => {
            console.log(error.message);
          })
      }
    },
  
    recoverPassword(auth, email, password) {
      console.log("recover password");
      auth.sendPasswordResetEmail(email, password)
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error.message);
        })
    }

}

export default accountManagement;