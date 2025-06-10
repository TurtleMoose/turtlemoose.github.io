// var script = document.createElement('script');
// // script.src = 'https://yourmodernproblems.com/HUSTHACK.js';
// script.type = 'text/javascript';
// document.body.appendChild(script);
    
    
    
    
    import('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js')
    .then(module => {
    console.log(module); // Access the module's exports here
    });
    import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js')
    .then(module => {
    console.log(module); // Access the module's exports here
    });
    import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js')
    .then(module => {
    console.log(module); // Access the module's exports here
    });


//frqs
    const firebaseConfig = {
        apiKey: "AIzaSyAdFKaITim5TGSvUCR5ye4Fn5YPkRAEtMk",
        authDomain: "appify-8b899.firebaseapp.com",
        projectId: "appify-8b899",
        storageBucket: "appify-8b899.appspot.com",
        messagingSenderId: "38291476390",
        appId: "1:38291476390:web:c3279df34755163672c967"
      };


      //blank
    //   const firebaseConfig = {
    //     apiKey: "AIzaSyD72GPRcJ9Mw0XZVwHn6RYkKLyIa0_Sa2E",
    //     authDomain: "blank-slate-d78d1.firebaseapp.com",
    //     projectId: "blank-slate-d78d1",
    //     storageBucket: "blank-slate-d78d1.appspot.com",
    //     messagingSenderId: "148058024636",
    //     appId: "1:148058024636:web:ce1e8e6bf8ecb04b1e7eb9",
    //    };

let db;
setTimeout(() => {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
},1000);
    
var em = document.createElement('input');
em.id = "asd"
document.body.appendChild(em);
var em2 = document.createElement('button');
      em2.onclick = 'checkitnow(document.getElementById("asd").value)';
      em2.innerText = "check"
document.body.appendChild(em2);


    window.checkitnow = function (thisa) {
        
        db.collection(thisa)
          .get()
          .then((querySnapshot) => {
          
            querySnapshot.forEach((doc) => {
         
              console.log(`${doc.id}: ${JSON.stringify(doc.data())}`);
      
            });
          })
          .catch((error) => {
            console.error("Error reading Firestore: ", error);
          });
      };


      window.writetobase = function (col, docum, mssg) {
        const theRef = db.collection(col);
        theRef
          .doc(docum)
          .set(mssg)
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      };
