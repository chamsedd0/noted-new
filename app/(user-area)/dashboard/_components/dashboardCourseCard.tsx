import BookMark from "./bookmark";
import { CourseCardProps } from "../types";
import {
  CourseDashboardCard,
  CardHeader,
  Title,
  NotesInfo,
  CardFooter,
  LastModified,
  DropdownMenu,
} from "./_styles/dashboardCouseCard";

const CourseDashboardCardComponent = ({
  title,
  regularNotes,
  smartNotes,
  color,
  lastModified,
  clickFunction,
  setEdit,
  setSelectedCourse,
  onDelete,
  isDropdownOpen,
  setDropdownOpen,
}: CourseCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onDelete();
  };

  return (
    <CourseDashboardCard onClick={() => clickFunction(title)}>
      <CardHeader>
        <div>
          <Title>{title}</Title>
          <NotesInfo>
            {smartNotes} Smart Notes, {regularNotes} Regular Notes
          </NotesInfo>
        </div>
        <div id="bookmark">
          <BookMark color={color}></BookMark>
        </div>
      </CardHeader>

      <CardFooter onClick={(e) => e.stopPropagation()}>
        <LastModified>
          Last modified: <span>{lastModified}</span>
        </LastModified>
        <div className="dots" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <img src="/menuDots.svg" alt="menu" />
        </div>
        <DropdownMenu isOpen={isDropdownOpen}>
          <button
            onClick={() => {
              setDropdownOpen(false);
              setSelectedCourse(title);
              setEdit(true);
            }}
          >
            <img src="/editCourses.svg" />
            Edit
          </button>

          <button id="delete" onClick={handleDelete}>
            <img src="/trash.svg" />
            Delete
          </button>
        </DropdownMenu>
      </CardFooter>
    </CourseDashboardCard>
  );
};

export default CourseDashboardCardComponent;
