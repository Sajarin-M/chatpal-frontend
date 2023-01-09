import { useForm } from 'react-hook-form';
import { Stack } from '@mantine/core';
import { trpc } from '$context/trpc';
import { SubmitButton, TextInput } from '$components/form';

export default function Login() {
  const { mutate } = trpc.users.login.useMutation({
    onSuccess: ({ user }) => {
      console.log(user);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
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
        <TextInput control={control} name='username' label='Email' />
        <TextInput control={control} name='password' label='Password' />
        <SubmitButton control={control}>Signup</SubmitButton>
      </Stack>
    </form>
  );
}
