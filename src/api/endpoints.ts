export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    SIGNOUT: '/signout',
  },
  POSTS: {
    TIMELINE: '/tl',
    NEW: '/p/new',
    DELETE: '/p/delete',
    EDIT: '/p/edit',
    LIKE: '/p/like',
    RETWEET: '/p/retweet',
    SEARCH: '/p/search',
    REPLY: '/p/reply',
  },
} as const;