export interface IMessageInterface {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  image: string;
  message_type: string;
  is_read: boolean;
  read_at: undefined;
  deleted_at: undefined;
  created_at: string;
  updated_at: string;
}
export interface IFetchingInterface {
  success: true;
  messages: IMessageInterface[];
}
