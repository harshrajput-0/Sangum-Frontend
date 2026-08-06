// Public API of the posts feature. Other features (a future Profile
// feature, navigation components, etc.) should only import from here
// — never reach into features/posts/{components,hooks,stores,...}
// directly, so internal restructuring doesn't break other features.

export { PostCard } from './components/PostCard/PostCard';
export { UserPostsSection } from './components/UserPosts/UserPostsSection';
export { FeedShell } from './components/Feed/FeedShell';
export { CreatePostModalShell } from './components/CreatePost/CreatePostModalShell';

export { useCreatePostTrigger } from './hooks/useCreatePostTrigger';
export { useUserPosts } from './hooks/useUserPosts';

export type { Post, PostAuthor, PostType } from './types/post.types';
export type { Community } from './types/community.types';