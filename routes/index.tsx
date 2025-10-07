import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import TikiBar_TheBluePalm from "../islands/TikiBar_TheBluePalm.tsx";
import TikiBar_WusongRoad from "../islands/TikiBar_WusongRoad.tsx";

export default define.page(function Home(ctx) {
  console.log("Shared value " + ctx.state.shared);
  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Tiki Hit</title>
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold font-changa">Tiki Hit</h1>
        <p class="font-poppins italic">
          Only the best make the list
        </p>
      </div>

      <div class="mt-12 max-w-screen-lg mx-auto">
        <TikiBar_TheBluePalm />
        <div className="divider divider-accent"></div>
        <TikiBar_WusongRoad />
      </div>
    </div>
  );
});
