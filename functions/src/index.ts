import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    try {
      const collectionSnapshot = await admin
        .firestore()
        .collection("users")
        .get();
      const userImages = await admin
        .storage()
        .bucket()
        .file("rSKsLcmsJHRc1YtEfpiW1Cj43cq2/profile-image-0");
      const downloadLink = userImages;
      console.log("user Images:", downloadLink);
      const data = collectionSnapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      response.send(data);
    } catch (err) {
      console.error(err);
      response.status(500).send(err);
    }
  }
);
