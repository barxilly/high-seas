import { getWakaSessions } from "@/app/utils/waka";
import { hasRecvFirstHeartbeat } from "../../utils/waka";
import { motion } from "framer-motion";
import { wakaSessions } from "./help";
import { useEffect } from "react";
import Link from "next/link";

export default function SignPost({
  session,
  wakaToken,
}: {
  session: any;
  wakaToken: string | null;
}) {
  useEffect(() => {
    hasRecvFirstHeartbeat().then((a) => console.log("ASNTOENASTISRT", a));
    // the qucik brown fox jumps over the lazy dog!!!!
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">
        Welcome to the signpost
      </h1>

      <p>
        Low Skies uses the WakaTime VSCode extension to track how much time you
        spend on your projects. <br />
        Specifically,
        <Link
          target="_blank"
          className="text-blue-500"
          href="https://waka.hackclub.com"
        >
          {" "}
          a Hack Clubber-forked open source version
        </Link>
        . If you want to get advanced and log into the dashboard, your username
        is your Slack ID (<code>{session ? session?.payload?.sub : "???"}</code>
        ), and your email is{" "}
        <code>{session ? session.payload.email : "???"}</code>. You must request
        a password reset link.
      </p>

      <p>
        Your WakaTime token is{" "}
        {wakaToken ? <code>{wakaToken}</code> : "loading..."}
      </p>

      <p>{"Here's how you can configure the extension;"}</p>
      <iframe
        width="560"
        height="315"
        className="mx-auto"
        src="https://www.youtube.com/embed/eKoD9yyr1To?si=1B2v0cP42Ie0k1KD"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <div className="m-4 flex flex-col justify-center items-center mb-8">
        <p className="text-2xl mb-6 text-blue-500">Key locations:</p>
        <div className="text-white">
          <div className="mb-2 bg-blue-400 p-4 rounded-lg max-w-xl">
            <p className="text-2xl mb-2">The Keep</p>
            <p>Submit your projects here when {"they're"} done!</p>
          </div>
          <div className="mb-2 bg-blue-400 p-4 rounded-lg max-w-xl">
            <p className="text-2xl mb-2">Thunderdome</p>
            <p>
              Vote between projects others have made! After submitting your
              project, you must vote between project matchups in order to earn
              Scales. Note that the number of Scales you earn is based on the
              number of hours you have put in your own project, and how it
              competes against other projects. Everything is peer voted!
            </p>
          </div>
          <div className="mb-2 bg-blue-400 p-4 rounded-lg max-w-xl">
            <p className="text-2xl mb-2">Shoppe</p>
            <p>
              Spend all your scales here! Get items, ranging from Blahajs to
              Yubikeys. More items to come in the future!
            </p>
          </div>
        </div>
      </div>

      {/*

      <div className="m-4 flex flex-col justify-center items-center">
        <p className="text-2xl mb-8 text-blue-500">
          Here are some example projects others have submitted!
        </p>
        <div className="text-white">
          <div className="mb-2 bg-blue-400 p-4 rounded-lg max-w-xl">
            <p className="text-xl font-bold mb-2">Flip Slash Sprig Game</p>
            <div className="flex flex-row justify-center items-center text-center gap-8">
              <a
                href="https://github.com/kaj07/FLIP-SLASH--sprig-"
                target="_blank"
                rel="noopenner noreferrer"
                className="text-md text-pink-200"
              >
                Project GitHub
              </a>
              <p className="text-md">Hours spent: 8</p>
              <p className="text-md">Scales earned: 4217</p>
            </div>
          </div>

          <div className="mb-2 bg-blue-400 p-4 rounded-lg max-w-xl">
            <p className="text-xl font-bold mb-2">
              FRC Robotics Simulation Game
            </p>
            <div className="flex flex-row justify-center items-center text-center gap-8">
              <a
                href="https://github.com/Brainiac11/sim_game"
                target="_blank"
                rel="noopenner noreferrer"
                className="text-md text-pink-200"
              >
                Project GitHub
              </a>
              <p className="text-md">Hours spent: 138</p>
              <p className="text-md">Scales earned: 207493</p>
            </div>
          </div>
        </div>
      </div> */}
    </motion.div>
  );
}