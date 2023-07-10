import { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState, AppDispatch } from 'store/store'
import { selectSelectedBlog, saveBlog, archiveBlog, setSelectedBlog } from 'store/blog/slice'
import { Button, ConfirmDialog } from 'components/shared'
import { AddNewBlogDialog } from 'components/AddNewBlogDialog'

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
`

export const BlogActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedBlog = useSelector((state: RootState) => selectSelectedBlog(state.blog))
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)

  const handleOnSubmit = (values: { [key: string]: any }) => {
    dispatch(saveBlog({ title: values.title, description: values.description }))
    setIsAddDialogOpen(false)
  }

  const handleOnArchive = () => {
    dispatch(archiveBlog(selectedBlog?.id ?? ''))
    dispatch(setSelectedBlog(undefined))
  }

  return (
    <>
      <Actions>
        <Button label='Add new blog' onClick={() => setIsAddDialogOpen(true)} />
        <Button label='Archive blog' disabled={!selectedBlog} onClick={() => setIsArchiveDialogOpen(true)} />
      </Actions>
      <AddNewBlogDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} handleOnSubmit={handleOnSubmit} />
      <ConfirmDialog
        isOpen={isArchiveDialogOpen}
        setIsOpen={setIsArchiveDialogOpen}
        title='Archive Blog'
        message='Are you sure you want to archive the selected blog?'
        onAccept={handleOnArchive}
      />
    </>
  )
}
