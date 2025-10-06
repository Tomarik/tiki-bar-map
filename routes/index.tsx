import { useSignal } from "@preact/signals";
import { define } from "../utils.ts";

export default define.page(function Home(ctx) {
  const count = useSignal(3);

  ctx.state.title = count.value + " Fresh Counter" +
    (Math.abs(count.value) === 1 ? "" : "s");

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Tiki Map</h1>
        <p class="my-4">
          We love finding the best Tiki Bars and want to share them with you!
        </p>

      </div>
    </div>
  );
});
