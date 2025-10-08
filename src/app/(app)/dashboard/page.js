import Header from '@/app/(app)/Header'
import PageContainer from '@/components/PageContainer'

export const metadata = {
    title: 'Andre Floquet - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <PageContainer>
                You are logged in!
            </PageContainer>
        </>
    )
}

export default Dashboard