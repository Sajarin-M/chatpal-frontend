import { useForm } from 'react-hook-form';
import { Stack } from '@mantine/core';
import { trpc } from '$context/trpc';
import { SubmitButton, TextInput } from '$components/form';

export default function Signup() {
  const { mutate } = trpc.users.signup.useMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        mutate(values);
      })}
    >
      <Stack>
        <TextInput control={control} name='name' label='Name' />
        <TextInput control={control} name='email' label='Email' />
        <TextInput control={control} name='password' label='Password' />
        <SubmitButton control={control}>Signup</SubmitButton>
      </Stack>
    </form>
  );
}
