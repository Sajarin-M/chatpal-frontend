import { Control, FieldValues, useFormState } from 'react-hook-form';
import { Button, ButtonProps, Tooltip } from '@mantine/core';
import type { PolymorphicComponentProps } from '@mantine/utils';

type Props<T extends FieldValues> = Omit<
  PolymorphicComponentProps<'button', ButtonProps>,
  'type'
> & {
  control: Control<T>;
};

export default function SubmitButton<T extends FieldValues>({
  control,
  children,
  loading,
  onClick,
  ...rest
}: Props<T>) {
  const { isSubmitting, isDirty } = useFormState({
    control,
  });
  return (
    <Tooltip
      withArrow
      withinPortal
      openDelay={1000}
      disabled={isDirty}
      label='Change something to save'
    >
      <Button
        {...rest}
        type='submit'
        loading={loading || isSubmitting}
        onClick={(e) => {
          if (isDirty) {
            onClick?.(e);
          } else {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
