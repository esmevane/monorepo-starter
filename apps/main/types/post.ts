export type PublishablePost = {
  date: Date | number | string;
  title: string;
  content: string;
};

export type DerivedPostContent = {
  id: string;
  contentHtml: string;
};

export type Post = DerivedPostContent & PublishablePost;
export type Posts = Post[];
