import { useSelector, useDispatch } from 'react-redux'

import type { RootState, AppDispatch } from 'store/store'
import { PostCard } from 'components/PostCard'
import { AddComment } from 'components/AddComment'
import { ScrollableList } from 'components/shared'
import { postToBlog, selectSelectedBlog } from 'store/blog/slice'

export const CommentList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedBlog = useSelector((state: RootState) => selectSelectedBlog(state.blog))

  const handlePostToBlogOnClick = (comment: string) => {
    const post = {
      blogId: selectedBlog ? selectedBlog.id : '',
      comment: comment
    }
    dispatch(postToBlog(post))
  }

  const postList = !selectedBlog ? [] : selectedBlog.posts.map(post =>
    <PostCard key={post.id} post={post} />
  )

  return (
    <>
      <ScrollableList title='Comments' list={postList} />
      <AddComment onButtonClick={handlePostToBlogOnClick} disabled={!selectedBlog} />
    </>
  )
}
