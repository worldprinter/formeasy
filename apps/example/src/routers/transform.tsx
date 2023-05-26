import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from '@worldprinter/formeasy'
import { z } from 'zod'

const schema = z.object({
    name: z.string().nonempty(),
    age: z.string(),
})

export default () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: 'abc',
            age: '123',
        },
        transform: {
            name: (value) => value.toUpperCase(),
            age: 'number',
        },
    })
    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input {...register('name')} />
            <input {...register('age')} />
            {errors.name?.message && <p>{errors.name.message as any}</p>}
            <input type='submit' />
        </form>
    )
}
