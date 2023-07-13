import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import Sample from '../components/Sample'


export default function Home() {
  const { data: session, status } = useSession();

  if (status == "loading") {
		return <div>Loading</div>;
	}

  if(localStorage && session) {
    localStorage.setItem("accessToken", session.accessToken);
  }

  return (
    <div>
      <Head>
        <title>Next-Auth Refresh Tokens</title>
      </Head>

      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <Sample></Sample>
          <br></br>
          <button onClick={signOut}>Sign out</button>
        </>
      )}

      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
