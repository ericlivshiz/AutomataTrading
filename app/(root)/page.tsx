import AddWorkflowBtn from '@/components/AddWorkflowBtn'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { getWorkflows } from '@/lib/actions/room.actions'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Workflow from './workflows/[id]/page'
import { dateConverter } from '@/lib/utils'
import { DeleteModal } from '@/components/DeleteModal'
import Notifications from '@/components/Notifications'
import { MarketTypeProvider } from '@/context/MarketType'
import WaitlistLandingPage from '@/components/landing-page/WaitlistPage'
import LandingPage from '@/components/landing-page/LandingPage'


// DEVMODE 0 = WAIT LIST LANDING PAGE
// DEVMODE 1 = REAL LANDING PAGE
// DEVMODE 2 = NO LANDING PAGE
const HOMEPAGEDEVMODE = 1;

const Home = async () => {
  // Instead of redirecting to sign in redirect to landing page.
  const clerkUser = await currentUser();
  // if (!clerkUser) redirect('/sign-in');
  if (!clerkUser) {
    if (HOMEPAGEDEVMODE == 0)
    {
      return <WaitlistLandingPage />
    }
    if (HOMEPAGEDEVMODE == 1)
    {
      return <LandingPage/>
    }
    else {
      redirect('/sign-in');
    }
  }

  const roomWorkflows = await getWorkflows(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomWorkflows.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All Workflows</h3>
            <AddWorkflowBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomWorkflows.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/workflows/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image
                      src="/assets/icons/fund-svgrepo-com.svg"
                      alt="file"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/fund-svgrepo-com.svg"
            alt="Workflow"
            width={50}
            height={50}
            className="mx-auto"
          />
          <MarketTypeProvider>
            <AddWorkflowBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </MarketTypeProvider>
        </div>
      )}
    </main>
  )
}

export default Home