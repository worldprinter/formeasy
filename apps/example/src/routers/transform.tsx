import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from '@worldprinter/formeasy'
import {z} from 'zod'

const schema = z.object({
  name: z.string().nonempty(),
  age: z.number(),
  realAge: z.number()
})

export default () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    setValue
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'abc',
      age: 123,
      realAge: 1
    },
    transform: {
      name: (value) => value.toUpperCase(),
      realAge: 'number',
      age: 'number',
    },
    reaction: {
      realAge: {
        value: "age + 1"
      },
      age: {
        value: "realAge + 2"
      }
    }
  })
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('name')} />
      <input {...register('age')} />
      <input {...register('realAge')} />
      {errors.name?.message && <p>{errors.name.message as any}</p>}
      <input type='submit'/>
      <button onClick={() => {
        // setValue('age', 1234)
      }
      }>change
      </button>
    </form>
  )
}
