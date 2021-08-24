import { User } from "./user";

export class Message {

  id: number;
  subject: string;
  content: string;
  createTime: string;
  viewed: boolean;
  active: boolean;
  sendingUser: User;
  receivingUser: User;
  // inReplyToMessage: Message;
  replies: Message [];

  constructor(
    id: number = 0,
    subject: string = '',
    content: string = '',
    createTime: string = '',
    viewed: boolean = false,
    active: boolean = true,
    sendingUser: User = new User(),
    receivingUser: User = new User(),
    // inReplyToMessage: Message = new Message(),
    replies: Message [] = []
  )

  {

    this.id = id;
    this.subject = subject;
    this.content = content;
    this.createTime = createTime;
    this.viewed = viewed;
    this.active = active;
    this.sendingUser = sendingUser;
    this.receivingUser = receivingUser;
    // this.inReplyToMessage = inReplyToMessage;
    this.replies = replies;

  }


}
