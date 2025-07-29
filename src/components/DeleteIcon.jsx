import styled from "styled-components";

const Icon = styled.svg`
  width: 20px;
  padding-top: 14px;
  cursor: pointer;
  color: hsl(232, 23%, 61%);
  stroke: currentcolor;
  fill: currentcolor;

  &:hover {
    color: rgb(255, 86, 86);
  }
`;

Icon.defaultProps = {
  viewBox: "0 0 1024 1024",
};

const DeleteIcon = () => {
  return (
    <Icon className="project-delete">
      <path d="M837.312 227.584v682.624c0 62.848-50.88 113.792-113.728 113.792h-455.168c-62.81 0-113.728-50.918-113.728-113.728 0-0.023 0-0.045 0-0.068l-0 0.004v-682.624h682.624zM638.272 0l56.832 56.896h199.104v113.792h-796.416v-113.792h199.040l57.024-56.896h284.416z"></path>
    </Icon>
  );
};

export default DeleteIcon;
