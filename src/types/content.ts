export type DesignObject = {
  id: string;
  name: string;
  category: string;
  description: string;
  material: string;
  dimensions: string;
  edition: string;
  leadTime: string;
  price: string;
  x: number;
  y: number;
};
export type Chapter = { number: string; title: string; text: string };

export type ConsultationRequest = {
  name: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  brief: string;
  projectType: string;
  stage: string;
};
