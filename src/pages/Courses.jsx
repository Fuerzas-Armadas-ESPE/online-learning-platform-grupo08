import { useEffect, useState } from "react";
import { getCoursesFromFirestore } from "../api/coursesApi"; // Importa la función para obtener los cursos desde Firestore

const Courses = () => {
  const [courses, setCourses] = useState([]); // Estado para almacenar los cursos obtenidos desde Firestore

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCoursesFromFirestore(); // Obtiene los cursos desde Firestore
      // Convierte la marca de tiempo "create" a formato de fecha
      const formattedCourses = coursesData.map((course) => ({
        ...course,
        create: course.create.toDate(),
      }));
      setCourses(formattedCourses); // Actualiza el estado con los cursos obtenidos
    };

    fetchCourses(); // Ejecuta la función para obtener los cursos al montar el componente
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.title}</h2> {/* Título del curso */}
            <p style={{ textAlign: "justify" }}>
              Description: {course.description}
            </p>
            {/* Descripción del curso */}
            <p>Instructor: {course.instructor}</p> {/* Instructor del curso */}
            <p>Created: {new Date(course.create).toLocaleString()}</p>{" "}
            {/* Fecha de creación del curso */}
            <p>
              URL: <a href={course.url}>{course.url}</a>
            </p>{" "}
            {/* URL del curso */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
