import "server-only";
import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "firo-f9739",
  private_key_id: "efe7079740d0aba8f08bc483093ffd62e0a12f3b",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYQy/K/QCGO9kA\nCU7zevQQfcC5EjR2JWwDVoR4+O8QSjF+bYC6hGmLfxoQXzJLmCI4wH/W0vpvhrYm\nEiI+kTnDQJGagbNVUXn1X7uz7Enc399ecDElIljoY4eGzOCNOtRTRhMkwHFRrPWp\n20vAqllMmIzdWFfZY58T+oM71nUERacvvC9vYKKjkokeyPrnW9EjgDpm6oayULi+\nO1/rRQu2WIb+LBL6q6mRUOOYHu8gf/zOeplrZ5deqHo9kIG71qBg+/QOKrk/WfPY\n+j+P4rXgSMscXB3TCi1f+fQNsuKEtoGTg8ZxnzuC3h2kt3c6OCrtwmuzU3YVaZZk\nZtieySMhAgMBAAECggEAB1HS1XSAZuAHWrcgmyC/ZQAp8eRPWUEFVGGXxJPBslPz\nM+Zsk841LPmwKKYIM5h3xA2j5gyoWaD+G5tuhElHDWLrQAcBdQhNGpnTEREUzkCC\nNMCTBpY7MHZkmRKTIRnreNFnhs1qqHXfBLuS50z8uRkgChfaNVXoBaBA09l7hsRC\n0a7gqCkUTlvdGgEe28Cxjy4P6dSy1LWGBU3VVmNey28GwOHI8bg9eHE9eu3e9Smm\nUd9w6x95Ra37W9S5myEpAW8abWj9vSH9Ukzr+30DB5EuUev60pD+5vkDAmVkOOeH\n7p05z0NyAb6FsCPS+4D7m6k7H2OnuSMdp5d9iumboQKBgQDz93Uox2BN8Gcvf6uD\nLPM1Dj/S/oitDl9JUh1sAYCM1avd6ciUxMdNrfQhyvGK3/SFaU7kaZhCeRQWlbyP\n2b68t6n4+KXFbH4y5+pHNkTqcuZjXTyJIFWCFWnAR99uP90hW2Y/sc7kURjbKUhj\nSSu10UMx3vU4aztgzdlZyGvLKQKBgQDi7ek8IB3Sd1QdJHJKhWQD1SCAWUn63r4N\nDf9LgOSdyrWaOLM5LNl4Gq1rNGj5zRpAJj3oh9Bm01DBFTVR+rPoq8AjEoJC9jmC\nx17+ZndShonySQEkVyrpMYdzzD4jPFtAO9QnOp6p4iweG+4hgMIU5mNSTU4+V7z6\nIK633IWPOQKBgF5JFI5d/2ofrsE8phxcEuI+T4xLsqavF0RO5/AF5JiJO5LX9x0H\nr77lq6QjupXhV673s/WymZWXFZxk4ir2DDEDCj2eWvKhq2QhHPnIj3nMTh24utyE\nEofjnqshG8iQBfYOTMXxAfRbIzAQFFnKvYnXBhEQCdV0G86dv5JjUsWBAoGBAKTm\naxCk6ebRjY7ruB2M1sOuMMLznz2sdIA6BqTQEdDTx6k8wIewnoqXICOB3zJ+py+s\nWlpJrte5gLn99lQPEILno2QZBA0yrVHqHI5S2Sxf1Yf5ItpMeUMhGaO86/5g0pJX\np2+mOjuKvbJXa3BvBxl23P+ma1AEI6/C5hN3LJqJAoGALVnYdB+oK4YdjWvxgA0x\n1R08ueSb5eh05McsO23jfl348X3ny5TgkMDcUF9JlCsuDkSHWlMsdUkOdzcCj1AI\n4C0vFmUIvzRlazdFc2AgcQamV5KFGeExUjFtv8hVSAXdBAeOI8dhFXglId6MyQcF\ngvnkmwnhsZusenkWNAEoAjk=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-h86s9@firo-f9739.iam.gserviceaccount.com",
  client_id: "106272992932041868757",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h86s9%40firo-f9739.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

export { auth, db, FieldValue };
