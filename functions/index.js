const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from md irfan!");
});

const createNotification = (notification =>{
    return admin.firestore().collection('notifications')
       .add(notification)
       .then( doc => console.log('notification added', doc))
})
exports.projectCreated = functions.firestore
    .document('project/{projectId}')
    .onCreate(doc =>{
           const projectInfo = doc.data();
           const notification = {
               content: 'Added a new project',
               user: `${projectInfo.authorFirstName} ${projectInfo.authorLastName}`,
               time: admin.firestore.FieldValue.serverTimestamp()
           }
        return createNotification(notification) 
    });



exports.userJoined = functions.auth.user()
  .onCreate(user=>{
      return admin.firestore().collection("users")
            .doc(user.uid).get().then(doc=>{
                const newUser = doc.data();
                const notification = {
                    content: 'Joined the Party',
                    user : `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            })
  });   
