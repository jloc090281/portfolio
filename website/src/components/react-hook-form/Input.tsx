import { useController } from 'react-hook-form'

import { Input } from 'components/shared'

interface Props {
  name: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
}

const HookFormInput =({ name, onChange, onBlur, ...otherProps }: Props) => {
  const { field, fieldState } = useController({ name });

  const handleOnChange = (event: any) => {
    field.onChange(event)
    onChange && onChange(event)
  }

  const handleOnBlur = () => {
    field.onBlur()
    onBlur && onBlur()
  }

  const error = fieldState.error

  return (
    <Input
      {...otherProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      value={field.value}
      helperText={error?.message}
      ref={field.ref}
    />
  );
}

export default HookFormInput
