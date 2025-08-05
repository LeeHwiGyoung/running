import BackButton from "@/component/BackButton";
import { DetailRunCardSkeleton } from "@/component/dashboard/skeleton/DetailRunCardSkeleton";
import { DetailRunPerformanceViewSkeleton } from "@/component/dashboard/skeleton/DetailRunPerformanceViewSkeleton";
import Header from "@/component/Header";

export default function Loading() {
  return (
    <main>
      {/* BackButton과 Header는 데이터 로딩과 별개이므로 그대로 표시합니다. */}
      <Header className='w-full mb-4' borderBottomShadow={true}>
        <BackButton />
      </Header>

      {/* 데이터가 로드되는 동안 스켈레톤 컴포넌트를 보여줍니다. */}
      <DetailRunCardSkeleton />
      <section className='mb-18'>
        <DetailRunPerformanceViewSkeleton />
      </section>
    </main>
  );
}
