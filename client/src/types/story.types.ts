export interface StoryContent {
  title: string;
  content: string;
  tags: string[];
  img: string;
}

export interface Comment {
  _id?: string;
  userName: string;
  uid: string;
  comment: string;
  commentedAt: string;
  avatar: string;
}

export interface Story {
  _id: string;
  uid: string;
  userName: string;
  createdAt: string;
  likes: string[];
  views: number;
  story: StoryContent;
  comments: Comment[];
}

export interface TagResult {
  _id: string;
  totalStories?: number;
  count?: number;
}
