export interface ISubscription {
  id: number;
  amount: number;
  date_to: string;
  date_from: string;
  description: string;
  category?: any;
  title: string;
}
