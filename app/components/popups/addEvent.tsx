import styled from "styled-components";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { addNewEvent } from "@/app/dashboard/scheduler/_actions/eventModalActions";
import { ColorCircleProps, WeekdayButtonProps } from "./shared/types";
import InputCourseComponent from "../inputs/popupInput";
import SelectComponent from "../inputs/popupTimeSelect";
import SelectTextComponent from "../inputs/popupTextSelect";
import NotifyToggle from "../inputs/popupCheckBox";

interface BlackenScreenProps {
  $popupOpened: boolean;
}

interface ColorCircleProps {
  $selected: boolean;
  color: string;
}

interface WeekdayButtonProps {
  $active: boolean;
}

const BlackenScreen = styled.div<BlackenScreenProps>`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  transition: all 0.3s ease;
  opacity: ${({ $popupOpened }) => ($popupOpened ? 1 : 0)};
  pointer-events: ${({ $popupOpened }) => ($popupOpened ? "all" : "none")};
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
  justify-content: start;

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

  @media (max-width: 1470px) {
    transform: scale(0.85) translate(-55%, -55%);
  }
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

const ColorCircle = styled.div<ColorCircleProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${({ $selected }) =>
    $selected ? "2px solid white" : "2px solid transparent"};
`;

const WeekdayOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const WeekdayButton = styled.button<WeekdayButtonProps>`
  transition: all 0.3s ease;
  background-color: ${({ $active }) => ($active ? "#282828" : "#545454")};
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
    background-color: ${({ $active }) => ($active ? "#303030" : "#444444")};
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

interface AddEventModalProps {
  onClose: (value: boolean) => void;
  popupOpened: boolean;
  eventType: string;
  onEventAdded?: () => void;
}

interface TimeStamp {
  day: string;
  start: number;
  finish: number;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ 
  onClose, 
  popupOpened, 
  eventType,
  onEventAdded 
}) => {
  const { idToken } = useAuth();
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("#BE0505");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [timeStamps, setTimeStamps] = useState<TimeStamp[]>([]);

  const handleSave = async () => {
    if (!idToken || !newEventTitle.trim()) return;

    const { success, error } = await addNewEvent(idToken, {
      title: newEventTitle,
      timestamps: timeStamps,
      color: selectedColor,
      type: eventType
    });

    if (success) {
      onEventAdded?.();
      onClose(false);
    } else {
      alert(error || "Failed to add event");
    }
  };

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

  const handleDayClick = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((activeDay) => activeDay !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  return (
    <BlackenScreen $popupOpened={popupOpened} onClick={() => onClose(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            <img src="/addEventWhite.svg"></img>Add Event
          </h2>
          <CloseButton onClick={() => onClose(false)}>
            <img src="/close.svg"></img>
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <InputCourseComponent
            title="Title"
            placeHolder="Event Title"
            type="text"
            value={newEventTitle}
            setVariable={setNewEventTitle}
          ></InputCourseComponent>
          <InputCourseComponent
            title="Type"
            placeHolder="course or activity"
            type="text"
            value={eventType}
            setVariable={setEventType}
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
                  $active={activeDays.includes(day)}
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
                  $selected={color === selectedColor}
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
            ></SelectComponent>
          ))}
        </TimeSelectContainer>

        <SaveButton onClick={handleSave}>Add Event</SaveButton>
      </ModalContainer>
    </BlackenScreen>
  );
};

export default AddEventModal;
