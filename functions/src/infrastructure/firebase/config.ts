import * as functions from "firebase-functions";

export class FirebaseConfig {
  static jwtSecret(): string {
    return functions.config().jwt.secret;
  }
}


