// DetailRunPerformaceView와 유사한 모양의 스켈레톤 컴포넌트
export function DetailRunPerformanceViewSkeleton() {
  return (
    <div className='p-4 animate-pulse'>
      {/* 지도 영역 */}
      <div className='w-full h-[200px] bg-gray-200 rounded-lg'></div>
      {/* 버튼 영역 */}
      <div className='flex gap-4 mt-4'>
        <div className='grow-1 h-16 bg-gray-200 rounded-md'></div>
        {/* <div className='grow-1 h-16 bg-gray-200 rounded-md'></div> */}
      </div>
      {/* 그래프 영역 */}
      <div className='w-full h-[400px] mt-4 bg-gray-200 rounded-lg'></div>
    </div>
  );
}
