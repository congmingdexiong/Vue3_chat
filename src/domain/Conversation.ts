export interface Conversation {
  id: string;
  label: string;
  createdTime: string;
  aiType: string;
  prepare_1?: string;
  prepare_2?: string;
  editStatus?: boolean;
}

export type FormattedData = {
  date: string;
  content: Conversation[];
};
