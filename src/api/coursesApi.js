import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Importa los métodos necesarios de Firestore
import { initializeApp } from 'firebase/app'; // Importa initializeApp de firebase/app
import firebase from './firebase'; // Importa directamente el archivo firebase.js

// Inicializa Firebase con la configuración
initializeApp(firebase);

// Función para obtener los cursos desde Firestore
export const getCoursesFromFirestore = async () => {
  const db = getFirestore(); // Obtiene una instancia de Firestore

  try {
    const querySnapshot = await getDocs(collection(db, 'cursos')); // Obtiene todos los documentos de la colección 'cursos'
    const courses = querySnapshot.docs.map(doc => {
      const courseData = { id: doc.id, ...doc.data() };
      console.log('Descripción del curso:', courseData.description); // Registra la descripción del curso en la consola
      return courseData;
    }); // Mapea los documentos a un array de objetos con los datos de cada curso
    return courses; // Retorna los cursos obtenidos desde Firestore
  } catch (error) {
    console.error('Error getting documents:', error); // Maneja cualquier error que pueda ocurrir
    return []; // Retorna un array vacío en caso de error
  }
};
