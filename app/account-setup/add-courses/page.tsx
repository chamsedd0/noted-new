'use client'


import styled from "styled-components";
import { Key, useState } from "react";
import Footer from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/button/nextButton";
import AddButtonComponent from "@/app/components/button/addButton";


import InputCourseComponent from "@/app/components/input/inputCourse";
import { createCourse } from "./_actions/createCourseAction";
import { addUserCourseIdsAction } from "./_actions/addUserCourseIdsAction";



const Box = styled.div`

  background-color: #383838;
  width: 100vw;
  height: 100vh;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 60px;
  

  @media (max-width: 1470px) {
        padding-bottom: 60px;
        padding-top: 40px;
        gap: 40px;
    }


`

const Form = styled.div`

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 50%;

    

    .introduction {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        h2 {
            font-size: 40px;
            font-weight: 700;

            @media (max-width: 1470px) {
                font-size: 32px;
            }
        }
        p{
            font-size: 16px;
            font-weight: 400;
            max-width: 480px;

            @media (max-width: 1470px) {
                font-size: 14px;
            }
        }

    }


`


const Logo = styled.img`

    position: absolute;
    width: 165px;
    top: 40px;
    right: 30px;

    @media (max-width: 1000px){
        width: 125px;
        
    }

`


const InputsContainer = styled.div`

    display: flex;
    align-items: end;
    justify-content: center;
    gap: 24px; /* Space between form items */
    
    width: 100%;
    
    
    

`

const CourseList = styled.div`
  
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  padding: 10px;

  /* there is a problem with too many courses */
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  transition: all 0.3s ease;
`;

const RemoveButtonComponent = styled.button`
    border: none;
    background-color: transparent;
    text-decoration: underline;
    font-size: 16px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s ease;

    

    &:hover {
        opacity: 1;
    }
`;

export default function AddCoursePage() {

    const [newCourseName, setNewCourseName] = useState<string>('');
    const [courseNames, setCourseNames] = useState<string[]>([]);

    

    const handleAddCourse = () => {

      if(newCourseName !== ''){
        setCourseNames([...courseNames, newCourseName]);
      } else {
        alert('Course name can not be empty');
      }

      setNewCourseName('');
        
    };

    const handleRemoveCourse = (name: string) => {
        setCourseNames(courseNames.filter((courseName) => courseName !== name));
    };

    const handleAddingCoursesToUsers = async () => {
      
      // Creating Courses from CourseNames and Storing them in db
      const ids: string[] = [];

      try {

        const promises = courseNames.map(async (courseName) => {
            const id = await createCourse({title: courseName, color: 'gray'});
            ids.push(id);

        })

        await Promise.all(promises);

      
        // Adding course Ids to user
        await addUserCourseIdsAction(ids);
        
      } catch (error) {
        console.error("Error adding courses:", error);
        alert("Failed to add courses. Please try again.");
      }

        

        

        

    }

  return (
    <Box>

    <Logo src="/logo.svg"></Logo>


        <Form>

            <div className="introduction">
                <h2>Add your courses</h2>
                <p>Add the name of the courses you are taking, so we can find more personalized information</p>
            </div>

            <InputsContainer>

                <InputCourseComponent setVariable={setNewCourseName} title='Course Name' value={newCourseName} placeHolder='Data Structures and algorithms' type='text'></InputCourseComponent>
                <AddButtonComponent f={handleAddCourse}></AddButtonComponent>

            </InputsContainer>

            <CourseList>
                {courseNames.map((courseName: string, index: Key) => (
                <CourseItem key={index}>
                    <p>{courseName}</p>
                    <RemoveButtonComponent onClick={()=>handleRemoveCourse(courseName)}>Remove</RemoveButtonComponent>
                </CourseItem>
                ))}
            </CourseList>
            
            <NextButtonComponent event={() => handleAddingCoursesToUsers()}></NextButtonComponent>
        </Form>

       <Footer></Footer>
        

    </Box>
  );
}