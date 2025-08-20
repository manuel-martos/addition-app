export interface PageHeaderInfo {
  title: string;
  lead: string;
  description: string;
}

export interface PageHeaderProps {
  info: PageHeaderInfo;
}

export default function PageHeader({ info }: PageHeaderProps) {
  return (
    <>
      <h1 className="display-4">{info.title}</h1>
      <p className="lead">{info.lead}</p>
      <hr className="my-4" />
      <p>{info.description}</p>
    </>
  );
}
