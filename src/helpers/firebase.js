import * as fb from 'firebase/app'

export function fbInitConfig() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDfhgVjPCCurvCagsLKLNn9lepmduGN938',
    authDomain: 'ad-test-f5131.firebaseapp.com',
    databaseURL: 'https://ad-test-f5131.firebaseio.com',
    projectId: 'ad-test-f5131',
    storageBucket: 'ad-test-f5131.appspot.com',
    messagingSenderId: '368878215427',
    appId: '1:368878215427:web:172a9ba00f987b47'
  }
  fb.initializeApp(firebaseConfig)
}
