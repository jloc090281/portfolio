import { useState } from 'react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Grid, Button, Modal } from 'components/shared'
import { Input } from 'components/react-hook-form'

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Container = styled.div`
  background-color: #FFF;
  width: calc(100vw - 4rem);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5b5b5b;
  padding: 1rem;
  border-radius: 5px;
  overflow-y: auto;
`

const Title = styled.span`
  color: #393939;
  font-size: 23px;
  font-weight: 700;
  line-height: normal;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  column-gap: 12px;
  row-gap: 12px;
  width: 100%;
`

const Buttons = styled.div`
  display: flex;
  column-gap: 12px;
`

const defaultValues = {
  title: "",
  description: ""
}

const schema = yup.object().shape(
  {
    title: yup.string().required('Required').max(10, 'Title should contain a max of 100 characters'),
    description: yup.string().required('Required').max(500, 'Description should contain a max of 500 characters')
  }
)

const BlogForm = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (values: { [key: string]: any }) => void; }) => {
  const methods = useForm({mode: 'onBlur', defaultValues, resolver: yupResolver(schema)})

  const handleFormSubmit = (values: { [key: string]: any }) => {
    onSubmit(values)
    onClose()
  }

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Input name='title' />
        <Input name='description' />
        <Buttons>
          <Grid xs={6} justifyContent='center'>
            <Button width='100px' label='Save' type='submit' /> 
          </Grid>
          <Grid xs={6} justifyContent='center'>
            <Button width='100px' label='Cancel' onClick={() => onClose()}/> 
          </Grid>
        </Buttons>
      </FormContainer>
    </FormProvider>
  )
}

interface Props {
  onSubmit?: (values: { [key: string]: any }) => void;
}

export const AddBlogDialog = ({ onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Actions>
        <Button label='Add new blog' onClick={() => setIsOpen(true)} />
      </Actions>
      <Modal enableCloseOnEscape={true} open={isOpen} onClose={() => setIsOpen(false)}>
        <Container>
          <Title>Add new Blog</Title>
          <BlogForm onClose={() => setIsOpen(false)} onSubmit={onSubmit ?? ((values: { [key: string]: any }) => console.log('values', values))}/>
        </Container>
      </Modal>
    </>
  )
}
