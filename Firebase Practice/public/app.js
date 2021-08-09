console.log(firebase);

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userDetails = document.getElementById('userDetails');

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>Your User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

const db = firebase.firestore();
let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if (user) {
        // Database Reference
        thingsRef = db.collection('things')
        createThing.onclick = () => {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            let product = document.getElementById('item').value;
            thingsRef.add({
                uid: user.uid,
                name: product,
                createdAt: serverTimestamp()
            });
        }
    }
});

auth.onAuthStateChanged(user => {

    if (user) {

        // Database Reference
        thingsRef = db.collection('things')

        // ..... omitted .....

        // Query
        unsubscribe = thingsRef.where('uid', '==', user.uid)
            .onSnapshot(querySnapshot => {
                
                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {

                    return `<li>${doc.data().name}</li>`

                });

                thingsList.innerHTML = items.join('');

            });



    } else {
        // Unsubscribe when the user signs out (but the list does not update until next sign in)
        unsubscribe && unsubscribe();
    }
});