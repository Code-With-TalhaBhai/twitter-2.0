export interface Tweet extends TweetBody {
    _createdAt:  string;
    _id: string;
    _rev: string;
    blockTweet: boolean;
    _type: 'tweet';
    _updatedAt?: string
}

export type TweetBody = {
    tweet: string;
    username: string;
    mainImage: string;
    tweetImage?: string
}


export type CommentBody = {
    comment: string;
    username: string;
    image: string;
    tweet: {
        _ref: string;
        _type: "reference";
    }
}

export interface Comment extends CommentBody {
    _createdAt: string;
    _rev: string;
    _updatedAt: string;
    _id: string;
    _type: "comment";
}


// *[_type == 'comment' && references(*[_type == 'tweet' && _id == "be0b2bdb-6df3-4e0c-84f1-733931cce818"]._id)] {
//     _id,
//     ...
//   }  | order(_createdAt desc)