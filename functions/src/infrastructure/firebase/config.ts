export class FirebaseConfig {
  static jwtSecret(): string {
    return process.env.JWT_SECRET || "";
  }
}


