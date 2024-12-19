'use client'

import globalStore from "@/app/(user-area)/_store";


export default function CoursePage({ params }: { params: { uid: string } }) {
    const {courses} = globalStore();
    const course = courses.find((course) => course.uid === params.uid);
  
    if (!course) {
      return <div>Course not found</div>;
    }
  
    return (
      <div style={{marginTop: '100px'}}>
        <h1>{course.title}</h1>
      </div>
    );
  }