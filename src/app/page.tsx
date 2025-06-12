import KaKaoMapWithCheckPosition from "@/component/KakaoMapWithCheckPosition";
import RunningGoalInput from "@/component/running/RunningGoalInput";
import RunningMenu from "@/component/running/RunningMenu";

export default function Home() {

  return (
    <>
     <header className="py-4">
        <h2 className="font-bold text-lg p-2">러닝</h2>
     </header>
     <main className="relative w-full h-[calc(100dvh-7.7rem)] overflow-hidden">
        <RunningGoalInput className="absolute z-100 top-20 right-[50%] translate-[50%]"/>
        <RunningMenu className="absolute z-100 bottom-20 right-[50%] translate-[50%]"/>
        <KaKaoMapWithCheckPosition className="absolute inset-0 mask-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_75%)]"/> 
      </main>
    </>
  );
}
