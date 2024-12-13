import styled from "styled-components";

const NotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  background-color: #413B44;
  padding: 16px;
  border-radius: 10px;
  width: 100%;
  max-height: 144px;
  color: white;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 12px;
    opacity: 0.5;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;
  margin-right: 24px;

  p {
    font-size: 16px;
    font-weight: 700;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 24px;
  }
`;

const NotificationMessage = styled.p`
  max-width: 268px;
  font-size: 12px;
  font-weight: 500;
`;

const NotificationTimestamp = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: end;
`;

type NotificationCardProps = {
  title: string;
  message: string;
  timestamp: string;
};

const NotificationCardComponent = ({
  title,
  message,
  timestamp,
}: NotificationCardProps) => {
  return (
    <NotificationCard>
      <img className="close" src="/close.svg"></img>

      <NotificationHeader>
        <img src="/warning.svg"></img>

        <p>{title}</p>
      </NotificationHeader>

      <NotificationMessage>{message}</NotificationMessage>

      <NotificationTimestamp>{timestamp}</NotificationTimestamp>
    </NotificationCard>
  );
};

export default NotificationCardComponent;
