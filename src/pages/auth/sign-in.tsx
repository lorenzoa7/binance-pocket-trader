import { getAccountInformation } from '@/api/get-account-information'
import BinanceIcon from '@/components/icons/binance-icon'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { SignInSchema, signInSchema } from '@/schemas/sign-in-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function SignIn() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      apiKey: '',
      secretKey: '',
      isTestnetAccount: false,
    },
  })

  async function handleSignIn(data: SignInSchema) {
    const account = await getAccountInformation(data.apiKey, data.secretKey)
    console.log(account)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6">
      <div className="flex items-baseline gap-2">
        <BinanceIcon width={20} height={20} />
        <h1 className="text-2xl font-semibold text-slate-50">
          <span className="text-amber-400">binance's</span> pocket trader
        </h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(handleSignIn)}
        >
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your API key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secretKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your secret key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isTestnetAccount"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel className="pb-2">
                  Connect into a testnet account
                </FormLabel>
              </FormItem>
            )}
          />

          <Button variant="secondary" type="submit">
            Start using now
            <ChevronRight className="ml-2 size-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
