import Header from "@/component/Header";
import KaKaoMapWithCheckPosition from "@/component/KakaoMapWithCheckPosition";
import RunningGoal from "@/component/running/RunningGoal";
import RunningMenu from "@/component/running/RunningMenu";

export default function Home() {
  return (
    <>
     <Header>
      <h2>러닝</h2>
     </Header>
     <main className="relative w-full h-[calc(100dvh-7.7rem)] overflow-hidden">
        <RunningGoal className="flex flex-col font-bold text-2xl absolute z-100 top-20 right-[50%] translate-[50%] w-[50%] max-w-[20rem]"/>
        <RunningMenu className="absolute z-100 bottom-20 right-[50%] translate-[50%]"/>
        <KaKaoMapWithCheckPosition className="absolute inset-0 mask-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_75%)]"/> 
      </main>
    </>
  );
}
