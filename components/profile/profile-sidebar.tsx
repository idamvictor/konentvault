"use client";

import { ChevronUp, Search } from "lucide-react";
import { useState } from "react";

export default function ProfileSidebar() {
  const [spotifyExpanded, setSpotifyExpanded] = useState(true);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="flex h-10 items-center rounded-md border border-input bg-background px-3">
          <input
            type="text"
            placeholder="Search user's post"
            className="flex-1 bg-transparent outline-none"
          />
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Spotify section */}
      <div className="border border-border rounded-md overflow-hidden">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => setSpotifyExpanded(!spotifyExpanded)}
        >
          <span className="font-medium text-muted-foreground">SPOTIFY</span>
          <ChevronUp
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              spotifyExpanded ? "" : "rotate-180"
            }`}
          />
        </button>

        {spotifyExpanded && (
          <div className="p-4 pt-0">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-3 text-white font-medium">
              <SpotifyIcon />
              SIGN IN WITH SPOTIFY
            </button>
          </div>
        )}
      </div>

      {/* Footer links */}
      <div className="mt-auto flex justify-center gap-4 text-sm text-muted-foreground">
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <span>•</span>
        <a href="#" className="hover:underline">
          Cookie Notice
        </a>
        <span>•</span>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
}

function SpotifyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill="white"
      />
      <path
        d="M16.7461 16.3824C16.5381 16.7164 16.1121 16.8164 15.7781 16.6084C13.7941 15.3564 11.2941 15.0464 8.15812 15.8184C7.77812 15.9184 7.39812 15.6844 7.29812 15.3044C7.19812 14.9244 7.43212 14.5444 7.81212 14.4444C11.2941 13.5764 14.1141 13.9564 16.4201 15.4144C16.7541 15.6224 16.8541 16.0484 16.6461 16.3824ZM17.7461 13.7824C17.4781 14.1924 16.9541 14.3164 16.5441 14.0484C14.2461 12.6004 10.8541 12.1244 8.05412 13.1244C7.59412 13.2724 7.09412 13.0244 6.94612 12.5644C6.79812 12.1044 7.04612 11.6044 7.50612 11.4564C10.8001 10.3044 14.6201 10.8324 17.3801 12.5804C17.7901 12.8484 17.9141 13.3724 17.6461 13.7824ZM17.8461 11.0644C15.1341 9.38435 10.6221 9.20435 8.22612 10.2044C7.68612 10.3764 7.10612 10.0804 6.93412 9.54035C6.76212 9.00035 7.05812 8.42035 7.59812 8.24835C10.4221 7.08835 15.4781 7.30435 18.6461 9.28835C19.1341 9.58435 19.2821 10.2044 18.9861 10.6924C18.6901 11.1804 18.0701 11.3284 17.5821 11.0324L17.8461 11.0644Z"
        fill="#1DB954"
      />
    </svg>
  );
}
