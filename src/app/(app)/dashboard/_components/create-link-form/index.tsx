'use client';

import { useActionState } from 'react';
import {
  createLink,
  type LinkState,
} from '@/src/app/(app)/dashboard/_actions/links';
import { FormHeader } from './header';
import { UrlInput, SlugInput } from './inputs';
import { FormStatus, SubmitButton } from './feedback';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';

const initialState: LinkState = { message: null, errors: {} };

export default function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(
    createLink,
    initialState
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <FormHeader />
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-6">
          <div className="flex flex-col gap-5">
            <UrlInput error={state?.errors?.originalUrl} />
            <SlugInput />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <FormStatus state={state} />
            </div>
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
