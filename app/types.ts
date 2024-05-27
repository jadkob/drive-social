export interface Post {
  _id: String;
  author: String;
  name: String;
  country: String;
  location: String;
  rsvps: String[];
  date: String;
}
export interface User {
  username: String;
  password: String;
  followers: String[];
  following: String[];
  posts: String[];
  country: String;
  location: String;
  createdAt: Date;
}
