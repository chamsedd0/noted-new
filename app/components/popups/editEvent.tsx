// components/EditEventModal.js
import styled from "styled-components";
import { useState, useEffect } from "react";
import InputCourseComponent from "../inputs/popupInput";
import SelectComponent from "../inputs/popupTimeSelect";

import SelectTextComponent from "../inputs/popupTextSelect";
import NotifyToggle from "../inputs/popupCheckBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { db } from "../../firebase"; // Adjust the path as needed
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth";
import { editEvent } from "@/app/dashboard/scheduler/_actions/eventModalActions";

const BlackenScreen = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  transition: all 0.3s ease;

  opacity: ${(props) => (props.popupOpened ? 1 : 0)};
  pointer-events: ${(props) => (props.popupOpened ? "all" : "none")};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #444444;
  border-radius: 10px;
  padding: 20px;
  max-width: 620px;
  min-width: 620px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  @media (max-width: 1470px) {
    transform: scale(0.85) translate(-55%, -55%);
  }

  span {
    font-size: 16px;
    font-weight: 600;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  /* @media (max-width: 1470px) {
      transform: scale(0.7) translate(-70%, -70%);
   } */
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  img {
    width: 20px;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 270px;
`;

const ColorCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.selected ? "2px solid white" : "2px solid transparent"};
`;

const WeekdayOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const WeekdayButton = styled.button`
  transition: all 0.3s ease;
  background-color: ${(props) => (props.active ? "#282828" : "#545454")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.active ? "#303030" : "#444444")};
  }
`;

const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  width: 155px;
  padding: 12px;
  height: 48px;
  background-color: white;
  align-self: end;
  color: #383838;
  border: none;
  border-radius: 100px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #bcbcbc;
  }
`;

const Settings = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

function keepLastOccurrencesByTitle(data) {
  const seenTitles = new Set();
  const result = [];

  // Loop through the array from the end
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    if (!seenTitles.has(item.day)) {
      // Add the item to result if the title hasn't been seen yet
      seenTitles.add(item.day);
      result.push(item);
    }
  }

  // Reverse the result array to keep the original order of last occurrences
  return result.reverse();
}

interface EditEventModalProps {
  onClose: (value: boolean) => void;
  popupOpened: boolean;
  courseTitle: string | null;
  eventType: string;
  eventIndex: number;
  onEventUpdated?: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  onClose,
  popupOpened,
  courseTitle,
  eventType,
  eventIndex,
  onEventUpdated
}) => {
  const { idToken } = useAuth();
  const [activeDays, setActiveDays] = useState([]);

  const [selectedColor, setSelectedColor] = useState("#BE0505");

  const [userCourses, setUserCourses] = useState([]);
  const [userActivities, setUserActivities] = useState([]);

  const [user, setUser] = useState(null);

  const auth = getAuth();

  const [timeStamps, setTimeStamps] = useState([]);
  const colors = [
    "#BE0505",
    "#FF6B35",
    "#FFAB35",
    "#3C9437",
    "#4B6EE3",
    "#244BCB",
    "#9747FF",
    "#840000",
  ];
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Toggle days on click
  const handleDayClick = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((activeDay) => activeDay !== day)); // Deselect if already active
    } else {
      setActiveDays([...activeDays, day]); // Add day if not active
    }
  };

  const handleFilter = async (e) => {
    let temp = keepLastOccurrencesByTitle(timeStamps);

    setTimeStamps(temp);

    const userRef = doc(db, "users", user.uid);

    try {
      // Fetch the current user data
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (eventType === "course") {
          // Find and update the specific course's timeStamps
          const updatedCourses = userData.courses.map((course) => {
            if (course.title === courseTitle) {
              return {
                title: courseTitle,
                timestamps: temp || timeStamps,
                color: selectedColor || course.color,
              };
            }
            return course;
          });

          // Update Firestore with the modified courses array
          await updateDoc(userRef, { courses: updatedCourses });
          console.log("Course timeStamps updated successfully.");
          onClose(false);
        }

        if (eventType === "activity") {
          // Find and update the specific course's timeStamps
          const updatedActivities = userData.activities.map((activity) => {
            if (activity.title === courseTitle) {
              return {
                title: courseTitle,
                timestamps: temp || activity.timestamps,
                color: selectedColor || activity.color,
              };
            }
            return activity;
          });

          // Update Firestore with the modified courses array
          await updateDoc(userRef, { activities: updatedActivities });
          console.log("Course timeStamps updated successfully.");
          onClose(false);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error updating course timeStamps:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserCourses(userDoc.data().courses);
          setUserActivities(userDoc.data().activities);
          if (courseTitle !== undefined && eventType === "course") {
            let course = userDoc
              .data()
              .courses.find((course) => course.title === courseTitle);
            if (course) {
              setTimeStamps(course.timestamps);
              setActiveDays(course.timestamps.map((item) => item.day));
            }
          }
          if (courseTitle !== undefined && eventType === "activity") {
            let activity = userDoc
              .data()
              .activities.find((activity) => activity.title === courseTitle);
            if (activity) {
              setTimeStamps(activity.timestamps);
              setActiveDays(activity.timestamps.map((item) => item.day));
            }
          }
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    fetchUserData();

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth, user, db, courseTitle, eventType]);

  useEffect(() => {
    const filteredTimeStamps = timeStamps.filter((item) =>
      activeDays.includes(item.day)
    );

    // Update the timeStamps state only if there are any changes
    if (filteredTimeStamps.length !== timeStamps.length) {
      console.log(filteredTimeStamps);
      setTimeStamps(filteredTimeStamps);
    }
  }, [activeDays, timeStamps]);

  const handleSave = async () => {
    if (!idToken || !courseTitle) return;

    const { success, error } = await editEvent(idToken, eventIndex, {
      title: courseTitle,
      color: selectedColor,
      // ... other updates
    });

    if (success) {
      onEventUpdated?.();
      onClose(false);
    } else {
      alert(error || "Failed to update event");
    }
  };

  return (
    <BlackenScreen popupOpened={popupOpened} onClick={() => onClose(false)}>
      <ModalContainer
        popupOpened={popupOpened}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <h2>
            <img src="/editCourses.svg"></img>Edit Event
          </h2>
          <CloseButton onClick={() => onClose(false)}>
            <img src="/close.svg"></img>
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputCourseComponent
            title="Title"
            placeHolder={courseTitle}
            type="text"
            value={courseTitle}
            setVariable={console.log}
          ></InputCourseComponent>
          <InputCourseComponent
            title="Short Description"
            placeHolder={courseTitle}
            type="text"
            setVariable={console.log}
          ></InputCourseComponent>
        </InputContainer>

        <Settings>
          <SelectTextComponent title="Repeats on"></SelectTextComponent>

          <div>
            <span>Weekday</span>
            <WeekdayOptions>
              {weekdays.map((day) => (
                <WeekdayButton
                  key={day}
                  active={activeDays.includes(day)}
                  onClick={() => handleDayClick(day)}
                >
                  {day.charAt(0)}
                </WeekdayButton>
              ))}
            </WeekdayOptions>
          </div>
        </Settings>

        <Settings>
          <div>
            <span>Color</span>
            <ColorOptions>
              {colors.map((color) => (
                <ColorCircle
                  key={color}
                  color={color}
                  selected={color === selectedColor}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </ColorOptions>
          </div>

          <NotifyToggle
            title="Notify"
            message="Notify me before the event"
          ></NotifyToggle>
        </Settings>

        <TimeSelectContainer>
          {activeDays.map((activeDay, index) => (
            <SelectComponent
              key={index}
              title={activeDay}
              timeStamps={timeStamps}
              setTimeStamps={setTimeStamps}
              userCourses={userCourses} // Pass user courses
              userActivities={userActivities}
            ></SelectComponent>
          ))}
        </TimeSelectContainer>

        <SaveButton onClick={handleSave}>Save changes</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
};

export default EditEventModal;
