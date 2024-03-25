// with data, error and isLoading using vue-query

```bash
npm i @tanstack/vue-query
```

```ts
import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin)
```

```ts
import type { Resolver } from '@trpc/client'
import { useMutation } from '@tanstack/vue-query'

type Mutation<M extends Resolver<any>> = ReturnType<
  typeof useMutation<Awaited<ReturnType<M>>, Error, Parameters<M>[0], unknown>
>

export const useUserStore = defineStore('user', () => {
  const userSignup: Mutation<typeof trpc.userSignup.mutate> = useMutation({
    mutationFn: (userData) => trpc.userSignup.mutate(userData),
    throwOnError: false,
    onError(error) {
      console.log('error', error)
    },
  })

  return {
    userSignup,
  }
})
```