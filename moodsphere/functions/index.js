const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

admin.initializeApp();

const storage = new Storage();

exports.getImage = functions.https.onRequest(async (req, res) => {
  const imageUrl = req.query.imageUrl; // Assuming the image URL is passed as a query parameter
  const bucketName = "moodsphere-dev-dynasty.appspot.com";
  const file = storage.bucket(bucketName).file(imageUrl);

  try {
    const downloadUrl = await file.getSignedUrl({
      action: "read",
      expires: "2024-05-13", // Set expiration date/time if needed
    });

    res.set("Access-Control-Allow-Origin", "*"); // Allow all origins for CORS (you can restrict this to specific domains)
    res.redirect(downloadUrl[0]); // Redirect the client to the signed URL for the image
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Internal Server Error");
  }
});
