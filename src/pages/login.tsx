import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useEffect, useState } from "react"

interface ILogin {
    user: IUser
}

interface IUser {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: { lat: string; lng: string }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export const getServerSideProps: GetServerSideProps<ILogin> = async () => {
    try {
        // const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        // const data = await response.json()

        // console.log('data', data)
        return {
            props: {
                user: {
                    name: 'Daniel',
                    email: '09115817@senaimgdocente.com.br',
                    company: {
                        name: 'Senai'
                    }
                }
            }
        }
    } catch (error) {
        console.error(error.response)
        return {
            props: {
                user: {}
            }
        }
    }
}


export default function Login() {
    // export default function Login({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // console.log('user', user)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    useEffect(() => {
        const usandoApiNext = async () => {
            const response = await fetch('http://localhost:3000/api/user?id=1&nome=daniel&company=Senai&email=09115817@senaimgdocente.com.br')
            const data = await response.json()
            setUser(data)
            console.log(data)
        }
        usandoApiNext()
        setLoading(false)
    }, [])

    console.log('user', user)

    return (
        <>
            {loading ?
                <h1>Carregando</h1> :
                <>
                    <h1>{user && user.nome}</h1>
                    <p>{user && user.email}</p>
                    <p>{user && user.company}</p>
                </>
            }
        </>
    )
}