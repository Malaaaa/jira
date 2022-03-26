import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "components/lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Collect</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type={"link"}
      >
        Create Project
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>Project</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
