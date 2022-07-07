/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Project from "../Components/Project.tsx";

interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}
interface IProject {
  name: string;
  description: string;
  stargazers_count: string;
  forks: string;
  svn_url: string;
}

interface Data {
  user: User;
  projects: IProject[];
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const id = "724579978921902114";
    const resp = await fetch(`https://discord.com/api/v9/users/${id}`, {
      headers: {
        Authorization: `Bot ${Deno.env.get("TOKEN")}`,
      },
    });

    const disresp = await fetch(`https://api.github.com/users/lnxcz/repos`);
    const projects: IProject[] = await disresp.json();

    const user: User = await resp.json();
    return ctx.render({ user, projects });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-sm mt-10`}>
      <div class={tw`flex items-center`}>
        <img
          src={`https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png?size=100`}
          class={tw`rounded-full`}
          alt="logo"
        />
        <div class={tw`ml-6 text(lg)`}>
          <div class={tw`flex`}>
            <h1 class={tw`text-3xl font-semibold`}>lynx</h1>
            {data && (
              <p class={tw`font-semibold`}>#{data.user.discriminator}</p>
            )}
          </div>
          <p>Software Developer</p>
          <div class={tw`flex items(center) mt-4`}>
            <a class={tw`w-6 mr-7`} href="https://github.com/lnxcz">
              <img src="./icons/github.svg" alt="github" />
            </a>
            <a class={tw`w-6 mr-7`} href="https://anilist.co/user/lynxcz/">
              <img src="./icons/anilist.svg" alt="anilist" />
            </a>
            <a
              class={tw`w-6 mr-7`}
              href="https://discord.com/users/724579978921902114"
            >
              <img src="./icons/discord.svg" alt="discord" />
            </a>
          </div>
        </div>
      </div>
      <div class={tw`mt-10 text(gray-800)`}>
        Hello there, my name's David, but most people call me lynx online. I'm
        17 years old and living in Czech Republic. I'm currently studying
        software development, and my primary languages are Rust for backend and
        TypeScript for websites/apps. In my free time, I enjoy playing games and
        watching anime.
      </div>
      <div>
        <h2 class={tw`mt-10 text(2xl) font(bold)`}>Projects</h2>
        {data.projects.map((project) => (
          <Project
            name={project.name}
            description={project.description}
            stars={project.stargazers_count}
            forks={project.forks}
            url={project.svn_url}
          />
        ))}
      </div>
    </div>
  );
}
