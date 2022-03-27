import { Dropdown, Menu, Table } from "antd";
import { User } from "./Searchpanel";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { Link } from "react-router-dom";
import { ButtonNoPadding } from "components/lib";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}
const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "department",
          dataIndex: "organization",
        },
        {
          title: "manager",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "start up",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "none"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>{props.projectButton}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
export default List;
