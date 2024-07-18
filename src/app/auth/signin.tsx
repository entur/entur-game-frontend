import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'

interface SignInProps {
    providers: Record<string, ClientSafeProvider>
}

const SignIn = ({ providers }: SignInProps) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#121212',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                }}
            >
                <img
                    src="src/lib/assets/images/AdminLogo.png"
                    alt="Entur Logo"
                    style={{ width: '100px', marginBottom: '1rem' }}
                />
                <h1>Logg inn</h1>
                {providers &&
                    Object.values(providers).map((provider) => (
                        <div key={provider.name} style={{ margin: '1rem 0' }}>
                            <button
                                onClick={() => signIn(provider.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#0070f3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Logg inn med {provider.name}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return { props: { providers } }
}

export default SignIn
