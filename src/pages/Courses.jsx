import React, { useState, useEffect } from "react";
import { getCoursesFromFirestore } from "../api/coursesApi";
import { Input, Card, CardContent, Typography, Link, Select, MenuItem, Button } from "@mui/material";
import "../App.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState("title"); // Default sorting by title

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCoursesFromFirestore();
      const formattedCourses = coursesData.map((course) => ({
        ...course,
        create: course.create.toDate(),
        isFavorite: false
      }));
      setCourses(formattedCourses);
      setFilteredCourses(formattedCourses);
    };

    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.instructor.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    let sortedCourses;
    if (e.target.value === "create") {
      sortedCourses = [...filteredCourses].sort((a, b) => new Date(a.create) - new Date(b.create));
    } else {
      sortedCourses = [...filteredCourses].sort((a, b) => a[e.target.value].localeCompare(b[e.target.value]));
    }
    setFilteredCourses(sortedCourses);
  };

  const handleFavorite = (id) => {
    const updatedCourses = courses.map(course => {
      if (course.id === id) {
        return { ...course, isFavorite: !course.isFavorite };
      }
      return course;
    });
    setCourses(updatedCourses);
    // Reordenar los cursos para que los favoritos estén primero
    const sortedCourses = updatedCourses.sort((a, b) => (b.isFavorite ? 1 : -1));
    setFilteredCourses(sortedCourses);
  };

  return (
    <div>
      <h1>Courses</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Input
          type="text"
          placeholder="Buscar un curso"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px",
            border: "none",
            marginRight: "10px",
          }}
        />
        <Select
          value={sortBy}
          onChange={handleSortChange}
          style={{ backgroundColor: "#333", color: "#fff", borderRadius: "5px", padding: "8px", border: "none", width: "150px" }}
        >
          <MenuItem value="title">Ordenar por Título</MenuItem>
          <MenuItem value="instructor">Ordenar por Instructor</MenuItem>
          <MenuItem value="create">Ordenar por Fecha de Creación</MenuItem>
        </Select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={{ position: "relative" }}>
            <Card sx={{ backgroundColor: "#f5f5f5", transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(course.create).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  URL: <Link href={course.url}>{course.url}</Link>
                </Typography>
                <Button onClick={() => handleFavorite(course.id)}>{course.isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</Button>
              </CardContent>
            </Card>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, opacity: 0, transition: "opacity 0.2s ease-in-out" }}>
              <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(course.create).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  URL: <Link href={course.url}>{course.url}</Link>
                </Typography>
                <p></p>
                <Button
                  className="custom-button"
                  onClick={() => handleFavorite(course.id)}
                >
                  {course.isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                </Button>

              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
