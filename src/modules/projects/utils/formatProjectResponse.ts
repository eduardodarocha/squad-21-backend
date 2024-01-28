import { Project } from '../infra/typeorm/entities/Project';

interface FormattedProject {
  id: string;
  user_name: string;
  title: string;
  tags: string;
  link: string;
  description: string;
  image_url: string;
  created_at: Date;
}

export function formatProjectResponse(
  listProjects: Project[],
): FormattedProject[] {
  return listProjects.reduce((project: any, projects: any[]) => {
    const newProject = {
      id: project.id,
      user_name: `${project.user.name} ${project.user.lastname}`,
      title: project.title,
      tags: project.tags,
      link: project.link,
      description: project.description,
      image_url: project.image_url,
      created_at: project.created_at,
    };

    projects.push(newProject);

    return projects;
  }, []);
}
