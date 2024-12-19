import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app/app.routes'; // Ajuste aquí

const firebaseConfig = {
  apiKey: "AIzaSyCijbya1CINcfsFXbXDzE7muUuALwxK",
  authDomain: "aarben-448d5.firebaseapp.com",
  projectId: "aarben-448d5",
  storageBucket: "aarben-448d5.appspot.com",
  messagingSenderId: "1573940692",
  appId: "1:1573940692:web:eb7421dbe57887fad250",
};

bootstrapApplication(AppComponent, {
  providers: [
    appRoutes, // Usar appRoutes en lugar de appRouterProviders
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
