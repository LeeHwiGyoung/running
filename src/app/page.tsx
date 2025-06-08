import KaKaoMap from "@/component/running/KakaoMap";
import RunningGoalInput from "@/component/running/RunningGoalInput";
import RunningMenu from "@/component/running/RunningMenu";

export default function Home() {

  return (
   <main>
      <h2>러닝</h2>
      <RunningGoalInput/>
      <KaKaoMap/>
      <RunningMenu/>
    </main>
  );
}
