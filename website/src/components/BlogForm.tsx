import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styled from 'styled-components'

import { Grid, Button } from 'components/shared'
import { Input } from 'components/react-hook-form'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  column-gap: 12px;
  row-gap: 12px;
  width: 100%;
`

const Label = styled.h4`
  color: #393939;
  font-size: 16px;
  margin: 5px 0 0 0;
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
    title: yup.string().required('Required').max(100, 'Title should contain a max of 100 characters'),
    description: yup.string().required('Required').max(500, 'Description should contain a max of 500 characters')
  }
)

export const BlogForm = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (values: { [key: string]: any }) => void; }) => {
  const methods = useForm({mode: 'onBlur', defaultValues, resolver: yupResolver(schema)})

  const handleFormSubmit = (values: { [key: string]: any }) => {
    onSubmit(values)
    onClose()
  }

  return (
    <FormProvider {...methods}>
      <Container onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Label>Title:</Label>
        <Input name='title' />
        <Label>Description:</Label>
        <Input name='description' />
        <Buttons>
          <Grid xs={6} justifyContent='center'>
            <Button width='100px' label='Save' type='submit' /> 
          </Grid>
          <Grid xs={6} justifyContent='center'>
            <Button width='100px' label='Cancel' onClick={() => onClose()}/> 
          </Grid>
        </Buttons>
      </Container>
    </FormProvider>
  )
}