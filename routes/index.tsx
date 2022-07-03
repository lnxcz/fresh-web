/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from "dotenv";
interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const id = "724579978921902114";
    const resp = await fetch(`https://discord.com/api/v9/users/${id}`, {
      headers: {
        Authorization: `Bot ${Deno.env.get("TOKEN")}`,
      },
    });
    if (resp.status === 404) {
      return ctx.render(null);
    }

    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Home({ data }: PageProps<User | null>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div class={tw`flex items-center`}>
        <img
          src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.png?size=80`}
          class={tw`rounded-full `}
          width="80px"
          height="80px"
          alt="logo"
        />
        <div class={tw`ml-6 text(lg)`}>
          <div class={tw`flex`}>
            <h1 class={tw`text-3xl font-semibold`}>lynx</h1>
            {data && <p class={tw`font-semibold`}>#{data?.discriminator}</p>}
          </div>
          <p>Software Developer</p>
        </div>
      </div>
      <div class={tw`mt-5 text(gray-800)`}>Ahoj, rad pouzivam rust </div>
    </div>
  );
}
