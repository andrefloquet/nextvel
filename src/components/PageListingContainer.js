import PageContainer from '@/components/PageContainer'

export default function PageListingContainer({ children }) {
    return (
        <PageContainer>
            <div className="relative pt-2 lg:pt-2 min-h-screen">
                <div className="bg-cover w-full flex justify-center items-center">
                    <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                        <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}