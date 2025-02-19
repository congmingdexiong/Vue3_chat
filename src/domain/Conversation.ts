export interface Conversation {
  id: string;
  label: string;
  createdTime: string;
  prepare_1?: string;
  prepare_2?: string;
}

export type FormattedData = {
  date: string;
  content: Conversation[];
};
